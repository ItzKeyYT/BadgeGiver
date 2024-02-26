@echo off
title "BadgeGiver"

rem Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed on this system.
    echo You need to install Node.js first to run this script.
    echo https://nodejs.org/en/download
    echo.
    echo Warning: You must not mess around with any options other than 'Online documentation shortcuts'.
    pause
    exit /b
)

rem Get Node.js version
for /f "tokens=1,2,3 delims=." %%a in ('node -v') do (
    set major=%%a
    set minor=%%b
    set patch=%%c
)

rem Compare Node.js version with minimum required version
if %major% lss 16 (
    echo Node.js version is lower than v16.11.0.
    echo Please upgrade Node.js to run this script.
    echo https://nodejs.org/en/download
    echo. 
    echo Warning: You must not mess around with any options other than 'Online documentation sAhortcuts'.
    pause
    exit /b
) else if %major% equ 16 (
    if %minor% lss 11 (
        echo Node.js version is lower than v16.11.0.
        echo Please upgrade Node.js to run this script.
        echo https://nodejs.org/en/download
        echo. 
        echo Warning: You must not mess around with any options other than 'Online documentation shortcuts'.
        pause
        exit /b
    )
) else (
    rem Node.js version is equal to or higher than v16.11.0
    npm i
    node index.js
)
