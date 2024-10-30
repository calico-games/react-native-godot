require "json"
require_relative "./react-native-godot-utils.rb"

# package.json
package = JSON.parse(File.read(File.join(__dir__, "package.json")))
version = package['version']

source = download_prebuilt(__dir__, package["version"])

Pod::Spec.new do |s|
  s.name         = "react-native-godot"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = "Bring Godot to React Native."
  s.homepage     = "https://github.com/calico-games/react-native-godot"
  # brief license entry:
  s.license      = "Copyright © 2024 Calico Games. All rights reserved."
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Calico Games" => "team@calico.games" }
  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = source

  s.requires_arc = true
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
    "CLANG_CXX_LIBRARY" => "libc++",
    'DEFINES_MODULE' => 'YES',
    "HEADER_SEARCH_PATHS" => '"$(PODS_TARGET_SRCROOT)/cpp/"/**'
  }

  s.dependency 'React-Core'
  s.dependency 'React-CoreModules'

  s.frameworks = 'MetalKit'

  s.ios.vendored_frameworks = [
    'libs/ios/ReactNativeGodot.xcframework',
  ]

  # All iOS files
  s.source_files = [
    "ios/**/*.{h,hpp,c,cc,cpp,m,mm,swift}"
  ]
end