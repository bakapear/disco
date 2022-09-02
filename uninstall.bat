@echo off

for /f %%f in ('dir "%LOCALAPPDATA%\discord" /b /ad ^| findstr app-') do set ver=%%f

set dir=%LOCALAPPDATA%\discord\%ver%\resources\app
set app=%LOCALAPPDATA%\discord\%ver%\discord.exe

set disco=%dir%\disco.js
set pack=%dir%\package.json

if not exist "%disco%" (
  echo disco is not installed.
  exit /b
) 

del "%disco%"

>nul find "disco.js" "%pack%" 2> nul && del "%pack%"

rmdir "%dir%" 2> nul

echo -- disco successfully uninstalled^! --

tasklist /fi "ImageName eq discord.exe" /fo csv 2>NUL | find /I "discord.exe">NUL
if "%ERRORLEVEL%"=="0" (
  echo Restarting Discord...

  taskkill /f /im Discord.exe > NUL 2>&1
  explorer "%app%"
  exit /b
)
