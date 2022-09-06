package com.devt2.fooddeliveryapp;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.skt.Tmap.TMapTapi;
import org.jetbrains.annotations.NotNull;
import android.util.Log;
import java.util.HashMap;

public class TMapModule extends ReactContextBaseJavaModule {
    TMapModule(ReactApplicationContext context) {
        super(context);

        TMapTapi tMapTapi = new TMapTapi(context);

        tMapTapi.setSKTMapAuthentication("l7xx3fcf34960c684fb4ad18e23c7342c415");
    }

    @NotNull
    @Override
    public String getName() {
        return "TMap";
    }

    @ReactMethod
    public void openNavi(String name, String longitude, String latitude, String vehicle, Promise promise) {
        TMapTapi tMapTapi = new TMapTapi(getReactApplicationContext());
        boolean isTMapApp = tMapTapi.isTmapApplicationInstalled();

        if (isTMapApp) {
            HashMap pathInfo = new HashMap();

            pathInfo.put("rGoName", name);
            pathInfo.put("rGoX", longitude);
            pathInfo.put("rGoY", latitude);
            pathInfo.put("rSOpt", vehicle.equals("MOTORCYCLE") ? "6" : "0");
            
            boolean result = tMapTapi.invokeRoute(pathInfo);

            if (result) {
                promise.resolve(true);
            } else {
                promise.resolve(true);
            }
        } else {
            promise.resolve(false);
        }
    }
}