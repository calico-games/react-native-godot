#!/bin/sh

set -eux

PROJECT_DIR=$@
CURRENT_DIR=$(pwd)

cd $PROJECT_DIR
cp -r $PROJECT_DIR $PROJECT_DIR-export
cd $PROJECT_DIR-export

/Applications/Godot.app/Contents/MacOS/Godot --headless --export-pack "main" main.pck

PROJECT_NAME=$(basename $PROJECT_DIR)

mv main.pck $CURRENT_DIR/$PROJECT_NAME.pck

rm -rf $PROJECT_DIR-export