"""Trace a (public-domain) photograph into pen strokes for the whiteboard-mural films.

  python3 studio/trace.py <photo> <out.json> [--height 900] [--colours 5] [--no-colour] [--rect x0,y0,x1,y1]

Output JSON (all coordinates in the traced image's pixel space, origin top-left):
  {"w","h",
   "contour": [[x0,y0,x1,y1,...], ...]      ink outlines, ordered top to bottom
   "hatch":   [[layer, x0,y0,x1,y1], ...]   cross-hatching segments, ordered by layer then sweep
   "colour":  [{"col":"#rrggbb","poly":[[x,y,...], ...]}, ...]  marker-colour regions,
   "outline": [x,y,...]                     silhouette, used to hide drawing behind the figure,
   "tone":    {"w","h","b64"}               small grayscale tone map (0 dark..255 light) for painted shading}
The film engine draws contours, then hatching, then scribbles the colour regions underneath the ink.
"""
import argparse, json, math, random
import numpy as np, cv2

def fg_mask(img, rect=None):
    h, w = img.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    r = rect or (int(w * .03), int(h * .02), int(w * .94), int(h * .97))
    bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(img, mask, r, bgd, fgd, 6, cv2.GC_INIT_WITH_RECT)
    m = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    if n > 1:
        big = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
        m = np.where(lab == big, 255, 0).astype(np.uint8)
    return m

def chains(edges, min_len=10):
    """Link 1-px edge pixels into polylines (8-connected walk)."""
    e = edges.copy() > 0
    h, w = e.shape
    out = []
    nb = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
    ys, xs = np.nonzero(e)
    for y0, x0 in zip(ys, xs):
        if not e[y0, x0]:
            continue
        path = [(x0, y0)]; e[y0, x0] = False
        for direction in (0, 1):
            y, x = y0, x0
            pd = None
            while True:
                best = None
                for dy, dx in nb:
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < h and 0 <= xx < w and e[yy, xx]:
                        score = 0 if pd is None else -(dy * pd[0] + dx * pd[1])
                        if best is None or score < best[0]:
                            best = (score, yy, xx, (dy, dx))
                if best is None:
                    break
                _, y, x, pd = best
                e[y, x] = False
                if direction == 0: path.append((x, y))
                else: path.insert(0, (x, y))
        if len(path) >= min_len:
            a = np.array(path, np.int32).reshape(-1, 1, 2)
            s = cv2.approxPolyDP(a, 1.0, False).reshape(-1, 2)
            out.append(s)
    return out

def hatch(tone, mask, scale):
    h, w = tone.shape
    layers = [(.80, -.78, 7.0), (.62, .74, 6.6), (.45, -.18, 5.2), (.30, 1.30, 4.4), (.17, -1.10, 3.6)]
    rnd = random.Random(7)
    R = math.hypot(w, h) / 2 + 4
    segs = []
    for li, (th, a, gap) in enumerate(layers):
        gap *= scale
        ux, uy = math.cos(a), math.sin(a); nx, ny = -uy, ux
        d = -R
        while d <= R:
            dd = d + (rnd.random() - .5) * 1.2 * scale
            t2 = th + (rnd.random() - .5) * .06
            run = None
            s = -R
            step = 1.6 * scale
            while s <= R + step:
                x, y = w / 2 + nx * dd + ux * s, h / 2 + ny * dd + uy * s
                ok = 0 <= x < w and 0 <= y < h and mask[int(y), int(x)] > 0 and tone[int(y), int(x)] < t2
                if ok:
                    if run is None: run = [x, y, x, y]
                    else: run[2], run[3] = x, y
                elif run is not None:
                    L = math.hypot(run[2] - run[0], run[3] - run[1])
                    if L > 3 * scale:
                        a0, b0 = rnd.random() * 2 * scale, rnd.random() * 2.5 * scale
                        segs.append([li, round(run[0] - ux * a0, 1), round(run[1] - uy * a0, 1), round(run[2] + ux * b0, 1), round(run[3] + uy * b0, 1)])
                    run = None
                s += step
            d += gap
    return segs

