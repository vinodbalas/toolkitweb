/**
 * Created by prakash on 12/25/16.
 */
define([
    "app",
    "views/CarterSourceMetaDataComponentsList",
    "views/CarterUserSelectedMetaDataComponents"
],function(app,CarterSourceMetaDataComponentsList,CarterUserSelectedMetaDataComponents){



    webix.ui({
        view:"popup",
        id:"userLoginMenu",
        css:'carter-user-login-menu-list-popup',
        head:false,
        width: 300,
        body:{
            view:"list",
            css:'carter-user-login-menu-list',
            scroll:false,
            yCount:4,
            select:true,
            borderless:true,
            template:"#menuItemText#",
            data:[
                {id:1, menuItemText:"Source Logout",css:'carter-user-login-menu-item-source'},
                {id:2, menuItemText:"Target Logout",css:'carter-user-login-menu-list-target'}
            ],
            on:{
                "onAfterSelect":function(id){
                        if(id==="1"){
                            /*
                            webix.storage.local.remove('source_status');
                            window.location.reload();
                            */
                            //trigger source logout event.
                            //clear index db
                        }
                        else if(id==="2"){
                            //webix.storage.local.remove('target_status');
                            //trigger target logout event.
                           // window.location.reload();
                            //clear index db
                        }
                        $$("userLoginMenu").hide();
                }
            }
        }
    });





    var layout = {
        type:"line",
        rows:[
            {view:"toolbar",
                type:'material',
                height: 46,
                elements:[
                    {},  {view:"icon",width: 40, icon:"user", popup: "userLoginMenu" }

                ]},
                { height:60, borderless:true, type:"clean",cols:[
                    { template:'<span class="numberCircle">1</span> Shortlist Metadata Components form Source Org',css:'work-flow-cell-step1'}, //here you place any component you like
                    {template:'>',width:50},
                    { template:'<span class="numberCircle">2</span> Preview ' ,css:'work-flow-cell-step2'},
                    {template:'>',width:50},
                    { template:'<span class="numberCircle">3</span> Login to Target' ,css:'work-flow-cell-step3'},
                    {template:'>',width:50},
                    { template:'<span class="numberCircle">4</span> Validate and Deploy' ,css:'work-flow-cell-step4'}
                ]},
            {
                view:"multiview" ,
                fitBiggest:true,
                keepViews:true,
                cells:[
                    {
                        type:'line' ,
                        id:'objectSelectionView',
                        rows:[
                            {
                                type:'line' ,
                                cols:[
                                    CarterSourceMetaDataComponentsList,
                                    { view:"resizer" } ,
                                    CarterUserSelectedMetaDataComponents

                                ]
                            }
                        ]
                    },
                    {
                        type:'line',
                        id:'objectSelectionPreView',
                        rows:[
                            {
                                template :'Preview Tab'
                            }
                        ]
                    }
                ]
            }
                //,
                /*{height:50,
                    align:"center,middle",
                    cols:[
                        {},
                        {template:'Preview'},
                        {template:'Validate'},
                        {template:'Deploy'}
                        ,{}
                    ]
                }*/
        ]
    };

    return {
        $ui:layout,
        type:"material",
        $oninit:function(view, $scope){
        }
    };

});
