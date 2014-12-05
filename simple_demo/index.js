var shell = require('shelljs');
var _cmd  = require('./src/apk-build-cmd.js');
var _exec = require('./src/apk-build-exec.js');

var SDK_ANDROID_JAR_PATH = '/Users/andy/private/tool/android/sdk/platforms/android-19/android.jar';
var SDK_MAP_JAR_PATH     = '/Users/andy/private/tool/android/sdk/add-ons/addon-google_apis-google-19/libs/maps.jar';
var SDK_SDKLIB_JAR_PATH  = '/Users/andy/private/tool/android/sdk/tools/lib/sdklib.jar';

/**
 *	安卓客户端一键打包	
 *
 *  @param pro_path 项目路径
 * 	@param apk_output_path apk输出路径
 *	@param keystore_path keystore路径
 *	@param keystore_pas  keystore密码
 *	@param keystore_name keystore名称
 */
function build_exec(pro_path, apk_output_path, keystore_path, keystore_name, keystore_pas) {
	// 设置全局路径
	var gen_path = pro_path + '/gen';
	var res_path = pro_path + '/res';
	var xml_path = pro_path + '/AndroidManifest.xml';
	var lib_path = pro_path + '/libs';
	var ass_path = pro_path + '/assets';
	var src_path = pro_path + '/src';

	// 设置输出缓存文件路径
	var class_path   = pro_path + '/cache/classes';
	var dx_path      = pro_path + '/cache/dx';
	var unsigned_apk_path     = pro_path + '/cahce/unsigned.apk';
	var package_path = pro_path + '/cache/resources-package';

	// 移除缓存
	shell.exec('rm -rf ' + pro_path + '/cache');

	// 初始化文件目录
	shell.exec('mkdir -p ' + class_path);
	shell.exec('mkdir -p'  + dx_path);

	// 开始执行脚本
	_exec.aadp_exec(gen_path, res_path, xml_path, SDK_ANDROID_JAR_PATH);
	_exec.compile_exec(pro_path, class_path, SDK_ANDROID_JAR_PATH, libs, SDK_MAP_JAR_PATH);       
	_exec.dex_exec(dx_path, class_path, libs, SDK_MAP_JAR_PATH);
	_exec.package_exec(xml_path, res_path, ass_path, SDK_SDKLIB_JAR_PATH, package_path);
	_exec.apk_builder_exec(SDK_SDKLIB_JAR_PATH, unsigned_apk_path, package_path, dx_path + '/*.dex', src_path, lib_path);
	_exec.jarsigner_exec(keystore_path, keystore_pas, keystore_name, apk_output_path, unsigned_apk_path);
}