def colour_regions(img, mask, k):
    sm = cv2.pyrMeanShiftFiltering(img, 14, 28)
    sm = cv2.medianBlur(sm, 7)
    lab = cv2.cvtColor(sm, cv2.COLOR_BGR2LAB)
    pts = lab[mask > 0].astype(np.float32)
    if len(pts) < k * 50:
        return []
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, .5)
    _, lbl, cen = cv2.kmeans(pts, k, None, crit, 3, cv2.KMEANS_PP_CENTERS)
    full = np.full(mask.shape, -1, np.int32); full[mask > 0] = lbl.ravel()
    out = []
    for i in range(k):
        m = np.where(full == i, 255, 0).astype(np.uint8)
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((11, 11), np.uint8))
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
        bgr = cv2.cvtColor(np.uint8([[cen[i]]]), cv2.COLOR_LAB2BGR)[0, 0]
        hsv = cv2.cvtColor(np.uint8([[bgr]]), cv2.COLOR_BGR2HSV)[0, 0].astype(int)
        hsv[1] = min(255, int(hsv[1] * 1.5) + 25); hsv[2] = min(255, int(hsv[2] * 1.12) + 18)
        b, g, r = cv2.cvtColor(np.uint8([[hsv]]), cv2.COLOR_HSV2BGR)[0, 0]
        polys = []
        cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for c in cs:
            if cv2.contourArea(c) < 120: continue
            a = cv2.approxPolyDP(c, 2.0, True).reshape(-1, 2)
            polys.append([int(v) for v in a.ravel()])
        if polys:
            out.append({"col": "#%02x%02x%02x" % (r, g, b), "poly": polys, "area": int(m.sum() // 255)})
    out.sort(key=lambda o: -o["area"])
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("photo"); ap.add_argument("out")
    ap.add_argument("--height", type=int, default=900)
    ap.add_argument("--colours", type=int, default=5)
    ap.add_argument("--no-colour", action="store_true")
    ap.add_argument("--rect")
    a = ap.parse_args()
    img = cv2.imread(a.photo, cv2.IMREAD_COLOR)
    s = a.height / img.shape[0]
    img = cv2.resize(img, (int(img.shape[1] * s), a.height), interpolation=cv2.INTER_AREA)
    h, w = img.shape[:2]
    rect = tuple(int(v) for v in a.rect.split(",")) if a.rect else None
    mask = fg_mask(img, rect)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
    g = clahe.apply(gray)
    g = cv2.GaussianBlur(g, (0, 0), 1.6)
    vals = g[mask > 0]
    lo, hi = np.percentile(vals, 3), np.percentile(vals, 97)
    tone = np.clip((g.astype(np.float32) - lo) / max(1, hi - lo), 0, 1)
    tone = .2 + .8 * tone
    tone = np.where(mask > 0, tone, 1.0)
    scale = a.height / 900
    edges = cv2.Canny(cv2.GaussianBlur(clahe.apply(gray), (0, 0), 1.5), 28, 70)
    edges[cv2.erode(mask, np.ones((5, 5), np.uint8)) == 0] = 0
    outline = cv2.morphologyEx(mask, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8))
    edges = np.maximum(edges, outline)
    from skimage.morphology import skeletonize
    edges = (skeletonize(edges > 0) * 255).astype(np.uint8)
    cs = chains(edges, min_len=int(16 * scale))
    cs.sort(key=lambda c: (int(c[:, 1].min() // (60 * scale)), int(c[:, 0].min())))
    contour = [[int(v) for v in c.ravel()] for c in cs]
    hs = hatch(tone, mask, scale)
    col = [] if a.no_colour else colour_regions(img, mask, a.colours)
    oc, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    big = max(oc, key=cv2.contourArea)
    outline = [int(v) for v in cv2.approxPolyDP(big, 2.0, True).reshape(-1, 2).ravel()]
    import base64
    tw = 120; th = int(round(h * tw / w))
    tsm = cv2.resize((np.clip(tone, 0, 1) * 255).astype(np.uint8), (tw, th), interpolation=cv2.INTER_AREA)
    tone_small = {"w": tw, "h": th, "b64": base64.b64encode(tsm.tobytes()).decode()}
    json.dump({"w": w, "h": h, "tone": tone_small, "outline": outline, "contour": contour, "hatch": hs, "colour": col}, open(a.out, "w"), separators=(",", ":"))
    print(f"{a.out}: {w}x{h} contours={len(contour)} hatch={len(hs)} colour_regions={len(col)}")

if __name__ == "__main__":
    main()
