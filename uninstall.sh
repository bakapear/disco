#!/bin/bash

for f in $(find $LOCALAPPDATA/discord -maxdepth 1 -type d | grep "app-"); do ver=$f; done

dir=$f/modules/discord_desktop_core-1/discord_desktop_core
app=$f/Discord.exe

if [ ! -d "$dir" ]; then
  echo "Invalid path: '$dir'"
  exit
elif [ ! -f "$app" ]; then
  echo "Invalid path: '$app'"
  exit
elif [[ $(head -n 1 "$dir/index.js") != "/* disco */" ]]; then
  echo "disco is not installed."
  exit
fi

echo "module.exports = require('./core.asar')" >"$dir/index.js"

echo "-- disco successfully uninstalled! --"
echo "Restarting Discord..."

taskkill //f //im Discord.exe >/dev/null 2>&1
"$app" </dev/null &>/dev/null &
exit