var shell = require('shelljs');

/**
 *  获取指令
 * 
 *	根据工程中的资源文件生成R.java文件
 *
 *	@param gen_path         生成R文件的相对目录
 *	@param res_path         源文件目录
 *	@param xml_path         清单文件路径
 *	@param android_jar_path 安卓Jar包
 */
function get_aapt_cmd(gen_path, res_path, xml_path, android_jar_path) {
	// 基础命令
	var cmd = 'aapt';
	
	// 初始化gen文件夹
	shell.exec('rm -rf ' + gen_path);

	// 设置参数
	cmd = cmd_append_cmd(cmd, 'package');	
	cmd = cmd_append_cmd(cmd, '-f');
	cmd = cmd_append_cmd(cmd, '-m');
	cmd = cmd_append_cmd(cmd, '-J');
	cmd = cmd_append_cmd(cmd, gen_path);
	cmd = cmd_append_cmd(cmd, '-S');
	cmd = cmd_append_cmd(cmd, res_path);
	cmd = cmd_append_cmd(cmd, '-M');
	cmd = cmd_append_cmd(cmd, xml_path);
	cmd = cmd_append_cmd(cmd, '-I');
	cmd = cmd_append_cmd(cmd, android_jar_path);

	return cmd;
}
exports.get_aapt_cmd = get_aapt_cmd;

/**
 *  获取指令
 * 
 *  编译aidl文件
 * 
 *	@param aidl_framework_path 指定预处理文件目录
 *	@param src_path            aidl声明的目录 
 *	@param gen_path            目标文件目录
 *	@param aidl_file_path      指定哪些文件需要编译
 */
function get_aidl_cmd(aidl_framework_path, src_path, gen_path, aidl_file_path) {
	// 基本命令
	var cmd = 'aidl';

	// 设置参数
	cmd = cmd_append_cmd(cmd, '-p' + aidl_framework_path);
	cmd = cmd_append_cmd(cmd, '-I' + src_path);
	cmd = cmd_append_cmd(cmd, '-o' + gen_path);
	cmd = cmd_append_cmd(cmd, 'INPUT');
	cmd = cmd_append_cmd(cmd, aidl_file_path);

	return cmd;
}
exports.get_aidl_cmd = get_aidl_cmd;

/**
 *  获取指令
 *
 *	将工程中的java源文件编译成class文件
 *
 *	@param src_dir_path   资源文件目录
 *	@param dest_dir_path  输出文件目录
 *	@param bootclass_path 引导Jar包
 *	@param libs_dir_path  依赖lib路径
 *	@param map_jap_path	  依赖地图路径
 */
function get_compile_cmd(src_dir_path, dest_dir_path, bootclass_path, libs_dir_path, map_jap_path) {
	// 基本命令
	var cmd = 'javac';

	// 设置依赖库 
	var class_path_cmd = libs_dir_path + ':' + map_jap_path;

	cmd = cmd_append_cmd(cmd, '-encoding utf-8');
	cmd = cmd_append_cmd(cmd, '-target 1.5');
	cmd = cmd_append_cmd(cmd, '-sourcepath');
	cmd = cmd_append_cmd(cmd, src_dir_path);
	cmd = cmd_append_cmd(cmd, '-d');
	cmd = cmd_append_cmd(cmd, dest_dir_path);
	cmd = cmd_append_cmd(cmd, '-bootclasspath');
	cmd = cmd_append_cmd(cmd, bootclass_path);
	cmd = cmd_append_cmd(cmd, '-classpath');
	cmd = cmd_append_cmd(cmd, class_path_cmd);
	cmd = cmd_append_cmd(cmd, './**/*.java')

	return cmd;	
}
exports.get_compile_cmd = get_compile_cmd;

/**
 *	获取指令
 *
 *	将.class文件转化成.dex文件
 *
 * 	@param dex_path   输出dx文件
 * 	@param class_path 要生成.dex文件的源classes
 * 	@param lib_path   要生成.dex文件的源libraries
 */
function get_dex_cmd(dex_path, class_path, lib_path) {
	// 基本命令
	var cmd = 'dx';

	cmd = cmd_append_cmd(cmd, '--dex');
	cmd = cmd_append_cmd(cmd, '--output=' + dex_path);
	cmd = cmd_append_cmd(cmd, class_path);
	cmd = cmd_append_cmd(cmd, lib_path);

	return cmd;
}
exports.get_dex_cmd = get_dex_cmd;

