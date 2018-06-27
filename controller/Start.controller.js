sap.ui.define([
    'com/dla/webstat/controller/BaseController',
    "sap/ui/model/json/JSONModel",
    "com/dla/webstat/constants",
    "sap/ui/core/routing/History"
], function(Controller, JSONModel, APP_CONSTANTS, History){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.Start",{
        _onObjectMatched: function(oEvent) {
         
            if(oEvent.mParameters["?query"]){
                this.mParams = oEvent.mParameters["?query"];
            }
            if(!oEvent.mParameters.appName){
                
            }
            var appModelFilter =  new sap.ui.model.Filter({
                path: "object",
                operator: sap.ui.model.FilterOperator.Contains,
                value1:  oEvent.mParameters.arguments.appName,
            });
        
            var oModel = new JSONModel({
                trendData: {
                    title: "Trends for " +  oEvent.mParameters.arguments.appName,
                    items: []
                },
                vizFrameSettings : [{
                    type: "column",
                    dataset: {
                        dimensions: [{
                            name: 'Applications',
                            value: "{object}"
                        }],
                        measures: [{
                            name: 'Visits',
                            value: '{visits}'
                        }, {
                            name: 'Users',
                            value: '{users}'
                        }],
                        data: {
                            service_url: APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL,
                            path: "/appstatistics", //is the collection name
                            filters: [appModelFilter],
                            onUpdateCompleteCallback: this.updateTrendData.bind(this)
                        }
                    },
                    feedItems: [{
                            uid: "valueAxis",
                            type: "Measure",
                            values: ["Visits", "Users"]
                        },
                        {
                            uid: "categoryAxis",
                            type: "Dimension",
                            values: ["Applications"]
                        }
                    ],
                    properties: {
                        plotArea: {
                            dataLabel: {
    
                                visible: true
                            }
                        },
                        valueAxis: {
                            label: {},
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Total Views and Users'
                        }
                    }
                },{
                    type: "heatmap",
                    dataset: {
                        dimensions: [{
                            name: 'Day',
                            value: "{Day}"
                          },{
                            name: 'Time',
                            value: "{Time}"
                          }],
                          measures: [{
                              name: 'Hits',
                              value: '{Hits}'
                            },
                          ],
                          data: {
                            service_url: APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL,
                            path: "/heatmapdaily" // is the collection name
                          }
                    },
                    feedItems: [{
                            uid: "color",
                            type: "Measure",
                            values: ["Hits"]
                        },
                        {
                            uid: "categoryAxis",
                            type: "Dimension",
                            values: ["Time"]
                        },
                        {
                            uid: "categoryAxis2",
                            type: "Dimension",
                            values: ["Day"]
                        }
                    ],
                    properties: {
                        plotArea: {
                            dataLabel: {
                                visible: false
                            }
                        },
                        legend: {
                            title: {
                                visible: false
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Profit and Cost and Revenue by Item Category'
                        }
                    },
                    actionItems:[],
                    aggregations:[]
                },{
                    type: "line",
                    dataset: {
                        dimensions: [{
                            name: 'Time',
                            value: "{Time}"
                        }],
                        measures: [{
                            name: 'Hits',
                            value: '{Hits}'
                        }, {
                            name: 'LastWeeksHits',
                            value: '{LastWeeksHits}'
                        }],
                        data: {
                            service_url: APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL,
                            path: "/linechart" //is the collection name
                        }
                    },
                    feedItems: [{
                            uid: "valueAxis",
                            type: "Measure",
                            values: ["Hits"]
                        },
                        {
                            uid: "categoryAxis",
                            type: "Dimension",
                            values: ["Time"]
                        }
                    ],
                    properties: {
                        plotArea: {
                            dataLabel: {
    
                                visible: true
                            }
                        },
                        valueAxis: {
                            label: {},
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            }
                        },
                        title: {
                            visible: false,
                            text: 'Revenue by City and Store Name'
                        }
                    }
                }]
            },true);
            this.getView().setModel(oModel);
            oModel.oData.trendData.items = [
                {
                    name: "Hits",
                    value: 325
                },
                {
                    name: "Users",
                    value: 254
                },
                {
                    name: "Most Active Day",
                    value: "Thursday"
                },
                {
                    name: "Most Active Users",
                    value: ["Ellenod", "Kramer", "Marcus"]
                },
                {
                    name: "Most Active Month",
                    value: ["January"]
                }
            ]
        },
        updateTrendData: function(response){
     
        },
        onAfterRendering: function(){
         
        },
        onNavButtonPress: function(oEvent){
            debugger;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if(sPreviousHash != undefined){
                window.history.go(-1);
            }
        },
        onInit: function(){
            this.getRouter().getRoute("appdashboard").attachMatched(this._onObjectMatched, this);
        }
    });
});


