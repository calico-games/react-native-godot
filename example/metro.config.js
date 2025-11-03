// metro.config.js
//
// with multiple workarounds for this issue with symlinks:
// https://github.com/facebook/metro/issues/1
//
// with thanks to @johnryan (<https://github.com/johnryan>)
// for the pointers to multiple workaround solutions here:
// https://github.com/facebook/metro/issues/1#issuecomment-541642857
//
// see also this discussion:
// https://github.com/brodybits/create-react-native-module/issues/232

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: {assetExts},
} = defaultConfig;

const packagePath = path.resolve(__dirname, '../package');

const config = {
  // workaround for an issue with symlinks encountered starting with
  // metro@0.55 / React Native 0.61
  resolver: {
    // Ensure React and React Native are resolved from example's node_modules
    extraNodeModules: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
    // Block only React and React Native from the symlinked package directory
    blockList: [
      new RegExp(`${packagePath.replace(/[/\\]/g, '[/\\\\]')}/node_modules/react/`),
      new RegExp(`${packagePath.replace(/[/\\]/g, '[/\\\\]')}/node_modules/react-native/`),
      new RegExp(`${packagePath.replace(/[/\\]/g, '[/\\\\]')}/node_modules/@react-native/`),
    ].concat(defaultConfig.resolver.blockList || []),
    // Treat `.pck` files as assets
    assetExts: [...assetExts, 'pck'],
  },
  // Quick workaround for another issue with symlinks
  watchFolders: [path.resolve('.'), packagePath],
};

module.exports = mergeConfig(defaultConfig, config);