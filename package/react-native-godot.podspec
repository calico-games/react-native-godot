require "json"
require_relative "./react-native-godot-utils.rb"

# package.json
package = JSON.parse(File.read(File.join(__dir__, "package.json")))
version = package['version'].gsub(/dev-.*/, '')

source = download_prebuilt(__dir__, version)

Pod::Spec.new do |s|
  s.name         = "react-native-godot"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = "Bring Godot to React Native."
  s.homepage     = "https://github.com/calico-games/react-native-godot"
  s.license      = "Copyright © 2024 Calico Games. All rights reserved."
  s.authors      = { "Calico Games" => "team@calico.games" }
  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = source

  s.requires_arc = true
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
    "CLANG_CXX_LIBRARY" => "libc++",
    'DEFINES_MODULE' => 'YES'
  }
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then 
    s.compiler_flags = "-DRCT_NEW_ARCH_ENABLED=1"
  end

  s.dependency 'React-Core'
  s.dependency 'React-CoreModules'

  s.frameworks = ['MetalKit', 'MetalFX']

  s.ios.vendored_frameworks = [
    'libs/ios/ReactNativeGodot.xcframework',
  ]

  # All iOS files
  s.source_files = [
    'ios/GodotModule.mm',
  ]
end