/**
 *	获取指令
 *
 *  将资源文件放进输出目录
 * 
 * 	@param xml_path         清单文件路径
 * 	@param res_path         资源文件路径
 * 	@param assets_path      资源文件路径
 * 	@param android_jar_path 安卓Jar包
 * 	@param res_package_path 输出资源Zip包
 */
function get_package_cmd(xml_path, res_path, assets_path, android_jar_path, res_package_path) {
	// 基本命令
	var cmd = 'aapt';

	cmd = cmd_append_cmd(cmd, 'packae');
	cmd = cmd_append_cmd(cmd, '-f');
	cmd = cmd_append_cmd(cmd, '-M');
	cmd = cmd_append_cmd(cmd, xml_path);
	cmd = cmd_append_cmd(cmd, '-S');
	cmd = cmd_append_cmd(cmd, res_path);
	cmd = cmd_append_cmd(cmd, '-A');
	cmd = cmd_append_cmd(cmd, assets_path);
	cmd = cmd_append_cmd(cmd, '-I');
	cmd = cmd_append_cmd(cmd, android_jar_path);
	cmd = cmd_append_cmd(cmd, '-F');
	cmd = cmd_append_cmd(cmd, res_package_path);

	return cmd;
}
exports.get_package_cmd = get_package_cmd;

/**
 *	获取指令
 *
 *	构建未签证的apk命令
 *
 * 	@param sdklib_jar_path   sdklib的Jar包
 * 	@param unsigned_apk_path 未签证apk导出路径
 *	@param res_package_path  资源文件.Zip包
 *	@param class_dex_path    dex文件路径
 *	@param src_path          资源路径
 *	@param lib_path          依赖路径
 */
function get_apk_builder_cmd(sdklib_jar_path, unsigned_apk_path, res_package_path, class_dex_path, src_path, lib_path) {
	// 基本命令
	var cmd = 'java';

	cmd = cmd_append_cmd(cmd, '-classpath');
	cmd = cmd_append_cmd(cmd, sdklib_jar_path);
	cmd = cmd_append_cmd(cmd, 'com.android.sdklib.build.ApkBuilderMain');
	cmd = cmd_append_cmd(cmd, unsigned_apk_path);
	cmd = cmd_append_cmd(cmd, '-u');
	cmd = cmd_append_cmd(cmd, '-z');
	cmd = cmd_append_cmd(cmd, res_package_path);
	cmd = cmd_append_cmd(cmd, '-f');
	cmd = cmd_append_cmd(cmd, class_dex_path);
	cmd = cmd_append_cmd(cmd, '-rf');
	cmd = cmd_append_cmd(cmd, src_path);
	cmd = cmd_append_cmd(cmd, '-rj');
	cmd = cmd_append_cmd(cmd, lib_path);

	return cmd;
}
exports.get_apk_builder_cmd = get_apk_builder_cmd;

/**
 *	获取指令
 *
 *	apk签证
 *
 * 	@param keystore_path     keystore路径
 * 	@param keystore_pass     keystore密码
 *	@param keystore_name     keystore名称
 *	@param signed_apk_path   签证后apk导出路径
 *	@param unsigned_apk_path 未签证apk导入路径
 */
function get_jarsigner_cmd(keystore_path, keystore_pass, keystore_name, signed_apk_path, unsigned_apk_path) {
	// 基本命令
	var cmd = 'jarsigner';

	cmd = cmd_append_cmd(cmd, '-keystore');
	cmd = cmd_append_cmd(cmd, keystore_path);
	cmd = cmd_append_cmd(cmd, '-storepass');
	cmd = cmd_append_cmd(cmd, keystore_pass);
	cmd = cmd_append_cmd(cmd, '-keypass');
	cmd = cmd_append_cmd(cmd, keystore_pass);
	cmd = cmd_append_cmd(cmd, '-signedjar');
	cmd = cmd_append_cmd(cmd, signed_apk_path);
	cmd = cmd_append_cmd(cmd, unsigned_apk_path);
	cmd = cmd_append_cmd(cmd, keystore_name)

	return cmd;
}
exports.get_jarsigner_cmd = get_jarsigner_cmd;

/**
 *  命令行拼接
 */
function cmd_append_cmd(cmd, new_cmd) {

    cmd += ' ';

    cmd += new_cmd;

    return cmd;
}