#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_DIR="$(cd "$PROJECT_DIR/.." && pwd)"
gradle --no-daemon -p "$PROJECT_DIR" assembleDebug
mkdir -p "$SITE_DIR/downloads"
cp "$PROJECT_DIR/app/build/outputs/apk/debug/app-debug.apk" "$SITE_DIR/downloads/ScottFN.apk"
rm -rf "$PROJECT_DIR/app/build"
ls -lh "$SITE_DIR/downloads/ScottFN.apk"
