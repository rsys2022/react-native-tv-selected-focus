package com.tvselectedfocus;

import androidx.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = TvSelectedFocusModule.NAME)
public class TvSelectedFocusModule extends ReactContextBaseJavaModule {
  public static final String NAME = "TvSelectedFocus";
  private final ReactApplicationContext mContext;
  public TvSelectedFocusModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void updateView(int tag, String className, ReadableMap props) {
    Log.d("check updateView function-----",String.valueOf(props))
    try {
      mContext.getNativeModule(UIManagerModule.class).getUIImplementation().updateView(
        tag,
        className,
        props
      );
    } catch (IllegalViewOperationException ignore) {
      Log.w(this.getName(), "Failed updating view with tag: " + tag);
    }
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }
}
