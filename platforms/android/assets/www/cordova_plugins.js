cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.megster.cordova.bluetoothserial/www/bluetoothSerial.js",
        "id": "com.megster.cordova.bluetoothserial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "file": "plugins/com.manueldeveloper.volume-buttons/www/volumebuttons.js",
        "id": "com.manueldeveloper.volume-buttons.volumebuttons",
        "clobbers": [
            "navigator.volumebuttons"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.megster.cordova.bluetoothserial": "0.4.1",
    "com.manueldeveloper.volume-buttons": "0.0.1",
    "com.jamiestarke.webviewdebug": "1.0.8"
}
// BOTTOM OF METADATA
});