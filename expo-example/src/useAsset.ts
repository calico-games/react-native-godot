import {useEffect, useState, useMemo} from 'react';
import {NativeModules, Platform} from 'react-native';
import {Paths, File} from 'expo-file-system';

function getMetroHost(): string {
  if (!__DEV__) {
    return '';
  }
  
  const scriptURL = NativeModules.SourceCode?.getConstants().scriptURL || '';
  
  if (scriptURL) {
    // Extract host and port from scriptURL
    // Example: "http://192.168.1.24:8081/index.bundle?platform=ios&dev=true"
    const match = scriptURL.match(/http:\/\/([\d.\w]+:\d+)\//);
    if (match) {
      return match[1];
    }
  }
  
  // Fallback for Android emulator
  if (Platform.OS === 'android') {
    return '10.0.2.2:8081';
  }
  
  return 'localhost:8081';
}

function normalizePath(path: string): string {
  // Remove leading ./ and normalize path separators
  return path.replace(/^\.\//, '').replace(/\\/g, '/');
}

export function useAsset(assetPath: string): string | null {
  const [assetUri, setAssetUri] = useState<string | null>(null);
  
  // Memoize values to prevent infinite loops
  const metroHost = useMemo(() => getMetroHost(), []);
  const normalizedPath = useMemo(() => normalizePath(assetPath), [assetPath]);
  
  useEffect(() => {
    async function loadAsset() {
      if (__DEV__) {
        // Development: Use Metro server to serve the asset
        const devUri = `http://${metroHost}/assets/${normalizedPath}`;
        
        setAssetUri(devUri);
      } else {
        // Production: Load from bundle
        try {
          if (Platform.OS === 'ios') {
            // On iOS, the plugin copies files to the app bundle
            // They can be accessed via the main bundle path
            const fileName = normalizedPath.split('/').pop();
            const file = new File(`${Paths.bundle}${fileName}`);

            if (file.exists) {
              setAssetUri(file.uri);
            } else {
              console.error('Asset not found in iOS bundle:', file.uri);
            }
          } else if (Platform.OS === 'android') {
            // On Android, assets are in the APK
            // The plugin copies them to the assets folder
            // We need to copy them to a readable location first
            const fileName = normalizedPath.split('/').pop();
            const localFile = new File(`${Paths.document}${fileName}`);

            try {
              // Check if already copied
              if (!localFile.exists) {
                // Copy from Android assets to document directory
                // This requires the asset to be in android/app/src/main/assets/
                const sourceFile = new File(`${Paths.bundle}../../assets/${fileName}`);
                sourceFile.copy(localFile);
              }

              setAssetUri(localFile.uri);
            } catch (error) {
              // Fallback: try direct asset:// URI (works for some file types)
              const assetUri = `asset:///${fileName}`;
              setAssetUri(assetUri);
            }
          }
        } catch (error) {
          console.error('Error loading production asset:', error);
        }
      }
    }
    
    loadAsset();
  }, [normalizedPath, metroHost]);
  
  return assetUri;
}