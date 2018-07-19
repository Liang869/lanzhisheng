//包装函数
module.exports= function (grunt) {
    var concat= {};
    var jsFiles = [];

    var clean = 'dist';
    var revs=[];
    var filesPath = "";
    var target = grunt.option('target')||'**';
    if(grunt.option('target') && grunt.option('target').length>0){
        revs = ['dist/page/'+target+'/**/*.{css,js}'];
        filesPath = 'src/page/'+target+'/js/*.app';
        clean = 'dist/page/'+grunt.option('target');
    }else{
        revs = ['dist/page/**/*.{css,js}'];
        filesPath = 'src/page/**/js/*.app';
    }
    var files = grunt.file.expand(filesPath);
    files.forEach(function (file) {
      var filenamelist = file.split('/');
      var num = filenamelist.length;
      var folder = filenamelist[num - 3];
      var name = filenamelist[num - 1].replace(/\.app$/,'');
       //grunt.log.write(grunt.file.read(file));
       concat['src/page/'+folder+'/js/'+name+'.js'] = grunt.file.read(file).split(',');
       jsFiles.push({
            expand:true,
            cwd:'src/',
            src:'page/'+folder+'/js/'+name+'.js',
            dest:"dist/",
            extDot:"last",
            ext:".js"
       });
    });
    var copyFiles={
        //new
        // main: {
        //     expand: true,
        //     cwd:"src/",
        //     src: ['page/'+target+'/img/*','page/'+target+'/img/*/*'],
        //     dest: 'dist/'
        // },
        fontFile:{
            expand:true,
            cwd:"src/",
            src:'page/'+target+'/fonts/*',
            dest:"dist"
        },
        htmlFile:{
            expand:true,
            cwd:"src/",
            src:"page/"+target+"/*.html",
            dest:"dist/"
        },
        indexFile:{
            expand:true,
            cwd:"src/",
            src:"*.html",
            dest:"dist/"
        },
        indexjsFile:{
            expand:true,
            cwd:"src/",
            src:"*.js",
            dest:"dist/"
        },
        jsFile:{
            expand:true,
            cwd:"src/",
            src:'page/'+target+'/js/_*.js',
            dest:"dist/"
        },
        labFile:{
            expand:true,
            cwd:"src/lab/",
            src:"**",
            dest:"dist/lab/"
        }}
    //任务配置，所有插件的配置信息
    grunt.initConfig({
        //获取package.json的信息
        pkg:grunt.file.readJSON('package.json'),
        //uglify插件的配置信息
        uglify:{
            publicJs: {
                options: {
                    beautify: false
                },
                files:[
                
                    {
                        expand:true,
                        cwd:'src/',
                        src:'lab/js/*.js',
                        dest:"dist/",
                        extDot:"last",
                        ext:".js"
                    }
                    
                ]
            },
            release:{
                files:concat
            },
            htmlJs: {
                options: {
                    beautify: false
                },
                files:jsFiles
            }
        },
        //cssmin插件信息配置
        usemin: {
            html: ['dist/page/'+target+'/**/*.html']
        },
        cssmin:{
            options:{
                report:'gzip'
            },
            build:{
                files:[
                    {
                        expand:true,
                        cwd:"src",
                        src:['page/'+target+'/css/*.css'],
                        dest:"dist",
                        extDot:"last",
                        ext:".css"
                    },
                    {
                        expand:true,
                        cwd:"src/lab/css",
                        src:['*.css','**/*.css'],
                        dest:"dist/lab/css",
                        extDot:"last",
                        ext:".css"
                    }
                ]
            }
        },
        // 自动雪碧图
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: 'src/page/'+target+'/slice/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: 'src/page/'+target+'/img/',
                // 替换后的背景路径，默认为 file.dest 和 spritedest 的相对路径
                spritepath: null,
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: true,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: 'src/page/'+target+'/slice/slicecss/',
                    // 匹配规则
                    src: '*.css',
                    // 导出css和sprite的路径地址
                    dest: 'src/page/'+target+'/less/',
                    // 导出的css名
                    ext: '.less'
                }]
            }
        },
        //图片压缩
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src:['page/'+target+'/img/**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'dist' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                ]
            }
        },
        //watch插件配置信息
        watch:{
            build:{
                files:[
                    
                    'src/page/'+target+'/css/*.less',
                    'src/page/'+target+'/css/**/*.less'
                ],
                tasks:['less'],
                options:{
                    spawn:false
                }
            }
        },
        clean:{
            dist:[clean]
        },
        concat: concat,
        //less插件配置
        less: {
            main: {
                expand: true,
                cwd:"src/",
                src: [
                    'page/'+target+'/css/*.less',
                    'page/'+target+'/css/**/*.less'
                ],
                dest: 'src',
                ext: '.css'
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress:false
                }
            }
        },
        copy: copyFiles
        ,

        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 4
            },
            assets: {
                files: [{
                    src: revs
                }]
            },
         },
         cdn: {
             options: {
                 /** @required - root URL of your CDN (may contains sub-paths as shown below) */
                 cdn: '//cdn-h5.lanzhishenglc.com/dist/page/'+target+'/',
                 /** @optional  - if provided both absolute and relative paths will be converted */
                 flatten: true,
                 /** @optional  - if provided will be added to the default supporting types */
                 supportedTypes: { 'phtml': 'html' }
             },
             dist: {
                 /** @required  - gets sources here, may be same as dest  */
                 cwd: 'dist/page/'+target+'/',
                 /** @required  - puts results here with respect to relative paths  */
                 dest: 'dist/page/'+target+'/',
                 /** @required  - files to process */
                 src: ['index.html', 'css/*.css','{,*/}*.css', '{,*/}*.html', '{,**/}*.html']
             }
         }
        });
    //grunt加载clean插件
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-cachebuster');
    //grunt加载uplify插件
    grunt.loadNpmTasks("grunt-contrib-uglify");

    //grunt加载cssmin插件
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    //grunt加载less插件
    grunt.loadNpmTasks("grunt-contrib-less");

    //grunt加载copy插件
    grunt.loadNpmTasks("grunt-contrib-copy");
    //grunt加载watch插件
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-css-sprite');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-cdn');
    //告诉grunt当我们在终端输入grunt时需要做些什么（注意先后顺序）
    grunt.registerTask("default",["clean","sprite","uglify","less","cssmin","imagemin","copy","rev","usemin","cdn","watch"]);

    //grunt.registerTask('buster', ['cachebuster']);
}