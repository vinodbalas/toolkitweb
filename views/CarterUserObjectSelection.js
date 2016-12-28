/**
 * Created by prakash on 12/25/16.
 */
define([
    "app"
],function(app){



    webix.ui({
        view:"popup", id:"lang",
        head:false, width: 300,
        body:{
            view:"list", scroll:false,
            yCount:4, select:true,
            borderless:true,
            template:"#lang#",
            data:[
                {id:1, lang:"Source Logout"},
                {id:2, lang:"Target Logout"}
            ],
            on:{"onAfterSelect":function(id){

                if(id===1){
                    webix.storage.local.remove('source_status');
                    window.location.reload();
                }
                $$("lang").hide();
            }}
        }
    });


    var selectedData=[
        { "id":"1", "value":"The Shawshank Redemption", "open":true, "data":[
            { "id":"1.2", "value":"Part 2", "chapter":"beta", "open":true, "data":[
                { "id":"1.2.1", "value":"Part 1", "chapter":"beta-twin"},
                { "id":"1.2.2", "value":"Part 1", "chapter":"beta-twin"}
            ]},
            { "id":"1.22", "value":"Part 2", "chapter":"beta", "open":true, "data":[
                { "id":"1.22.1", "value":"Part 1", "chapter":"beta-twin"},
                { "id":"1.22.2", "value":"Part 1", "chapter":"beta-twin"}
            ]}
        ]}
    ]


    var layout = {
        type:"clean",
        rows:[
            {view:"toolbar",
                height: 50,
                elements:[
                    {},
                    /*{view:"icon",width: 40, icon:"info-circle"},
                    {view:"icon", width: 40,icon:"comments"},
                    {view:"icon",width: 40, icon:"cog" },*/
                    {view:"icon",width: 40, icon:"user", popup: "lang" }

                ]},
                { height:100, borderless:true, type:"clean",cols:[
                    { template:'<span class="numberCircle">1</span> Create Source and Target',css:'work-flow-cell-step1'}, //here you place any component you like
                    { template:'<span class="numberCircle">2</span> Preview' ,css:'work-flow-cell-step2'},
                    { template:'<span class="numberCircle">3</span> Validate and Deploy' ,css:'work-flow-cell-step3'}
                ]},
                { height:50,type:"clean",type:"wide",cols:[
                    {
                        view:"combo",
                        type:"material",
                        placeholder:"Last Modified By",
                        options:[
                            {id:1, value:"One"},
                            {id:2, value:"Two"},
                            {id:3, value:"Three"}
                        ]
                    },
                    {
                        view: "datepicker",
                        type:"material",
                        placeholder: "Date Modified From: dd/mm/yyy hh:mm",
                        timepicker: true
                    },
                    {
                        view: "datepicker",
                        type:"material",
                        placeholder: "To:  dd/mm/yyy hh:mm",
                        timepicker: true
                    },
                    {}


                ]},
                {
                    type:'plain',
                    rows:[
                    {
                        type:'plain',
                        cols:[
                            {
                                type:'plain',
                                rows:[
                                {template:'Source',height:50},

                                {
                                    view:"pager", id:"pagerA",
                                    animate:true,
                                    size:2,
                                    template:function(data, common){
                                        //debugger;
                                        var start = data.page * data.size;
                                        var end = start + data.size;
                                        var html = " <div style='width:405px; text-align:center; line-height:20px; font-size:10pt; float:left'> "+(start+1)+" - "+end+" of "+(data.count)+"</div> ";
                                        return common.prev()+html+common.next();
                                    }
                                    //group:5
                                },
                                { view:"search", placeholder:"Search here" ,id:"sourceObjectSearch"},
                                {
                                    view:"datatable",
                                    type:"material",
                                    id:'sourceGrid',
                                    scroll:'native-y',
                                    select: "row",
                                    gravity:5,
                                    multiselect: true,
                                    header:false,
                                    pager:"pagerA",
                                    columns:[
                                        { id:"ch1", width:30,header:'', template:"{common.checkbox()}"},
                                        { id:"title",   header:"",fillspace:true}
                                    ],
                                    data: [
                                        { id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rank:1},
                                        { id:2, title:"The Godfather", year:1972, votes:511495, rank:2},
                                        { id:3, title:"The Shawshank Redemption", year:1994, votes:678790, rank:1},
                                        { id:4, title:"The Godfather", year:1972, votes:511495, rank:2}
                                    ]
                                }

                            ]},
                            {view:"resizer"},
                            {
                                type:'plain',
                                rows:[
                                    {template:'Target',height:50},

                                    {cols:[
                                        { view:"button", value:"prev",
                                            click:function(){ $$('pager1').select("prev"); } },
                                        {},
                                        { view:"button", value:"next",
                                            click:function(){ $$('pager1').select("next"); } }
                                    ]},
                                    { view:"search", placeholder:"Search here" ,id:"targetObjectSearch"},
                                    {
                                        view:"grouplist",
                                        type:'material',
                                        scroll:'native-y',
                                        //pager:"pagerB",
                                        columns:[
                                            { id:"ch1", header:"", template:"{common.checkbox()}"},
                                            { id:"value",	header:"Title",
                                                template:"{common.treetable()} #value#", fillspace:true }
                                        ],
                                        data:selectedData,

                                    }

                                ]}
                        ]
                    }
                ]

                },
                {height:50,
                    align:"center,middle",
                    cols:[
                        {},
                        {template:'Preview'},
                        {template:'Validate'},
                        {template:'Deploy'}
                        ,{}
                    ]
                }
        ]
    };

    return {
        $ui:layout,
        type:"material",
        $oninit:function(view, $scope){ /*after creating*/
           // alert('1');
            }
    };

});
