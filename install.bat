@echo off

for /f %%f in ('dir "%APPDATA%/discord" /b /ad /s ^| findstr /x .*\\[0-9]\.[0-9]\.[0-9]* ^| sort') do set dir=%%f
set dir=%dir%\modules\discord_desktop_core

if exist %dir% (
  curl -sL git.io/discode > %dir%/index.js
  if not exist "%dir%/style.css" copy /y NUL "%dir%/style.css" > NUL
  echo Installed disco! Restarting Discord...
  goto restart
) else (
  echo Invalid path: '%dir%'
  goto end
)

:restart

for /f %%f in ('dir "%LOCALAPPDATA%/discord" /b /ad /s ^| findstr /x .*\\app-[0-9]\.[0-9]\.[0-9]* ^| sort') do set dir=%%f
set dir=%dir%\Discord.exe

if exist %dir% (
  taskkill /f /im Discord.exe > NUL 2>&1
  explorer %dir%
) else (
  echo Invalid path: '%dir%'
)

:end
