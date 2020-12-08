#!/bin/bash

for f in `find $APPDATA/discord -maxdepth 1 -type d | grep "^.*/[0-9]\.[0-9]\.[0-9]*$"`; do dir=$f; done
dir=$dir/modules/discord_desktop_core

if [ -d "$dir" ]; then
  echo "module.exports = require('./core.asar')" > "$dir/index.js"
  rm -f "$dir/style.css"
  echo "Uninstalled disco! Restarting Discord..."
  restart=true
else 
  echo "Invalid path: '$dir'"
  restart=false
fi

if $restart; then
  for f in `find $LOCALAPPDATA/discord -maxdepth 1 -type d | grep "^.*/app-[0-9]\.[0-9]\.[0-9]*$"`; do dir=$f; done
  dir=$dir/Discord.exe
  
  if [ -f "$dir" ]; then
    taskkill //f //im Discord.exe > /dev/null 2>&1
	$dir </dev/null &>/dev/null &
  else 
    echo "Invalid path: '$dir'"
  fi
fi