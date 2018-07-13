sap.ui.define([
    'jquery.sap.global',
    'com/dla/webstat/controller/BaseController',
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/ui/model/json/JSONModel",
    "./Heatmap.settings",
    "./app-statistics.bar.settings",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/controls/Popover",
    "sap/ui/core/routing/History"
], function (jQuery,
    Controller,
    ODataModel,
    APP_CONSTANTS,
    JSONModel,
    HeatmapA,
    Bar, FlattenedDataset, FeedItem, Popover, History) {
    "use strict";
    var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
    return Controller.extend("com.dla.webstat.controller.statistics-viz.Master", {
        _chartTypes: {
            bar: Bar,
            Heatmap: HeatmapA,
            default: Bar
        },
        menuItems: null,
        selectedData: null,
       measures: {},
       dimensions: {},
       
        _onObjectMatched: function (oEvent) {
          //  debugger;
            var args = oEvent.mParameters.arguments;
            var sValue = jQuery.sap.getUriParameters();

            // // this checks and finds the correct viz settings
            var chartSettings = (this._chartTypes[args.chartType]) ?
                this._chartTypes[args.chartType] :
                this._chartTypes["default"];
            // var collection = (args.collection) ?
            //     "/" + args.collection :
            //     null;

            // var measuresToHide = (args["?query"]) ? args["?query"].hideMeasures.split(",") : null;
            // this._onParseSettings(
            //     APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL,
            //     chartSettings,
            //     collection,
            //     measuresToHide
            // )
            this._onParseSettings2(this.oVizFrame, chartSettings);
        },
        _setPopOverActionItems(actionItems){
            if(actionItems && actionItems.length > 0){
                var oActions = actionItems.map(function (value) {
                    return {
                        type: 'action',
                        text: value.text,
                        press: (function(masterPage, currentValue){
                            return function (oEvent){
                                if(currentValue.route){
                                    masterPage.getRouter().navTo(currentValue.route.url, {
                                        appName: masterPage.selectedData[0].Applications
                                    });  
                                }     
                            }
                        })(this, value)
                    };
                }, this);
                return oActions;
            }
            return null;
        },
        _covertSettingsToTree: function (headers, list) {
            var res = headers.map(function (value) {
                return {
                    object: value.name,
                    parentHash: value.value.replace("{", "").replace("}", ""),
                    node: null
                };
            });
            var hash = {};
            var settingsTree = list.reduce(function (agg, currVal, currIndex) {

                agg.map(function (value) {
                    if (!value.node) {
                        value.node = [];
                    }

                    if (!hash[currVal[value.parentHash]]) {
                        value.node.push({
                            object: currVal[value.parentHash]
                        });

                        hash[currVal[value.object]] = currVal[value.parentHash];
                    }

                    return value;
                });
                return agg;
            }, res);

            return settingsTree;
        },
        _onBatchRequestCompletedEvent: function(response){
          
           
            // debugger;
            // this.setProperty("/d/measures",[
            //     {name: "wdijijnijenijnijnefjnijnf"}
            // ], true);
            // this.setProperty("/d/dimensions",[
            //     {name: "wdijijnijenijnijnefjnijnf"}
            // ], true);
            // debugger;
        },
        _onParseSettings2: function(oVizFrame, settingsObject){
            if(!oVizFrame){
                return;
            }
            if(oVizFrame.getDataset()){
                oVizFrame.destroyDataset();
            }
            if(!oVizFrame.getFeeds().length){
                oVizFrame.destroyFeeds();
            }
            
            var oDataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, true);
            //this.getView().getModel().setProperty("/measures", [{text: "ffffffffffffff"}]);
            //this.setProperty("/measures", [{text: "fwefewfwfwefw"}]);
            oVizFrame.attachRenderComplete(
                {
                    that: this.oViewModel,
                    measures : sap.ui.getCore().byId("__component0---master--measures"),
                    settings: settingsObject
                }, 
                function(event,data){
                    var measures = data.settings.feedItems[0].values.map(function(value){
                        return {text: value};
                    });
                   // debugger;
                    //data.that.setProperty("/measures", measures);
              
                    //data.measures.setModel(new JSONModel(measures));
                 
            })
            var oDataset = new FlattenedDataset(settingsObject.dataset);
            settingsObject.feedItems.forEach(function (value) {
                var item = new FeedItem(value);
                oVizFrame.addFeed(item);
            });
            oVizFrame.setVizType(settingsObject.type);
            oVizFrame.setVizProperties(settingsObject.properties);
            oVizFrame.attachSelectData(this, function(oEvent, masterController){
                masterController.selectedData = oEvent.getParameter('data').map(function(value){
                    return value.data;
                });   
            });
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oDataModel);
            //this._setPopOverActionItems(settingsObject.actionItems);
            var actions = this._setPopOverActionItems(settingsObject.actionItems);
          
            var popOverObject = this.byId("idPopOver");
            popOverObject.setActionItems(actions);
            popOverObject.connect(this.oVizFrame.getVizUid()); 
        },
        _onParseSettings: function (oDataService, settingsObject, collection) {
            if(this.oVizFrame){
                this.oVizFrame.destroyDataset();
                this.oVizFrame.destroyFeeds();
                var oVizFrame = this.oVizFrame;

                var oDataModel = new ODataModel(oDataService, true);
                oDataModel.attachBatchRequestCompleted(this._onBatchRequestCompletedEvent.bind(this));
                var oDataset = new FlattenedDataset(settingsObject.dataset);

                settingsObject.feedItems.forEach(function (value) {
                    var item = new FeedItem(value);
                    oVizFrame.addFeed(item);
                });
                settingsObject.dataset.data.path = collection;
                this.oVizFrame.setVizType(settingsObject.type);
                this.oVizFrame.setVizProperties(settingsObject.properties);
                this.oVizFrame.attachSelectData(this.onVizItemClicked.bind(this));
                this.oVizFrame.setDataset(oDataset);
                this.oVizFrame.setModel(oDataModel);
            
                // this.setProperty("/d/measures",[
                //     {name: "wdijijnijenijnijnefjnijnf"}
                // ]);
              
               
                
                // settingsObject.dataset.data.path = collection;
                // var amModel = new ODataModel(oDataService, true);
                // amModel.attachBatchRequestCompleted(function (response, tre) {
                //     this.oAppList = sap.ui.getCore().byId("__component0---master--idoApplist");
                //     this.detailPage = sap.ui.getCore().byId("__component0---detail--detailPage");
                //     this.detailPage.setTitle(settingsObject.properties.title.text);
                //     var dims = settingsObject.dataset.dimensions;
                  
                //     var r = Object.values(response.getSource().oData);
                //     var r = this._covertSettingsToTree(dims, r);
                //     this.oAppList.setModel(new JSONModel(r));
                //     this.oAppList.expandToLevel(3);
                //     //this.oAppList.selectAll(true);
                // }.bind(this));
                // var oDataset = new FlattenedDataset(settingsObject.dataset);
                // this.oVizFrame.setDataset(oDataset);
                // this.oVizFrame.setModel(amModel);
                // settingsObject.feedItems.forEach(function (value) {
                //     var item = new FeedItem(value);
                //     oVizFrame.addFeed(item);
                // });
                // this.oVizFrame.setVizType(settingsObject.type);
                // this.oVizFrame.setVizProperties(settingsObject.properties);
                // this.settingsObject = settingsObject.actionItems;
                this.menuItems = settingsObject.actionItems;
                // var router = this.getRouter();
                // var that = this; 
                // // Add Action Item Functions

                var masterPage = this;
                var actionItems = settingsObject.actionItems.map(function (item) {
                    item.press = masterPage.onPopOverActionClicked.bind(masterPage);
                    return item;
                });

                // // Chart Popover 
                // var chartPopover = new Popover({});
                // chartPopover.setActionItems(actionItems);
                // chartPopover.connect(this.oVizFrame.getVizUid());  
                // var popOver = this.byId("idPopOver");
                // popOver.setActionItems(actionItems);
                // popOver.connect(this.oVizFrame.getVizUid()); 
              //  popOver.openBy(this.oVizFrame);
            }
        },
        onNavButtonPress: function (oEvent) {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash != undefined) {
                window.history.go(-1);
            }
            // else{
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("webcontent",{},true);
            // }

        },
        filterSelectedPopOverItem: function(oEvent){
            return this.menuItems.filter(function (value) {
                return value.text == oEvent.oSource.mProperties.text;
            })[0];
        },
        onVizItemClicked: function(oEvent){
            this.selectedData = oEvent.getParameter('data')[0].data;     
        },
        // onPopOverActionClicked: function(oEvent){
        //     var objectData = this.filterSelectedPopOverItem(oEvent);
        //     this.getRouter().navTo(objectData.route.url, {
        //         appName: this.selectedData.Applications
        //     });     
        // },
        onMeasureClicked: function(oEvent){
            ///debugger;
        },
        onDimensionClicked: function(oEvent){
           // debugger;
        },
        onTimePeriodClicked: function(oEvent){
          //  debugger;
        },
        onAfterRendering: function(oEvent){
            // var measureList = this.getView().byId("measureList");
            // measureList.setModel( new JSONModel(
            //     [
            //         {  name: "rthrhhhrthr" }
            //     ]
            // ));
        },
        onInit: function () {
            var selectedData = this.selectedData = {}
            this.getRouter().getRoute("master").attachMatched(this._onObjectMatched.bind(this), this);
            var oVizFrame = this.oVizFrame = this.getView().byId("idoVizFrame");
          
            var oViewModel =  new JSONModel({
                measures: [
                    {
                        text: "fjfjfjfjfjf"
                    }
                ],
                dimensions: []
            });
            //this.setModel(oViewModel);
        
            

            // measureList.setModel(measureJsonModel);
        }
    });
});