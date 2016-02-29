#!/bin/ah
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore blink-release-unsigned.apk blink
jarsigner -verify -verbose -certs
/home/rudis1261/AndroidSDK/build-tools/23.0.2/zipalign -v 4 blink-release-unsigned.apk blink-release.apk
