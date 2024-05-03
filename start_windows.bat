@echo off
title BadgeGiver

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
if %major% lss 18 (
    echo Node.js version is lower than v18.0.0.
    echo Please upgrade Node.js to run this script.
    echo https://nodejs.org/en/download
    echo. 
    echo Warning: You must not mess around with any options other than 'Online documentation sAhortcuts'.
    pause
    exit /b
)

@REM These code is for debugging, please DON'T modify anything!
rem else if %major% equ 18 (
    rem if %minor% lss 1 (
        rem echo Node.js version is lower than v18.1.0.
        rem echo Please upgrade Node.js to run this script.
        rem echo https://nodejs.org/en/download
        rem echo. 
        rem echo Warning: You must not mess around with any options other than 'Online documentation shortcuts'.
        rem pause
        rem exit /b
    rem )
rem )

rem Node.js version is equal to or higher than v18.0.0
node index.js

rem Check if node command executed successfully
if %errorlevel% neq 0 (
    echo Error: Failed to execute 'node index.js'.
    echo Please verify your Node.js installation. If you encounter any errors, report the issue on GitHub or email to (support@itzkeyyt.us.to).
    pause
)