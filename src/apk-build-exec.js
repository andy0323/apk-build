var shell = require('shelljs');
var _cmd = require('./apk-build-cmd.js');

/**
 *  执行指令
 * 
 *	根据工程中的资源文件生成R.java文件
 *
 *	@param gen_path         生成R文件的相对目录
 *	@param res_path         源文件目录
 *	@param xml_path         清单文件路径
 *	@param android_jar_path 安卓Jar包
 */
function aadp_exec (gen_path, res_path, xml_path, android_jar_path) {
	var cmd = _cmd.get_aapt_cmd(gen_path, res_path, xml_path, android_jar_path);
	shell.exec(cmd);
}
exports.aadp_exec = aadp_exec;

/**
 *  执行指令
 * 
 *  编译aidl文件
 * 
 *	@param aidl_framework_path 指定预处理文件目录
 *	@param src_path            aidl声明的目录 
 *	@param gen_path            目标文件目录
 *	@param aidl_file_path      指定哪些文件需要编译
 */
function aidl_exec(aidl_framework_path, src_path, gen_path, aidl_file_path) {

}
exports.aidl_exec = aidl_exec;

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
function compile_exec(src_dir_path, dest_dir_path, bootclass_path, libs_dir_path, map_jap_path) {
	var cmd =  _cmd.get_compile_cmd(src_dir_path, dest_dir_path, bootclass_path, libs_dir_path, map_jap_path);
	shell.exec(cmd);
}
exports.compile_exec = compile_exec;

/*
 *	执行指令
 *
 *	将.class文件转化成.dex文件
 *
 * 	@param dex_path   输出dx文件
 * 	@param class_path 要生成.dex文件的源classes
 * 	@param lib_path   要生成.dex文件的源libraries
 */
function dex_exec(dex_path, class_path, lib_path) {
	var cmd = _cmd.get_dex_cmd(dex_path, class_path, lib_path);
	shell.exec(cmd);
}
exports.dex_exec = dex_exec;

/*
 *	执行指令
 *
 *  将资源文件放进输出目录
 * 
 * 	@param xml_path         清单文件路径
 * 	@param res_path         资源文件路径
 * 	@param assets_path      资源文件路径
 * 	@param android_jar_path 安卓Jar包
 * 	@param res_package_path 输出资源Zip包
 */ 
function package_exec(xml_path, res_path, assets_path, android_jar_path, res_package_path) {
	var cmd = _cmd.get_package_cmd(xml_path, res_path, assets_path, android_jar_path, res_package_path);
	shell.exec(cmd);
}
exports.package_exec = package_exec;

/**
 *	执行指令
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
function apk_builder_exec(sdklib_jar_path, unsigned_apk_path, res_package_path, class_dex_path, src_path, lib_path) {
	var cmd = _cmd.get_apk_builder_cmd(sdklib_jar_path, unsigned_apk_path, res_package_path, class_dex_path, src_path, lib_path);
	shell.exec(cmd);
}
exports.apk_builder_exec = apk_builder_exec;

/**
 *	执行指令
 *
 *	apk签证
 *
 * 	@param keystore_path     keystore路径
 * 	@param keystore_pass     keystore密码
 *	@param keystore_name     keystore名称
 *	@param signed_apk_path   签证后apk导出路径
 *	@param unsigned_apk_path 未签证apk导入路径
 */
function jarsigner_exec(keystore_path, keystore_pass, keystore_name, signed_apk_path, unsigned_apk_path) {
	var cmd = _cmd.get_jarsigner_cmd(keystore_path, keystore_pass, keystore_name, signed_apk_path, unsigned_apk_path);
	shell.exec(cmd);
}
exports.jarsigner_exec = jarsigner_exec;




