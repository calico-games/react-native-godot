require 'net/http'

def download_prebuilt(react_native_path, version)
    url = prebuilt_url(version)
    download_stable(react_native_path, version)
    return {:http => url}
end

# HELPERS

def prebuilt_url(version)
  return "https://storage.googleapis.com/react-native-godot/react-native-godot-ios-#{version}.zip"
end


def library_dir()
    return File.join(Pod::Config.instance.project_pods_root, "package/libs")
end

def download_stable(react_native_path, version)
    url = prebuilt_url(version)
    download_xcframework(react_native_path, url, version)
end

def download_xcframework(react_native_path, url, version)
    destination_dir = "#{react_native_path}/libs/ios"
    zip_file = "#{destination_dir}/react-native-godot-ios-#{version}.zip"
    xcframework_dir = "#{destination_dir}/ReactNativeGodot.xcframework"

    if File.exist?(zip_file)
        react_native_godot_log("Using cached prebuilt at #{zip_file}")

        if File.exist?(xcframework_dir)
            react_native_godot_log("Prebuilt already extracted at #{xcframework_dir}")
            return zip_file
        end
    else
        react_native_godot_log("Downloading prebuilt from URL: #{url}")

        # Download to a temporary file first so we don't cache incomplete downloads.
        tmp_file = "#{library_dir()}/react-native-godot-ios.download"

        `mkdir -p "#{library_dir()}" &&
        curl "#{url}" -Lo "#{tmp_file}" &&
        mv "#{tmp_file}" "#{zip_file}" &&
        rm -rf "#{tmp_file}"`
    end

    `rm -rf "#{xcframework_dir}" &&
    unzip "#{zip_file}" -d "#{destination_dir}"`

    return zip_file
end

def react_native_godot_log(message, level = :warning)
    if !Object.const_defined?("Pod::UI")
        return
    end
    custom_message = '[react-native-godot] ' + message
    case level
    when :info
        Pod::UI.puts custom_message.green
    when :error
        Pod::UI.puts custom_message.red
    else
        Pod::UI.puts custom_message.yellow
    end
end