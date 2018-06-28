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
        _onObjectMatched: function (oEvent) {
            var args = oEvent.mParameters.arguments;
            var sValue = jQuery.sap.getUriParameters();

            // this checks and finds the correct viz settings
            var chartSettings = (this._chartTypes[args.chartType]) ?
                this._chartTypes[args.chartType] :
                this._chartTypes["default"];
            var collection = (args.collection) ?
                "/" + args.collection :
                null;

            var measuresToHide = (args["?query"]) ? args["?query"].hideMeasures.split(",") : null;

            this._onParseSettings(
                APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL,
                chartSettings,
                collection,
                measuresToHide
            );

            // oEvent.mParameters.arguments.chartType
            // oEvent.mParameters.arguments.collection
            // oEvent.mParameters.arguments.aggregation
            // if(!oEvent.mParameters.arguments.chartType){
            //     this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, Bar);
            // }else{
            //     this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, HeatmapA);
            // }

                // onSelectedData: function(oEvent){
                //     this.mLastSelectedData = oEvent.getParameter('data');
                // },
        },
        measures: {},
        // onSelectionChange: function(oEvent){


        //     var measures = [];
        //     var query = {};
        //     if(oEvent.getParameters().listItem.isSelected()){
        //         console.log("selected")
        //         //measures.push(oEvent.getParameters().listItem.getTitle());
        //     }

        // },
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
        _onParseSettings: function (oDataService, settingsObject, collection) {
            if(this.oVizFrame){
                this.setModel(new JSONModel(settingsObject));
                var oVizFrame = this.oVizFrame;
                this.oVizFrame.attachSelectData(this.onVizItemClicked.bind(this));
                this.oVizFrame.destroyDataset();
                this.oVizFrame.destroyFeeds();
                settingsObject.dataset.data.path = collection;
                var amModel = new ODataModel(oDataService, true);
                amModel.attachBatchRequestCompleted(function (response, tre) {
                    this.oAppList = sap.ui.getCore().byId("__component0---master--idoApplist");
                    this.detailPage = sap.ui.getCore().byId("__component0---detail--detailPage");
                    this.detailPage.setTitle(settingsObject.properties.title.text);
                    var dims = settingsObject.dataset.dimensions;
                    var r = Object.values(response.getSource().oData);
                    var r = this._covertSettingsToTree(dims, r);
                    this.oAppList.setModel(new JSONModel(r));
                    this.oAppList.expandToLevel(3);
                    //this.oAppList.selectAll(true);
                }.bind(this));
                var oDataset = new FlattenedDataset(settingsObject.dataset);
                this.oVizFrame.setDataset(oDataset);
                this.oVizFrame.setModel(amModel);
                settingsObject.feedItems.forEach(function (value) {
                    // if(value.type == "Measure"){
                    //     if(hideMeasures){
                    //         if(value.values[0] == hideMeasures[0]){
                    //             return;
                    //         }
                    //     }
                    // }
                    var item = new FeedItem(value);
                    oVizFrame.addFeed(item);
                });
                this.oVizFrame.setVizType(settingsObject.type);
                this.oVizFrame.setVizProperties(settingsObject.properties);
                this.settingsObject = settingsObject.actionItems;
                this.menuItems = settingsObject.actionItems;
                var router = this.getRouter();
                var that = this; 
                // Add Action Item Functions
                var masterPage = this;
                var actionItems = settingsObject.actionItems.map(function (item) {
                    item.press = masterPage.onPopOverActionClicked.bind(masterPage);
                    return item;
                });

                // Chart Popover 
                var chartPopover = new Popover({});
                chartPopover.setActionItems(actionItems);
                chartPopover.connect(this.oVizFrame.getVizUid());
            }
        },
        filterSelectedPopOverItem: function(oEvent){
            return this.menuItems.filter(function (value) {
                return value.text == oEvent.oSource.mProperties.text;
            })[0];
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
        onVizItemClicked: function(oEvent){
            this.selectedData = oEvent.getParameter('data')[0].data;     
        },
        onPopOverActionClicked: function(oEvent){
            var objectData = this.filterSelectedPopOverItem(oEvent);
            this.getRouter().navTo(objectData.route.url, {
                appName: this.selectedData.Applications
            });     
        },
        onInit: function () {
            var selectedData = this.selectedData = {}
            this.getRouter().getRoute("master").attachMatched(this._onObjectMatched, this);
            var oVizFrame = this.oVizFrame = this.getView().byId("idoVizFrame");
        }
    });
});