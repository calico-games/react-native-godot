package games.calico;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import java.lang.ref.WeakReference;

@ReactModule(name = "EngineJsiModule")
public class EngineJsiModule extends ReactContextBaseJavaModule {
    public static final String NAME = "EngineJsiModule";
    public static native void engine_init(long runtimePtr, CallInvokerHolderImpl callInvoker);

    private final WeakReference<ReactApplicationContext> weakReactContext;

    public EngineJsiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.weakReactContext = new WeakReference<>(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean install() {
        try {
            // Load our dynamic library
            System.loadLibrary("engine");
        } catch (Exception ex) {
            System.err.println("Could not load Engine library");
            return false;
        }

        Log.i(NAME, "Engine Loaded!");

        try {
            ReactApplicationContext context = weakReactContext.get();
            if (context == null) {
                Log.e(NAME, "React Application Context was null!");
                return false;
            }
            var jsContext = context.getJavaScriptContextHolder();
            var runtimePtr = jsContext.get();
            var callInvoker = (CallInvokerHolderImpl)context.getCatalystInstance().getJSCallInvokerHolder();

            Log.i(NAME, "Initializing Engine...");

            if (jsContext.get() != 0) {
                EngineJsiModule.engine_init(runtimePtr, callInvoker);
                Log.i(NAME, "Engine initialized yeahhh");

                return true;
            } else {
                Log.e(NAME,"Failed to initialize engine: no runtime");
                return false;
            }
        } catch (Exception exception) {
            Log.e(NAME, "Failed to initialize engine", exception);
            return false;
        }
    }
}
