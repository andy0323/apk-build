var shell = require('shelljs');
var _cmd  = require('./src/apk-build-cmd.js');
var _exec = require('./src/apk-build-exec.js');

// aadp_exec('gen', 'res', 'AndroidManifest.xml', '/Users/andy/private/tool/android/sdk/platforms/android-19/android.jar');
// compile_exec('.', 'class_path', '/Users/andy/private/tool/android/sdk/platforms/android-19/android.jar', 'libs', '/Users/andy/private/tool/android/sdk/add-ons/addon-google_apis-google-19/libs/maps.jar');       
// dex_exec('dex_osoath', 'class_path', 'libs');
// package_exec('AndroidManifest.xml', 'res', 'assets', '/Users/andy/private/tool/android/sdk/platforms/android-19/android.jar', 'resources-package');
// apk_builder_exec('/Users/andy/private/tool/android/sdk/tools/lib/sdklib.jar', 'unsigned.apk', 'resources-package', 'dex_osoath/classes.dex', 'src', 'libs');
// jarsigner_exec('/Users/andy/Desktop/android.keystore', 'nationsky88', 'android.keystore', 'signed.apk', 'unsigned.apk');


var pwd