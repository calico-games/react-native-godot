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
    std::shared_ptr<facebook::react::CallInvoker> jsCallInvoker;
}

RCT_EXPORT_MODULE()
@synthesize bridge = _bridge;

#pragma Accessors

- (GodotManager *)manager {
    return godotManager;
}

#pragma Setup and invalidation

+ (BOOL)requiresMainQueueSetup {
    return NO;
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

    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
    if (!jsCallInvoker) {
        jsCallInvoker = cxxBridge.jsCallInvoker;
    }

    godotManager = [[GodotManager alloc] initWithBridge:_bridge jsInvoker:jsCallInvoker];

    return @true;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params {
    jsCallInvoker = params.jsInvoker;
    return std::make_shared<facebook::react::NativeGodotModuleSpecJSI>(params);
}
#endif

@end
