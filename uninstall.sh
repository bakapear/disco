#!/bin/bash

for f in `find $APPDATA/discord -maxdepth 1 -type d | grep "^.*/[0-9]\.[0-9]\.[0-9]*$"`; do dir=$f; done
dir=$dir/modules/discord_desktop_core

if [ -d "$dir" ]; then
  echo "module.exports = require('./core.asar')" > "$dir/index.js"
  rm -f "$dir/style.css"
  echo "Uninstalled disco! Restart Discord to apply changes."
else 
  echo "Invalid path: '$dir'"
fi
