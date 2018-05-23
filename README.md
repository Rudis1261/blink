# Blink
### Bluetooth Linux Remote for Android devices

When you want to be able to control your Linux Computer, and Wifi is not an option. This is something I wrote, because nothing else on the market seemed to work.

### Get the app on the Android AppStore:
https://play.google.com/store/apps/details?id=co.za.thatguy.blink

### Get the Server:
Follow the instructions to get the server on its dedicated GitHub page: https://github.com/drpain/blink-server

And enjoy!

# Changelog
### V1.0.1 - 29 Feb 2016
- Bug Fix: When you would drag the mouse and stop, it would from time to time right click. Which may be annoying.


### V1.0.0 - 27 Feb 2016
- Mouse speed slider (mouse movement speed)
- Click sensitivity slider (How fast / slow for a tap to register a click)
- A double click is now 2 rapid click after each other
- Right Click sensitivity slider (How long to hold the tap to right click)
- UI Tweaks
- Cordova update to latest (Security Precaution)

Swipe Area Changes | Added Application Settings
-------------------|---------------------------
![Swipe Area Screen Change](/designs/screenshots/Screenshot_2016-02-27-01-14-18.png)|![Added Application Settings](/designs/screenshots/Screenshot_2016-02-27-01-14-36.png)

### Notes (Mostly for myself)

Relies on the following cordova plugin (No concern to installers)

```shell
# Adding plugins
cordova plugin add com.manueldeveloper.volume-buttons
cordova plugin add cordova-plugin-bluetooth-serial

# Creating project directory
cordova create <project> co.za.thatguy.<project> <project>

# Add Android
cordova platform add android

# Releases
cordova build android

cordova build android --debug       # Debug Mode
cordova build android --release     # Release
```
