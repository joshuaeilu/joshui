# Prayer Wheel

## Development

Run `pnpm i` to install all dependencies.

### Web

Run `pnpm start` to start the web server and launch the website in a browser.

### Android

Run `pnpm android` to build for Android and attempt to connect to a device over ADB and deploy.

## Release

### Web

No clue.  No clue at all.

### Android

Let it be known that it took me upwards of a half hour to find this thread.
https://forum.ionicframework.com/t/how-to-build-an-android-apk-file-without-using-android-studio-in-a-capacitor-project/177814/10

TL;DR:
For an unsigned build, enter the `android` directory and run `./gradlew assembleDebug`.
Your file will be found in `android/app/build/outputs/apk/debug/`.

If you plan to venture so far as to use the Google Play store, run these:
```bash
cd android && 
./gradlew assembleRelease && 
cd app/build/outputs/apk/release &&
jarsigner -keystore YOUR_KEYSTORE_PATH -storepass YOUR_KEYSTORE_PASS app-release-unsigned.apk YOUR_KEYSTORE_ALIAS &&
zipalign 4 app-release-unsigned.apk app-release.apk
```
