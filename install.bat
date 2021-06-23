@echo off
setlocal enabledelayedexpansion

for /f %%f in ('dir "%LOCALAPPDATA%\discord" /b /ad ^| findstr app-') do set ver=%%f

set dir=%LOCALAPPDATA%\discord\%ver%\modules\discord_desktop_core-2\discord_desktop_core
set app=%LOCALAPPDATA%\discord\%ver%\Discord.exe

for /f "tokens=*" %%f in ('findstr /n . "%dir%\index.js" ^| findstr "^1:"') do set line=%%f

if not exist %dir% (
  echo Invalid path: '%dir%'
  exit /b
) else if not exist %app% (
  echo Invalid path: '%app%'
  exit /b
) else if "!line:~2!" == "/* disco */" (
  echo disco is already installed.
  exit /b
)

curl -sL git.io/discode > "%dir%/index.js"
if not exist "%dir%/style.css" copy /y NUL "%dir%/style.css" > NUL

echo -- disco successfully installed^^! --
echo Restarting Discord...

taskkill /f /im Discord.exe > NUL 2>&1
explorer "%app%"
exit /b