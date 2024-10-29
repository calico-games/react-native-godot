project(rnengine)
cmake_minimum_required(VERSION 3.8)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DSK_GL -DSK_GANESH -DSK_BUILD_FOR_ANDROID -DFOLLY_NO_CONFIG=1 -DFOLLY_HAVE_CLOCK_GETTIME=1 -DFOLLY_HAVE_MEMRCHR=1 -DFOLLY_USE_LIBCPP=1 -DFOLLY_MOBILE=1 -DON_ANDROID -DONANDROID")
string(APPEND CMAKE_CXX_FLAGS " -DHERMES_ENABLE_DEBUGGER=${HERMES_ENABLE_DEBUGGER}")

message("-- REACT_NATIVE_DIR        : " ${REACT_NATIVE_DIR})

include("${REACT_NATIVE_DIR}/ReactAndroid/cmake-utils/folly-flags.cmake")
add_compile_options(${folly_FLAGS})

message("-- REACT NATIVE VERSION   : " ${REACT_NATIVE_VERSION})

set (PACKAGE_NAME "rnengine")

# Consume shared libraries and headers from prefabs
find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
if(${JS_RUNTIME} STREQUAL "hermes")
    find_package(hermes-engine REQUIRED CONFIG)
endif()

add_library( # Sets the name of the library.
        rnengine

        # Sets the library as a shared library.
        SHARED

        # Provides a relative path to your source file(s).
        native-lib.cpp)

# includes

target_include_directories(
    ${PACKAGE_NAME}
    PRIVATE
    "${REACT_NATIVE_DIR}/ReactAndroid/src/main/jni/react/turbomodule"
    "${REACT_NATIVE_DIR}/ReactCommon"
    "${REACT_NATIVE_DIR}/ReactCommon/callinvoker"
    "${REACT_NATIVE_DIR}/ReactCommon/react/renderer/graphics/platform/cxx"
    "${REACT_NATIVE_DIR}/ReactCommon/runtimeexecutor"
    "${REACT_NATIVE_DIR}/ReactCommon/yoga"
)

# build shared lib

set_target_properties(${PACKAGE_NAME} PROPERTIES LINKER_LANGUAGE CXX)

find_library( # Sets the name of the path variable.
        LOG_LIB

        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log
)
message("-- LOG     : " ${LOG_LIB})

target_link_libraries( # Specifies the target library.
        ${PACKAGE_NAME}
        ${LOG_LIB}
        ReactAndroid::folly_runtime
        ReactAndroid::glog
        ReactAndroid::jsi
        ReactAndroid::reactnativejni
        fbjni::fbjni
)

if(${JS_RUNTIME} STREQUAL "hermes")
    string(APPEND CMAKE_CXX_FLAGS " -DJS_RUNTIME_HERMES=1")
    # From prefab from module `com.facebook.react:hermes-android`
    set(HERMES_LIB hermes-engine::libhermes)
    target_link_libraries(
        ${PACKAGE_NAME}
        ${HERMES_LIB}
    )
    if (${HERMES_ENABLE_DEBUGGER})
        set(HERMES_EXECUTOR_LIB ReactAndroid::hermes_executor)
        target_link_libraries(
                ${PACKAGE_NAME}
                ${HERMES_EXECUTOR_LIB}
        )
    endif()
elseif(${JS_RUNTIME} STREQUAL "jsc")
    string(APPEND CMAKE_CXX_FLAGS " -DJS_RUNTIME_JSC=1")
    set(JSEXECUTOR_LIB ReactAndroid::jscexecutor)
    target_link_libraries(${PACKAGE_NAME} ${JSEXECUTOR_LIB})
else()
    message(FATAL_ERROR "Unknown JS runtime ${JS_RUNTIME}.")
endif()