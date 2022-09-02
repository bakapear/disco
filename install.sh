#!/bin/bash

for f in $(find $LOCALAPPDATA/discord -maxdepth 1 -type d | grep "app-"); do ver=$f; done

dir=$f/resources/app
app=$f/discord.exe

disco=$dir/disco.js
pack=$dir/package.json

if [ -f "$disco" ]; then
  echo "disco is already installed."
  exit
fi

if [ ! -d "$dir" ]; then mkdir $dir; fi

curl -sL git.io/discode > "$disco"
echo '{ "main": "disco.js", "name": "discord", "private": true }' > "$pack"

echo "-- disco successfully installed! --"

if tasklist -fi "ImageName eq discord.exe" -fo csv | grep -i "discord.exe" > /dev/null
then
  echo "Restarting Discord..."

  taskkill -f -im discord.exe > /dev/null
  "$app" </dev/null &>/dev/null &
  exit
fi
