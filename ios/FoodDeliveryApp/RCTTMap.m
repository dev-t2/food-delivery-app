#import "RCTTMap.h"
#import "TMapTapi.h"

@implementation RCTTMap
- (instancetype)init {
    self = [super init];

    [TMapTapi setSKTMapAuthenticationWithDelegate:self apiKey:@"l7xx193d714429164e4981a5bfdd043f4ba3"];
    
    return self;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(TMap);

RCT_EXPORT_METHOD(openNavi: (NSString *)name longitude:(NSString *)longitude latitude:(NSString *)latitude vehicle:(NSString *)vehicle resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    NSLog(@"y,x %@, %@", latitude, longitude);

    BOOL installed = [TMapTapi isTmapApplicationInstalled];

    if (installed) {
        CLLocationCoordinate2D centerCoordinate = {[latitude doubleValue], [longitude doubleValue]};
        BOOL flag = [TMapTapi invokeRoute:name coordinate: centerCoordinate];

        NSLog(flag ? @"Yes" : @"No");

        if (flag) {
            resolve(@(YES));
        } else {
            resolve(@(NO));
        }
    } else {
        resolve(@(NO));
    }
}

@end