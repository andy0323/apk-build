# apk-build 

apk-build node 一款安卓打包apk的工具 

## 全局配置属性表

| 属性名称 | 属性介绍 |
|---------|---------|
| appName | 应用名称 |
| android-jar | 编译需要的jar |
| framework-aidl | 编译aidl文件所需的预处理框架文件framework.aidl |
| outdir-gen| 生成R文件的相对目录 |
| outdir-bin | 编译后的文件放置目录 |
| manifest-xml | 清单文件 |
| resource-dir | 源文件目录 |
| asset-dir | 源文件目录 |
| srcdir | java源文件目录 |
| external-lib | 外部类库所在目录 |
| outdir-classes | 生成Class目录 |
| dex-file | classes.dex相关变量 |
| dex-path | classes.dex相关变量 |
| resources-package | 经过aapt生成的资源包文件 |
| out-unsigned-package | 未认证apk包 |
| keystore-file | 证书文件 |
| out-signed-package |  已认证apk包 |