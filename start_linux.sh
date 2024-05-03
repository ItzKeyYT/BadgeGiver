#!/bin/bash
echo "BadgeGiver"

# Check if Node.js is installed
node -v >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "⚠ Node.js is not installed on this system."
    echo "You need to install Node.js first to run this script."
    echo "https://nodejs.org/en/download"
    echo
    echo "⚠ Warning: You must not mess around with any options other than 'Online documentation shortcuts'."
    read -p "Press Enter to continue..."
    exit 1
fi

# Get Node.js version
node_version=$(node -v | cut -d'v' -f2)
major=$(echo $node_version | cut -d'.' -f1)
minor=$(echo $node_version | cut -d'.' -f2)
patch=$(echo $node_version | cut -d'.' -f3)

# Compare Node.js version with minimum required version
# && [ $minor -lt 0 ]
if [ $major -lt 18 ] || ([ $major -eq 18 ]); then
    echo "⚠ Node.js version is lower than v18.0.0."
    echo "Please upgrade Node.js to run this script."
    echo "https://nodejs.org/en/download"
    echo
    echo "⚠ Warning: You must not mess around with any options other than 'Online documentation shortcuts'."
    read -p "Press Enter to continue..."
    exit 1
else
    # Node.js version is equal to or higher than v18.0.0
    npm i
    node index.js
fi
