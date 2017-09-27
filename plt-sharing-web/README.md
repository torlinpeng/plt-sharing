# iview2-manage-system

基于Vue2 + iView2.0的后台管理系统解决方案简单示例.

线上访问(不支持手机 / 已修复访问速度过慢的问题)：[电脑访问](www.pallet360.com)

--------------



--------------

### 使用
```
npm i               // 安装依赖
npm run dev         // 本地开发
npm run build       // 生产部署
```
--------------

### 目录结构
	|-- build                                  // webpack配置文件
	|-- config                                 // 项目打包路径
	|-- static                                 // 静态文件目录
	|-- src                                    // 源码目录
	|   |-- components                         // 组件
	|       |-- common                         // 全局
	|           |-- about.vue                  // 关于页面
	|           |-- index.vue                  // 入口
	|           |-- login.vue                  // 登录页面
	|   	|-- page                           // 主要页面
	|           |-- eharts.vue                 // 百度echarts
	|           |-- form.vue                   // 表单
	|           |-- rtf.vue                    // 富文本框
	|           |-- markdown-viewer.vue        // markdown显示
	|           |-- markdown-editor.vue        // markdown编辑器
	|           |-- table.vue                  // 表格
	|           |-- upload.vue                 // 文件上传
	|   |-- App.vue                            // 页面入口
	|   |-- main.js                            // 程序入口
	|-- .babelrc                               // ES6语法编译配置
	|-- .editorconfig                          // 代码编写规格
	|-- .gitignore                             // push忽略文件
	|-- index.html                             // 入口html页面
	|-- package.json                           // 依赖及配置
	|-- README.md                              // 简介
	
--------------

### 截图预览


----------------

### 存在的问题及维护说明
1.字体路径有错误，下次更新将会修复



---------------

### 其他
有任何问题或建议欢迎提出issue.

---------------

### License
[MIT](https://opensource.org/licenses/MIT)
