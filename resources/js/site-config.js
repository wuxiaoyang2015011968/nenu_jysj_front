(function(){

    var site ={
        //这是前端本地需要配置的，用来看自己写的页面
        website:'http://jysj.dev.net/', //站点地址
        staticWebsite: 'http://static.jysj.net/nenu_jysj_front/', // 前端服务器地址，用来自己测试数据
        // puiWebsite: 'http://pui.dev.net/1.1/'//组件地址
        puiWebsite: '/nenu_jysj_front/resources/js/pui/trunk/1.1/'
    }
    _pw_env = {
        status: 0, //0-前端调试，1-后端调试, 2-后端部署
        website: site.website,
        staticWebsite: site.staticWebsite,
        puiWebsite: site.puiWebsite,
        tag: '',
        pkgs:[
            {
                name: 'io',
                path: site.staticWebsite + 'resources/js/'
            },
            {
                name: 'widget',
                path: site.staticWebsite + 'resources/js/'

            },
            {
                name: 'module',
                path: site.staticWebsite + 'resources/js/'
            },
            {
                name: 'page',
                path: site.staticWebsite + 'resources/js/'
            }
        ],
        preload: ['sizzle'],//预加载模块
        //加载组件，任何组件加载都会自动加载core组件。
        //对pui各个组件的一个
        modSettings:{
            notifier: {
                top: 100
            },
            dialog:{
                // opacity: 0.1,
                position: 'fixed',
                theme: 'white',
                title: '提示信息',
                themeUrl: site.staticWebsite + 'resources/css/widget/core.css'
            },
            defender:{
                themeUrl: site.staticWebsite + 'resources/css/widget/core.css'
            },
            scroll:{
                cursorborderradius: 0,
                cursorcolor: '#3d3d3d'
            },
            tooltip:{
                position: {
                    my: 'tc',
                    at: 'bc' //options: tl,tc,tr, rt,rc,rb, bl,bc,br,lt,lc,lb
                },
                styles:{
                    uri: site.staticWebsite + 'resources/css/widget/core.css'
                }
            }
        },
        //统一错误信息入口
        msg:{
            0: '网络加载错误'
        },
        //地址信息
        url: {
            admin_page:{
               //业务受理
               business_handling:{
                    protocolDetail:{
                        protocolDetailProtocol: site.staticWebsite + 'mock/protocolDetailProtocol.json',
                        protocolDetailCheck: site.staticWebsite + 'mock/protocolDetailCheck.json'
                    },
                   changeDetail:{
                        changeDetailProtocol: site.staticWebsite + 'mock/changeDetailProtocol.json',
                        changeDetailCheck: site.staticWebsite + 'mock/changeDetailCheck.json'
                    },
                    //协议列表 lixingyu
                    protocolList :{
                        showProList :site.staticWebsite + 'mock/protocolList.json',
                        nowInfo: site.staticWebsite + 'mock/nowInfo.json'
                    },

                    //协议变更列表 lixingyu
                    changeList:{
                        showChangeList :site.staticWebsite + 'mock/changeList.json',
                        nowInfo: site.staticWebsite + 'mock/nowInfo.json'
                    },
                },

               //学生管理
               students_management :{
                    //派遣
                    dispatch :{
                        //详情页 liaoyueyun
                        detail :{
                            DetailCheck: site.staticWebsite + 'mock/DetailCheck.json'
                        },
                        //学生列表页 lixingyu
                        studentList :{
                            showStu: site.staticWebsite + 'mock/stuInfo.json',
                            nowInfo: site.staticWebsite + 'mock/nowInfo.json',
                            stateInfo: site.staticWebsite + 'mock/stateInfo.json',
                            delInfo: site.staticWebsite + 'mock/nowInfo.json'
                        },
                    },
                    //学籍
                    school_roll :{
                        //详情页 liaoyueyun
                        detail :{
                            DetailCheck: site.staticWebsite + 'mock/DetailCheck.json'
                        },
                        //学生列表页 lixingyu
                        studentList :{
                            showStu: site.staticWebsite + 'mock/sturollInfo.json',
                            nowInfo: site.staticWebsite + 'mock/nowInfo.json'
                        },
                    },

                    //少数民族
                    minority :{
                        //学生列表页 lixingyu
                        schoolList :{
                            showStu: site.staticWebsite + 'mock/sturollInfo.json',
                            nowInfo: site.staticWebsite + 'mock/nowInfo.json'
                        },
                        dispatchList :{
                            showStu: site.staticWebsite + 'mock/sturollInfo.json',
                            nowInfo: site.staticWebsite + 'mock/nowInfo.json'
                        },
                    },
                },

               //系统管理
               system_management:{
                //未导入
                    notImport:{
                        showImport:site.staticWebsite + 'mock/notImportList.json'
                    },
               }

            },
            // 学生页面
            student_page:{
                // 账号登录
                login:{
                    stuLogin:{
                        isModify:site.staticWebsite+'mock/isModifySuc.json'
                    }
                }

            },
            module:{
                // 专业级联 qiyuan
                linkage:{
                    majorClass: site.staticWebsite + 'mock/majorClass.json',
                    majorMinorClass: site.staticWebsite + 'mock/majorMinorClass.json',
                    majorName: site.staticWebsite + 'mock/majorName.json'
                },
                //省市县
                getArea:{
                    getArea: site.staticWebsite + 'mock/getArea.json'

                },
                parameterHidden:{
                    parameterHidden: site.staticWebsite + 'mock/parameterHidden.json'
                },
                majorName:{
                    majorName: site.staticWebsite + 'mock/majorName.json'
                }

            }
        },
    }
})()