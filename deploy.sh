#!/bin/bash

tsc

set -e

if [ "$1" != "nobuild" ] ; then
  rm -rf build
  polymer build || { echo 'Polymer Build failed'; exit 1; }
fi

DIST_DIR="`pwd`/build/final"
GH_PAGES_DIR="`pwd`/.gh"


rm -rf "$DIST_DIR"
mkdir "$DIST_DIR"
cd build/bundled

cp --parents -t "$DIST_DIR" \
src/az-app/az-app.html \
bower_components/webcomponentsjs/webcomponents-lite.min.js \
CNAME \
index.html \
favicon.ico \
manifest.json

#git clone -b gh-pages https://github.com/jhrdina/alllangs.git .
cd "$GH_PAGES_DIR"
git pull || echo 'Unable to pull...'
rm -rf *
cp -rf "$DIST_DIR/"* -t "$GH_PAGES_DIR"

git add --all
git commit -m "Update `date -Iseconds`"
