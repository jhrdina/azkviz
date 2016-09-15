#!/bin/bash

tsc

set -e

if [ "$1" != "nobuild" ] ; then
  rm -rf build
  polymer build || { echo 'Polymer Build failed'; exit 1; }
fi

BASE_DIR="`pwd`"
DIST_DIR="$BASE_DIR/build/final"
GH_PAGES_DIR="$BASE_DIR/.gh"


rm -rf "$DIST_DIR"
mkdir "$DIST_DIR"

cp --parents -t "$DIST_DIR" \
bower_components/webcomponentsjs/webcomponents-lite.min.js \
images/* \
demo.xlsx \
CNAME \
favicon.ico \
manifest.json

cd build/bundled

cp --parents -t "$DIST_DIR" \
src/az-app/az-app.html \
src/az-hex-timer/sound.ogg \
index.html

#git clone -b gh-pages https://github.com/jhrdina/alllangs.git .
cd "$GH_PAGES_DIR"
git pull || echo 'Unable to pull...'
rm -rf *
cp -rf "$DIST_DIR/"* -t "$GH_PAGES_DIR"

git add --all
git commit -m "Update `date -Iseconds`"
