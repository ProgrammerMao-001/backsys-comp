# yt-ui组件库
vue后台系统常用的组件

* [demo](https://programmermao-001.github.io/useYtUi/)
* [文档地址](https://programmermao-001.github.io/ytUi-doc/)

### 使用前须知
```
1. 目前只支持vue2.x 版本，vue3以上版本暂不支持
2. 本组件库基于ElementUi开发，使用前请务必确保正确安装elementUi组件库
3. 组件库中所有的样式命名规则为： yt-组件名称(-yt) 
    3.1 如文件名为：ytDemo 则外层样式类名为：yt-demo，以此类推
4. 所有组件的demo都存放在examples文件夹中
5. 本组件库内置了很多公共方法，源码请查看 @mhfwork/yt-ui/components/utils/publicFun.js，具体使用请查看文档
```

### 相关依赖项安装 
``` 
建议node14及以上版本（推荐v14.16.1）
npm install node-sass@4.14.1 --save-dev
npm install sass-loader@8.0.0 --save-dev
```

### node 对应版本可参照下表
<img src="https://img-blog.csdnimg.cn/3073e67b6bf0429f892d6fcb97ade1c6.png" alt="node对应版本" width="400"/>

### 文件介绍
``` 
components文件夹 ---> 存放所有的组件
examples文件夹 ---> 存放组件的demo(组件如何使用)
public文件夹 ---> 存放组件的静态资源
```

### 发布流程
``` 
 todo: 更新 readeMe.md、package.json版本号   
 1. npm run lib   
 2. npm get registry 
 3. npm login
 4. npm publish --access public
```

### 如何使用
```
 1. 安装  
    npm i @mhfwork/yt-ui --save-dev
 
 2. main.js 中注册（选择其中一种方式注册）
    2.1 按需导入（完整的组件列表请看下方[组件列表]）
        import ytComp from "@mhfwork/yt-ui/components/ytComp";
        import ytDemo from "@mhfwork/yt-ui/components/ytDemo";
        Vue.use(ytComp)
        Vue.use(ytDemo)
    2.2 全局导入
        import Vue from "vue";
        import ytUi from "@mhfwork/yt-ui/components/index.js";
        Vue.use(ytUi);
 
 3. vue文件中使用
    <yt-comp page-name="pageName"/>
    <yt-demo />
```

### 组件列表
```
    ytFileUpload    文件上传通用组件
    ytForm          搜索表单组件
    ytIsShowForm    显示隐藏筛选框组件
    ytRealCanvas    canvas实时展示输入的内容
    ytTableBtn      自定义按钮组
    ytTable         基于el-table封装的表格组件（非树形结构）
    ytPagination    分页组件
    ytPageComp      快速搭建 搜索栏 + 表格 + 分页的页面
```

### 开发中...
```
 1. ytChooseDialog 弹窗选择器（表格选择数据，可展示并保存对应的tags）
 2. ytPageComp（快速搭建 搜索栏 + 表格 + 分页的页面） 
```
