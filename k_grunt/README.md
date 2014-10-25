#grunt学习，常用的grunt任务

##目录

  1. [开始grunt](#开始grunt)
  	1. [安装CLI](#安装cli)
  	1. [准备一个新的Grunt项目](#准备一个新的grunt项目)
  	1. [package.json](#packagejson)
  	1. [安装Grunt和grunt插件](#安装grunt和grunt插件)
  	1. [Gruntfile](#gruntfile)
  1. [grunt插件](#grunt插件)
    1. [grunt-contrib-concat](#grunt-contrib-concat)
    1. [grunt-contrib-watch](#grunt-contrib-watch)
    1. [grunt-contrib-uglify](#grunt-contrib-uglify)
    1. [grunt-connect-proxy](#grunt-connect-proxy)


##开始grunt
Grunt和Grunt的插件都是通过Node.js的包管理器npm来安装和管理的。

Grunt 0.4.x要求Node.js的版本>=0.8.0(也就是0.8.0及以上版本的Node.js才能很好的运行Grunt)。
###安装CLI
为了方便使用Grunt，你应该在全局范围内安装Grunt的命令行接口(CLI)。要做到这一点，你可能需要使用sudo(OS X，*nix，BSD等平台中)权限或者作为超级管理员(Windows平台)来运行shell命令。

```
npm install -g grunt-cli
```
###准备一个新的Grunt项目
一个典型的配置过程通常只涉及到两个文件：`package.json`和`Gruntfile`。

**package.json**：这个文件被用来存储已经作为npm模块发布的项目元数据(也就是依赖模块)。你将在这个文件中列出你的项目所[依赖](https://www.npmjs.org/doc/files/package.json.html#devDependencies)的Grunt(通常我们在这里配置Grunt版本)和Grunt插件(相应版本的插件)。

**Gruntfile**：通常这个文件被命名为Gruntfile.js或者Gruntfile.coffee，它用于配置或者定义Grunt任务和加载Grunt插件。

###package.json
`package.json`与`Gruntfile`相邻，它们都应该归属于项目的根目录中，并且应该与项目的源代码一起被提交。在上述目录(`package.json`所在目录)中运行`npm install`将依据`package.json`文件中所列出的每个依赖来自动安装适当版本的依赖。

创建`package.json`的方式：

  - 大多数的[grunt-init](http://gruntjs.com/project-scaffolding)模板都会自动创建一个项目特定的`package.json`文件。
  - [npm init](https://www.npmjs.org/doc/cli/npm-init.html)命令会自动创建一个基本的`package.json`文件。
  - 从下面的例子开始并根据[规范](https://www.npmjs.org/doc/files/package.json.html)来按需扩展。
  
```
{
    "name": "my-project-name", // 项目名称
    "version": "0.1.0", // 项目版本
    "devDependencies": { // 项目依赖
        "grunt": "~0.4.1", // Grunt库
        "grunt-contrib-jshint": "~0.6.0", //以下三个是Grunt内置任务
        "grunt-contrib-nodeunit": "~0.2.0",
        "grunt-contrib-uglify": "~0.2.2"
    }
}
```

###安装Grunt和grunt插件
`npm install <module> --save-dev`

上述命令也可以用于Grunt插件和其他的node模块的安装。当完成操作后请确保更新后的`package.json`文件也要与你的项目一起提交。

###Gruntfile
`Gruntfile.js`或者`Gruntfile.coffee`文件都是归属于你项目根目录中的一个有效的JavaScript或者CoffeeScript文件(和`package.json`文件一样都在根目录中)，并且它(Gruntfile)也应该与你的项目源文件一起提交。

一个Gruntfile由下面几部分组成：

 - "wrapper"函数(包装函数)
 
 ```
 module.exports = function(grunt) {
 	require('load-grunt-tasks')(grunt); //加载所有的任务
    // 配置Grunt各种模块的参数
    grunt.initConfig({
    	// 下文所有内容均为此处补充
    });
 }
 ```
 
 - 项目和任务配置
 - 加载的Grunt插件和任务
 - 自定义任务
 
**[返回顶部](#目录)**

##grunt插件

### grunt-contrib-concat

作用：合并文件。

`npm install grunt-contrib-concat --save-dev`

```
grunt.initConfig({
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.js',
    },
  },
});
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.registerTask('concat',['concat']);
```

**[返回顶部](#目录)**

### grunt-contrib-watch

作用：监视文件是否发生改变。

`npm install grunt-contrib-watch --save-dev`

```
grunt.initConfig({
  watch: {
    scripts: {
      files: '**/*.js',
      tasks: ['youtaskname'],
      options: {
        debounceDelay: 250,
      },
    },
  },
});
grunt.loadNpmTasks('grunt-contrib-watch');
```

**[返回顶部](#目录)**

### grunt-contrib-uglify

作用：压缩文件。

`npm install grunt-contrib-uglify --save-dev`

```
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'dest/output.min.js': ['src/input1.js', 'src/input2.js']
      }
    }
  }
});
```

**[返回顶部](#目录)**

### grunt-connect-proxy

作用：代理转发。前端http请求需要后端服务支持，当前端没有后端服务环境时，可以搭建一个本地server，通过proxy配置请求地址，就可以做到本地开发。

`npm install grunt-contrib-connect --save-dev`
`npm install grunt-contrib-proxy --save-dev`

```   
grunt.initConfig({
    dirs: {
        global_dir1: 'folder/dir1',
        global_dir2: 'folder/dir2'
    },
    connect: {
        options: {
            //  hostname:'192.168.2.100', // 本机IP，可以通过这个IP跨机访问
            //  hostname:'0.0.0.0',  // Windows失败,Mac正常且可跨机访问
            hostname:'127.0.0.1', // 均正常，但无法实现跨机访问
            keepalive:true,
            open:true
        },
        proxies: [
            {
                context: '/api',
                host: 'xxx.xxx.xxx.xxx', // API服务端地址
                port: 9987,
                changeOrigin: true
            }
        ],
        name1: { // 调用connect:name执行相应任务 
            options: {
                port:9000,
                middleware: function (connect) {
                   return [
                        require('grunt-connect-proxy/lib/utils').proxyRequest,
                        connect.static('home/login') // nginx配置的默认跳转路径
                    ];
                }
            }
        }
    }
});
// 从node_modules目录加载模块文件
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-connect-proxy');
// mc转发
grunt.registerTask('localserver1',['configureProxies','connect:name1']);
// 默认启动mc，合并
grunt.registerTask('default', '默认的任务', function() {
    grunt.task.run(localserver1') 
//  grunt.task.run('concatdev','localserver1')  // 如果有多任务，那么启动代理转发的任务必须在最后，因为启动connect后会一直处于waiting状态
});
```

**[返回顶部](#目录)**


