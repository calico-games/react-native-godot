// metro.config.js
//
// Learn more https://docs.expo.io/guides/customizing-metro

const {getDefaultConfig} = require('expo/metro-config');
const path = require('path');
const {mergeConfig} = require('metro-config');

const defaultConfig = getDefaultConfig(__dirname);
  
const {
  resolver: {assetExts},
} = defaultConfig;

const config = {
  resolver: {
    // [ADD THIS] Treat `.pck` files as assets
    assetExts: [...assetExts, 'pck'],
    // Avoid conflicts with React / React Native's default resolver
    // This is only needed when doing `yarn install` in the package folder to prepack the library
    // In other words, ignore please. You do not need to add this in your project :)
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'react' || moduleName === 'react-native') {
        return {
          filePath: require.resolve(moduleName, { paths: [__dirname] }),
          type: 'sourceFile',
        };
      }

      // Default resolver
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  watchFolders: [path.resolve('.'), path.resolve('../package')],
};

module.exports = mergeConfig(defaultConfig, config);