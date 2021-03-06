#!/bin/bash

for f in $(find $APPDATA/discord -maxdepth 1 -type d | grep "^.*/[0-9]\.[0-9]\.[0-9]*$"); do dir=$f/modules/discord_desktop_core; done

for f in $(find $LOCALAPPDATA/discord -maxdepth 1 -type d | grep "^.*/app-[0-9]\.[0-9]\.[0-9]*$"); do app=$f/Discord.exe; done

if [ ! -d "$dir" ]; then
  echo "Invalid path: '$dir'"
  exit
elif [ ! -f "$app" ]; then
  echo "Invalid path: '$app'"
  exit
elif [[ $(head -n 1 $dir/index.js) == "/* disco */" ]]; then
  echo "disco is already installed."
  exit
fi

curl -sL git.io/discode >"$dir/index.js"
if [ ! -f "$dir/style.css" ]; then touch "$dir/style.css"; fi

echo "-- disco successfully installed! --"
echo "Restarting Discord..."

taskkill //f //im Discord.exe >/dev/null 2>&1
$dir </dev/null &>/dev/null &
exit