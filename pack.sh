#!/bin/bash
set -e
npm install
npx esbuild src/extension.ts \
    --bundle \
    --outfile=out/extension.js \
    --format=cjs \
    --platform=node \
    --external:vscode \
    --sourcemap
vsce package --allow-missing-repository
