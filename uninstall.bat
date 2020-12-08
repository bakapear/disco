@echo off

for /f %%f in ('dir "%appdata%/discord" /b /ad /s ^| findstr /x .*\\[0-9]\.[0-9]\.[0-9]* ^| sort') do set dir=%%f
set dir=%dir%\modules\discord_desktop_core

if exist %dir% (
 echo module.exports = require('./core.asar'^) > %dir%/index.js
 del "%dir%\style.css" > NUL 2>& 1
 echo Uninstalled disco! Restart Discord to apply changes.
) else (
 echo Invalid path: '%dir%'
)
