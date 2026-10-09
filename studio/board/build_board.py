"""Assemble the Decision Mural page: series engine + previews + app into board.tpl.html -> build/index.html."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ST = os.path.dirname(HERE)
sys.path.insert(0, ST)
from build import assets_js
SER = os.path.join(ST, 'series', 'colombo-to-almora')
engine = open(os.path.join(ST, 'lib.js')).read() + '\n' + assets_js(SER) + open(os.path.join(SER, 'common.js')).read()
tpl = open(os.path.join(HERE, 'board.tpl.html')).read()
out = tpl.replace('/*ENGINE*/', engine).replace('/*PREVIEWS*/', open(os.path.join(HERE, 'previews.js')).read()).replace('/*APP*/', open(os.path.join(HERE, 'app.js')).read())
os.makedirs(os.path.join(HERE, 'build'), exist_ok=True)
open(os.path.join(HERE, 'build', 'index.html'), 'w').write(out)
print('board:', os.path.join(HERE, 'build', 'index.html'), len(out)//1024, 'KB')
