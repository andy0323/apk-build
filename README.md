# apk-build 

apk-build node 一款安卓打包apk的工具 

[![npm version](https://badge.fury.io/js/apk-build.svg)](http://badge.fury.io/js/apk-build)

## how to install 

1. 打开你的终端Terminal
*  输入`npm -v`查看是否安装npm
*  如果没有安装，请到[nodejs官网](http://nodejs.org/)进行安装
*  npm安装完成以后，终端运行`npm install -g apk-build`
*  终端运行`apk-build -h`确认安装成功

如果还有其他疑问，可以参照[npm相关资料](https://www.npmjs.org/doc/misc/npm-developers.html)，希望可以帮助你更好得了解它

## Command

	apk-build <project_path> <keystore_path> <keystore_name> <keystore_password> -v -o <ipa_output_path> 
	
**参数（必填项）：** 

| 参数                | 参数说明          |
|--------------------|------------------|
| project_path       | 代表项目路径       |
| keystore_path      | 代表打包证书的路径  |
| keystore_name      | 代表打包证书的名称  |
| keystore_password  | 代表打包证书的密码  |

**可选项：**

| 可选项 | 参数用途    | 参数例子  | 默认参数                |  
|-------|------------|---------|------------------------|
| -v    | 打印日志    | 无需参数  | 无输出                  |
| -o    | ipa输出路径 | ~/.apk   | 终端当前路径下的build文件夹|

## Usages

1. 打开终端Terminal
*  输入`cd`指令进入你的项目文件夹
*  输入`apk-build test/node/android test/android.keystore android.keystore 123456`
*  输入`open .`获取apk文件

**目前版本不是很稳定，只能打包简单的Android项目。**

## keystore

### 如何生成keystore

进入终端，输入下列命令，然后根据指定的要求输入特定的内容。

```
keytool -genkey -alias android.keystore -keyalg RSA -validity 20000 -keystore android.keystore
```

## Test

如何测试apk-build？

打开终端，输入`npm test`，等打包完毕，输入`open .`，就可以看到生成完毕的signed.apk

##Contributing

*  Fork it
*  Create your feature branch (git checkout -b my-new-feature)  
*  Commit your changes (git commit -am 'Add some feature')  
*  Push to the branch (git push origin my-new-feature)  
*  Create new Pull Request  

## History

- v0.1.0 初始化版本

## Welcome fork and feedback

- write by `andy` andy_ios@163.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).