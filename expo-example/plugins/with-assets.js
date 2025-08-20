const path = require('path');
const fs = require('fs');
const { withXcodeProject, withDangerousMod, IOSConfig } = require('expo/config-plugins');

function withAssets(config, assets = []) {
  // iOS: Add all asset files to Xcode project
  config = withXcodeProject(config, async (config) => {
    const project = config.modResults;
    const projectName = config.modRequest.projectName;
    
    for (const asset of assets) {
      const assetPath = path.join('../', asset);
      
      if (!project.hasFile(assetPath)) {
        console.log(`Adding ${assetPath} to Xcode project`);
        IOSConfig.XcodeUtils.addResourceFileToGroup({
          filepath: assetPath,
          groupName: projectName,
          project,
          isBuildFile: true,
        });
      }
    }
    
    return config;
  });

  // Android: Copy assets to the Android assets folder
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const androidAssetsPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/assets'
      );
      
      // Ensure assets directory exists
      if (!fs.existsSync(androidAssetsPath)) {
        fs.mkdirSync(androidAssetsPath, { recursive: true });
      }
      
      // Copy each asset file
      for (const asset of assets) {
        const sourcePath = path.join(config.modRequest.projectRoot, asset);
        const destPath = path.join(androidAssetsPath, path.basename(asset));
        
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied ${asset} to Android assets`);
        } else {
          console.warn(`Asset file not found: ${sourcePath}`);
        }
      }
      
      return config;
    },
  ]);

  return config;
}

module.exports = withAssets;