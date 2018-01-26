/**
 *
 * 加载远程文件初始化
 *
 */
'use strict';
// jStorage变为全局变量,反正$被占用
var jStorage = $.jStorage;

var _OKLoadApp = {

    env: 'production_env',

    loadPath: 'https://img.okay.do/funpin/extension/', //远程cdn文件地址:https://okay-pic.oss-cn-hangzhou.aliyuncs.com/funpin/extension/

    // 要加载的文件列表,文件有先后顺序,本地必须要有相应的文件备用
    files: [{ name: "app.css", type: 'css' }, { name: "vendors.js", type: 'javascript' }, { name: "app.js", type: 'javascript' }],

    elements: [],

    init: function init() {
        var _this = this;

        /**
         * 得到localstorage中存的版本号,确定脚本路径
         */
        var version = $.jStorage.get('version');

        /**
         * 服务器返回的加载路径
         */
        var load_path = $.jStorage.get('load_path');
        if (load_path) {
            this.loadPath = load_path;
        }

        // var path = '';
        // if (version && this.env.indexOf('debug') < 0) {
        //     path = this.loadPath + version + '/';
        // } else {
        //     path = this.loadPath = '';
        // }

        var path = this.loadPath = '';

        var loadLocal = false;
        var files = this.files;

        /**
         * 加载脚本/样式
         */
        if (!this.loadPath) {
            //加载本地
            this.loadFiles("", files, 0);

            return false;
        } else {

            //加载远程，先进行加载测试
            for (var i = 0; i < files.length; i++) {
                this.getMeta(path + files[i].name, files[i], function (files_i, type) {
                    //加载成功，对比mimetype
                    if (type.indexOf(files_i.type) > -1) {

                        _this.elements.push(files_i.name);

                        //测试加载完成，进行加载
                        if (_this.files.length == _this.elements.length) {
                            _this.loadFiles(path, files, 0);
                        }
                    } else {

                        if (!loadLocal) {
                            loadLocal = true;
                            delete _this.elements;
                            _this.loadFiles('', files, 0);
                        }
                    }
                });
            }
        }
    },

    getMeta: function getMeta(url, files_i, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('head', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var type = xhr.getResponseHeader("Content-Type");
                if (callback && callback.call) callback.call(null, files_i, type);
            }
        };

        xhr.send(null);
    },

    loadFiles: function loadFiles(path, files, order) {

        //脚本按顺序加载
        files.forEach(function (file) {

            if (file.type == 'javascript') {

                var script = document.createElement('script');
                script.src = path + file.name;
                script.async = false;
                document.head.appendChild(script);
            } else if (file.type == 'css') {
                var link = document.createElement('link');
                link.rel = "stylesheet";
                link.href = path + files[order].name;
                document.head.appendChild(link);
            }
        });
    },

    receivedAppInfo: function receivedAppInfo(info) {

        if (info && info.apps) {

            var extension = info.apps.extension;

            if (extension) {
                var funpin = extension.funpin;

                if (funpin && funpin.version) {

                    //核对安装应用版本号与服务器的版本号,如果不一致则清空本地数据结构
                    var version = $.jStorage.get('version');

                    //非开发环境发送安装统计
                    if (!!!version && this.env.indexOf('debug') < 0) {
                        //第一次安装
                        new Image().src = 'https://api.okay.do/v2/analytics/log?ua=chrome&b=install&v=' + funpin.version + '&t=image&ww=' + window.screen.width + '&wh=' + window.screen.height;
                    }

                    if (version != funpin.version) {
                        $.jStorage.flush();
                    }

                    //更新到本地版本
                    $.jStorage.set('version', funpin.version);
                }
            }
        }
    }

};

_OKLoadApp.init();