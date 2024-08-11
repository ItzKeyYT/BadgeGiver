#!/bin/bash

# Set log file for script output
LOG_FOLDER="Logs"
TERMINAL_FOLDER="Terminal"
DATE_TIME=$(date +"%Y-%m-%d_%H-%M-%S")

# Create the folders if they don't exist
mkdir -p "$LOG_FOLDER"
mkdir -p "$LOG_FOLDER/$TERMINAL_FOLDER"

# Initialize script log file
SCRIPT_LOG_BASE="$LOG_FOLDER/$TERMINAL_FOLDER/$DATE_TIME"
SCRIPT_LOG="$SCRIPT_LOG_BASE.log"

# Check if a file with the base name already exists (offseted to 0 or it will continue with 2)
if [ -e "$SCRIPT_LOG" ]; then
    COUNT=0
    while [ -e "$SCRIPT_LOG_BASE"_"$COUNT".log ]; do
        ((COUNT++))
    done
    SCRIPT_LOG="$SCRIPT_LOG_BASE"_"$COUNT".log
fi

echo "Log started at $DATE_TIME" > "$SCRIPT_LOG"
echo "Log file: $SCRIPT_LOG"

# Check if Node.js is installed
echo "Checking if Node.js is installed..."
node -v
if [ $? -ne 0 ]; then
    echo "Node.js is not installed on this system." >> "$SCRIPT_LOG"
    echo "You need to install Node.js first to run this script."
    echo "https://nodejs.org/en/download"
    echo "" >> "$SCRIPT_LOG"
    echo "Warning: You must not mess around with any options other than 'Online documentation shortcuts'."
    read -p "Press Enter to exit..."
    exit 1
fi
echo "Node.js is installed." >> "$SCRIPT_LOG"
echo ""

# Get Node.js version
echo "Getting Node.js version..."
NODE_VERSION=$(node -v)
major=$(echo "$NODE_VERSION" | cut -d. -f1)
minor=$(echo "$NODE_VERSION" | cut -d. -f2)
patch=$(echo "$NODE_VERSION" | cut -d. -f3)
echo "Node.js version: $major.$minor.$patch" >> "$SCRIPT_LOG"
echo ""

# Compare Node.js version with minimum required version
echo "Checking Node.js version..."
if [ "$major" -lt 18 ]; then
    echo "Node.js version is lower than v18.0.0." >> "$SCRIPT_LOG"
    echo "Please upgrade Node.js to run this script."
    echo "https://nodejs.org/en/download"
    echo "" >> "$SCRIPT_LOG"
    echo "Warning: You must not mess around with any options other than 'Online documentation shortcuts'." >> "$SCRIPT_LOG"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "Node.js version is sufficient." >> "$SCRIPT_LOG"
echo ""

# Running index.js and logging its output separately
echo "Running index.js..."
echo "Go to $SCRIPT_LOG"
node Bot/index.js
