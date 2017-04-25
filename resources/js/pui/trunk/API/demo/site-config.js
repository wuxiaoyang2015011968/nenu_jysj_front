(function(){

    var site ={
         // website:'http://www.weeklyreport.net/', //站点地址
         // staticWebsite: 'http://static.dsjyw.dev.net/dsjylm/', // 前端服务器地址
         // puiWebsite: 'http://pui.dev.net/1.1/'

        // 这是前端本地需要配置的，用来看自己写的页面
        website:'http://dsjylm:88/', //站点地址
        staticWebsite: 'http://static.dsjylm.dev.net/dsjylm/', // 前端服务器地址
        puiWebsite: 'http://pui.dev.net/1.1/'
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
                path: site.staticWebsite + 'resources/js'

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
        },
        //地址信息
        url:{
            /*公司*/
            company:{
                company:{
                    //获取右侧单位列表发出的url
                    getJoblist:site.staticWebsite+'mock/companyinfo1.json' ,
                    // 获取最新的关注数发出的url
                    getFollowNumber:site.staticWebsite+'mock/followNumber.json',
                    //生成弹出层地点li发出的url
                    createLocationLi:site.staticWebsite+'mock/locationLi.json',
                    //生成弹出层行业li发出的url
                    createIndustryLi:site.staticWebsite+'mock/industryLi.json'
                }
            },
            /*工作*/
            recruitment:{
                education:{
                    //获取右侧单位列表发出的url
                    getJoblist:site.staticWebsite+'test/api-data/001.json' ,
                    //生成弹出层职位类型li发出的url
                    createPositionTypeLi:site.staticWebsite+'mock/positionType.json',
                    //生成弹出层专业li发出的url
                    createMajorLi:site.staticWebsite+'mock/majorLi.json',
                    //生成弹出层单位性质li发出的url
                    createPropertyLi:site.staticWebsite+'mock/propertyLi.json',
                    //生成弹出层地点li发出的url
                    createLocationLi:site.staticWebsite+'mock/locationLi.json',
                    //当职位被收藏或取消收藏时发出的url
                    isCollect:site.staticWebsite+'mock/isCollect.json'
                }
            },   
            job_apply:{
                jobsubscription:{
                     createSelect:site.staticWebsite+'test/api-data/prov-and-city.json',
                     createLi:site.staticWebsite+'test/api-data/001.json'
                }
            },
            preach:{
                preach:{
                    //生成弹出层行业li发出的url
                    createIndustryLi:site.staticWebsite+'mock/industryLi.json',
                    enroll:site.staticWebsite+'mock/enroll.json',
                    getPreachList:site.staticWebsite+'mock/preach.json'
                }
            }
        }
    }
})() 