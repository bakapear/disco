@echo off

for /f %%f in ('dir "%LOCALAPPDATA%\discord" /b /ad ^| findstr app-') do set ver=%%f

set dir=%LOCALAPPDATA%\discord\%ver%\resources\app
set app=%LOCALAPPDATA%\discord\%ver%\discord.exe

set disco=%dir%\disco.js
set pack=%dir%\package.json

if exist "%disco%" (
  echo disco is already installed.
  exit /b
) 

if not exist "%dir%" mkdir "%dir%"

curl -sL git.io/discode > "%disco%"
echo { "main": "disco.js", "name": "discord", "private": true } > "%pack%"

echo -- disco successfully installed^! --

tasklist /fi "ImageName eq discord.exe" /fo csv 2>NUL | find /I "discord.exe">NUL
if "%ERRORLEVEL%"=="0" (
  echo Restarting Discord...

  taskkill /f /im discord.exe > NUL 2>&1
  explorer "%app%"
  exit /b
)
