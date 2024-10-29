#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTBridge+Private.h>
#import <ReactCommon/RCTTurboModule.h>

#import <ReactNativeGodot/GodotModule.h>
#import <ReactNativeGodot/GodotManager.h>

using namespace facebook;

@implementation GodotModule {
    GodotManager *godotManager;
    jsi::Runtime* runtime_;
    std::shared_ptr<facebook::react::CallInvoker> jsCallInvoker_;
}

RCT_EXPORT_MODULE()

- (GodotManager *)manager {
    return godotManager;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)invalidate {
    if (godotManager != nil) {
        [godotManager invalidate];
    }
    godotManager = nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
    if (godotManager != nil) {
        // Already initialized, ignore call.
        return @true;
    }

    auto _bridge = [RCTBridge currentBridge];
    RCTCxxBridge *_cxxBridge = (RCTCxxBridge *)_bridge;
    if (_cxxBridge == nil) return @false;
    runtime_ = (jsi::Runtime*) _cxxBridge.runtime;
    if (runtime_ == nil) return @false;
    jsCallInvoker_ = _cxxBridge.jsCallInvoker;

    godotManager = [[GodotManager alloc] initWithBridge:_bridge jsInvoker:jsCallInvoker_];

    return @true;
}

@end
