#pragma once

#import <React/RCTBridgeModule.h>

#include "GodotManager.h"

@interface GodotModule : NSObject <RCTBridgeModule>

- (GodotManager *)manager;

@end
