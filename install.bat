@echo off

for /f %%f in ('dir "%appdata%/discord" /b /ad /s ^| findstr /x .*\\[0-9]\.[0-9]\.[0-9]* ^| sort') do set dir=%%f
set dir=%dir%\modules\discord_desktop_core

if exist %dir% (
 curl -sL git.io/discode > %dir%/index.js
 if not exist "%dir%/style.css" copy /y NUL "%dir%/style.css" > NUL
 echo Installed disco! Restart Discord to apply changes.
) else (
 echo Invalid path: '%dir%'
)
