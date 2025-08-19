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

const {getDefaultConfig} = require('@react-native/metro-config');
const path = require('path');
const {mergeConfig} = require('metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const glob = require('glob-to-regexp');

function getBlacklist() {
  const nodeModuleDirs = [
    glob(`${path.resolve(__dirname, '../package')}/node_modules/*`),
  ];
  return exclusionList(nodeModuleDirs);
}

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: {assetExts},
} = defaultConfig;

const config = {
  // workaround for an issue with symlinks encountered starting with
  // metro@0.55 / React Native 0.61
  // (not needed with React Native 0.60 / metro@0.54)
  resolver: {
    extraNodeModules: new Proxy(
      {},
      { get: (_, name) => path.resolve('.', 'node_modules', name) }
    ),
    // /dist\/.*/
    blacklistRE: getBlacklist(),
    // [ADD THIS] Treat `.pck` files as assets
    assetExts: [...assetExts, 'pck'],
  },
  // Quick workaround for another issue with symlinks
  watchFolders: [path.resolve('.'), path.resolve('../package')],
};

module.exports = mergeConfig(defaultConfig, config);