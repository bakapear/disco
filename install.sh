#!/bin/bash

for f in `find $APPDATA/discord -maxdepth 1 -type d | grep "^.*/[0-9]\.[0-9]\.[0-9]*$"`; do dir=$f; done
dir=$dir/modules/discord_desktop_core

if [ -d "$dir" ]; then
  curl -sL git.io/discode > "$dir/index.js"
  if [ ! -f "$dir/style.css" ]; then touch "$dir/style.css"; fi
  echo "Installed disco! Restart Discord to apply changes."
else 
  echo "Invalid path: '$dir'"
fi
