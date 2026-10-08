#!/bin/sh
# One-time narration setup for a fresh cloud workspace (about 150 MB, all from GitHub releases).
# PyPI and Hugging Face may be blocked; GitHub release downloads work.
set -e
D="${TTS_DIR:-/tmp/tts}"
mkdir -p "$D" && cd "$D"
[ -f model.onnx ] || curl -sL -o model.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx
[ -f voices.bin ] || curl -sL -o voices.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
if [ ! -x piper/espeak-ng ]; then
  curl -sL -o piper.tgz https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz
  tar xzf piper.tgz && chmod +x piper/espeak-ng piper/piper
fi
python3 -c "import onnxruntime, numpy" || { echo "needs python packages onnxruntime and numpy"; exit 1; }
which ffmpeg >/dev/null || echo "warning: ffmpeg not found (needed to make narration.mp3)"
echo "TTS ready in $D"
