const fs = require('fs');

async function getCurrentVersion() {
    try {
        const packageJson = fs.readFileSync('package.json', 'utf8');
        const packageData = JSON.parse(packageJson);
        return packageData.version;
    } catch (error) {
        console.log("An error occurred while reading the version from package.json:\n", error);
        return null;
    };
};

function compareVersions(currentVersion, latestVersion) {

    // Strip 'v' prefix from the latest version if present
    latestVersion = latestVersion.replace(/^v/, '');

    const currentParts = currentVersion.split('.');
    const latestParts = latestVersion.split('.');
    

    // Compare major and minor versions
    for (let i = 0; i < Math.min(currentParts.length, latestParts.length); i++) {
        const current = parseInt(currentParts[i], 10);
        const latest = parseInt(latestParts[i], 10);
        if (current !== latest) {
            return latest - current;
        };
    };

    // If major and minor versions are equal, compare patch versions
    const currentPatch = parseInt(currentParts[2] || '0', 10);
    const latestPatch = parseInt(latestParts[2] || '0', 10);
    // console.log(`Comparing patch versions: Current: ${currentPatch}, Latest: ${latestPatch}`);
    return latestPatch - currentPatch;
};

async function checkForUpdate() {
    const currentVersion = await getCurrentVersion();
    if (!currentVersion) {
        console.log('An error occurred: You cannot proceed without a current version.');
        return;
    };
    
    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(`https://api.github.com/repos/ItzKeyYT/BadgeGiver/releases/latest`);
        if (!response.ok) {
            throw new Error('An error occurred while fetching the latest version info.');
        };
        
        const data = await response.json();
        const latestVersion = data.tag_name;        

        console.log(`Latest version from GitHub: ${latestVersion}`);
        console.log(`Your current version: ${currentVersion}`);

        const comparisonResult = compareVersions(currentVersion, latestVersion);
        if (comparisonResult > 0) {
            console.log(`A new version (${latestVersion}) is available! Please download the latest version from https://github.com/ItzKeyYT/BadgeGiver/releases/`);
        } else if (comparisonResult === 0) {
            console.log("You're using the latest version.");
        } else {
            console.log("! | Please revert to the original version and refrain from making modifications.");
        };

    } catch (error) {
        console.log("An error occurred while checking for an update:\n", error);
    };
};

module.exports = {
    checkForUpdate
}