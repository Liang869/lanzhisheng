
# Mac // 安装GM图形库
    brew install GraphicsMagick
    npm install gmsmith
# 环境搭建
    1. 安装Node
    2. npm i grunt -g
    3. npm install
# 运行打包
## 测试打包
        1. 全局运行：
            grunt dev
        2. 单个项目运行：
            grunt dev --target=项目文件夹名称
        3. 例如：
            grunt dev --target=compay //快速打包compay项目
## 生产打包
        1. 全局运行：
            grunt
        2. 单个项目运行：
            grunt --target=项目文件夹名称
# 目录结构
* dist *生产包*
* src *开发包*
    - lab *资源目录*
        - css 
        - fonts
        - img
        - js
    - page  *项目目录*
        + actCheers *庆5000万活动*
        + actEveryNight *夜市活动*
        + actFirstAndLastPro *首尾标活动*
            * css
            * img
            * js
                - _app.app *合并压缩js 配置文*
                - _app.js *输出的合并压缩后的js文件*
                - index.js *自定义js文*
            * less *雪碧图输出的less代码*
            * slice *雪碧图*
                - slizcess *雪碧图css代码*
            * index.html
        + actNewUser *新人专享活动*
        + common *公共组件*
        + compay *公司介绍*

        lzs