#!/bin/bash
set -e
npm install
npm run compile
vsce package
