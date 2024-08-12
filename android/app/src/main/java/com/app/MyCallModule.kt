package com.app

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyCallModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyCallModule"
    }

    @ReactMethod
    fun makeCall(phoneNumber: String) {
        if (phoneNumber.isNotEmpty()) {
            val intent = Intent(Intent.ACTION_CALL).apply {
                data = Uri.parse("tel:$phoneNumber")
            }
            getCurrentActivity()?.startActivity(intent)
        }
    }
}
