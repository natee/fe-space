## grunt学习，常用的grunt任务 ##
默认你已经会安装grunt和grunt plugins，并且知道配置文件是怎么回事。
### grunt-connect-proxy（代理转发） ###
```js
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); //加载所有的任务

    // 配置Grunt各种模块的参数
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
            mc: {
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

    // admin转发
    grunt.registerTask('localserver',['configureProxies','connect:mc']);

    // 默认启动mc，合并
    grunt.registerTask('default', '默认的任务', function() {
        grunt.task.run(localserver') 
      //  grunt.task.run('concatdev','localserver')  // 如果有多任务，那么启动代理转发的任务必须在最后，因为启动connect后会一直处于waiting状态
    });

};
```

