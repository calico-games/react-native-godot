#pragma once

#include <React/RCTBridge.h>
#include <ReactCommon/CallInvoker.h>

namespace RNGodot {
class RNGodotManager;
} // namespace RNGodotManager

@interface GodotManager : NSObject

- (std::shared_ptr<RNGodot::RNGodotManager>)instance;

- (instancetype)init NS_UNAVAILABLE;

- (void)invalidate;

- (instancetype)initWithBridge:(RCTBridge *)bridge
                     jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)
jsInvoker;

@end
