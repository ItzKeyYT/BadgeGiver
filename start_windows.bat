@echo off
title BadgeGiver

rem Set log file for script output
set LOG_FOLDER=Logs
set TERMINAL_FOLDER=Terminal
set DATE_TIME=%date:/=-%_%time::=-%
set DATE_TIME=%DATE_TIME: =_%

rem Parse and format date and time
for /f "tokens=2-4 delims=/ " %%a in ("%DATE%") do (
    set "MONTH=%%a"
    set "DAY=%%b"
    set "YEAR=%%c"
)
for /f "tokens=1-3 delims=:.- " %%a in ("%TIME%") do (
    set "HOUR=%%a"
    set "MINUTE=%%b"
    set "SECOND=%%c"
)
set "FILE_NAME=%YEAR%-%MONTH%-%DAY%_%HOUR%-%MINUTE%"

rem Create the folders if they don't exist
if not exist "%LOG_FOLDER%" mkdir "%LOG_FOLDER%"
if not exist "%LOG_FOLDER%\%TERMINAL_FOLDER%" mkdir "%LOG_FOLDER%\%TERMINAL_FOLDER%"

rem Initialize script log file
set SCRIPT_LOG_BASE=%LOG_FOLDER%\%TERMINAL_FOLDER%\%FILE_NAME%
set SCRIPT_LOG=%SCRIPT_LOG_BASE%.log

rem Check if a file with the base name already exists (offseted to 0 or it will continue with 2)
if exist "%SCRIPT_LOG%" (
    set /a COUNT=0
    :CHECK_EXISTENCE
    set "SCRIPT_LOG=%SCRIPT_LOG_BASE%_%COUNT%.log"
    if exist "%SCRIPT_LOG%" (
        set /a COUNT+=1
        goto :CHECK_EXISTENCE
    )
)

echo Log started at %DATE_TIME% > "%SCRIPT_LOG%"

echo Log file: "%SCRIPT_LOG%"

rem Check if Node.js is installed
echo Checking if Node.js is installed...
node -v
if %errorlevel% neq 0 (
    echo Node.js is not installed on this system. >> "%SCRIPT_LOG%"
    echo You need to install Node.js first to run this script.
    echo https://nodejs.org/en/download
    echo. >> "%SCRIPT_LOG%"
    echo Warning: You must not mess around with any options other than 'Online documentation shortcuts'.
    pause
    exit /b
)
echo Node.js is installed.
echo Node.js is installed. >> "%SCRIPT_LOG%"
echo.

rem Get Node.js version
echo Getting Node.js version...
for /f "tokens=1,2,3 delims=." %%a in ('node -v') do (
    set major=%%a
    set minor=%%b
    set patch=%%c
)
echo Node.js version: %major%.%minor%.%patch% >> "%SCRIPT_LOG%"
echo.

rem Compare Node.js version with minimum required version
echo Checking Node.js version...
if %major% lss 18 (
    echo Node.js version is lower than v18.0.0. >> "%SCRIPT_LOG%"
    echo Please upgrade Node.js to run this script.
    echo https://nodejs.org/en/download
    echo. >> "%SCRIPT_LOG%"
    echo Warning: You must not mess around with any options other than 'Online documentation shortcuts'. >> "%SCRIPT_LOG%"
    pause
    exit /b
)
echo Node.js version is sufficient. >> "%SCRIPT_LOG%"
echo.

rem Running index.js and logging its output separately
echo Running index.js... >> "%SCRIPT_LOG%"
node src/index.js
