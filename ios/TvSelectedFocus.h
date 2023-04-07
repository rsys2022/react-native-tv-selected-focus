
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTvSelectedFocusSpec.h"

@interface TvSelectedFocus : NSObject <NativeTvSelectedFocusSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TvSelectedFocus : NSObject <RCTBridgeModule>
#endif

@end
