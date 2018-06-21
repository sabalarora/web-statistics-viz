sap.ui.define([
    'jquery.sap.global',
    'com/dla/webstat/controller/BaseController',
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/ui/model/json/JSONModel",
    'sap/viz/ui5/api/env/Format',
    "sap/viz/ui5/format/ChartFormatter",
    "./Heatmap.settings",
    "./Bar.settings",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/controls/Popover"
], function(jQuery, Controller,ODataModel,APP_CONSTANTS,JSONModel,Format,ChartFormatter, HeatmapA, Bar, FlattenedDataset, FeedItem, Popover) {
    "use strict";
    var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
    return Controller.extend("com.dla.webstat.controller.statistics-viz.Master",{
        _chartTypes: {
            bar: Bar,
            Heatmap: HeatmapA,
            default: Bar
        },
        _onObjectMatched: function(oEvent) {
         
            var args = oEvent.mParameters.arguments;
            var sValue = jQuery.sap.getUriParameters();
         
            // this checks and finds the correct viz settings
            var chartSettings = (this._chartTypes[args.chartType])
                                    ? this._chartTypes[args.chartType]
                                    : this._chartTypes["default"];
            var collection = (args.collection)
                ? "/" + args.collection 
                : null;

            var measuresToHide = (args["?query"])? args["?query"].hideMeasures.split(","):null;
        
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
        },
        onSelectionChange: function(oEvent){
           
            var measures = [];
            var query = {};
            if(oEvent.getParameters().listItem.isSelected()){
                measures.push(oEvent.getParameters().listItem.getTitle());
                query.hideMeasures = measures;
            }else{
                query.hideMeasures = measures;
            }
         
            //oEvent.getParameters().listItem.getTitle();
            var params = {
                chartType: "bar", 
                collection: "barchart"
            };
            params.query = query;
            this.getRouter().navTo("master", params);
            // var oParent = oEvent.oSource.getParent();
            // oParent.oVizFrame;
            // var oVizFrame = this.byId("idoVizFrame");
            // oVizFrame.removeFeed(0);
        },
        _onParseSettings: function(oDataService, settingsObject, collection, hideMeasures){
     
            this.setModel(new JSONModel(settingsObject));
            var oVizFrame =   this.oVizFrame = this.getView().byId("idoVizFrame", "/");
          
            oVizFrame.destroyDataset();
            oVizFrame.destroyFeeds();
            // if(oVizFrame.getDataset()){
               
            // }
            // if(typeof oVizFrame.mAggregations.feeds != "undefined"){
                
            // }
            // var agg = oVizFrame.mAggregations;
            // if(agg.feeds){
            //     oVizFrame.destroyFeeds();
            // }
            var amModel = new ODataModel(oDataService, true);
            settingsObject.dataset.data.path = collection;
            var oDataset = new FlattenedDataset(settingsObject.dataset);
            oVizFrame.setVizType(settingsObject.type);
            oVizFrame.setVizProperties(settingsObject.properties);
            oVizFrame.setDataset(oDataset);
   
            settingsObject.feedItems.forEach(function(value){
                if(value.type == "Measure"){
                    if(hideMeasures){
                        if(value.values[0] == hideMeasures[0]){
                            return;
                        }
                    }
                }
                var item = new FeedItem(value);
                oVizFrame.addFeed(item);
            });
            oVizFrame.setModel(amModel);
            this.settingsObject = settingsObject.actionItems;

            var popoverProps = {};
            var chartPopover = new Popover(popoverProps);
            chartPopover.setActionItems(this.onAddClickEventToItems(settingsObject.actionItems));
            chartPopover.connect(oVizFrame.getVizUid());
        },
        onAddClickEventToItems: function(actionItems){
        //     this.getRouter().navTo("master", {chartIndex: "bar",
        // ewfwfe: "ewfww"});
            var masterThis = this;
            return actionItems.map(function(value){
                value.press = masterThis.onItemClick.bind(masterThis);
                return value;
            });
        },
        onItemClick: function(event){
            var objectData = this.settingsObject.filter(function(value){
                return value.text == event.oSource.mProperties.text;
            });
   

            this.getRouter().navTo("master", objectData[0].route);
            // this.getRouter().navTo("master", {
            //     chartType: "Heatmap",
            //     collection: "heatmapdaily"
            // });
            // if(event.oSource.mProperties.text == "Show Heatmap"){
            //     this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, HeatmapA);
            // }
        },
        onInit: function() {
            var titleModel = new JSONModel({name: "dfsfsfdds"});
            this.setModel(titleModel, "title");
          
            //titleModel.setProperty("title", {name: "Wefihbfihbwehifibwehiefwbewf"});

            var oRouter = this.getRouter();
            oRouter.getRoute("master").attachMatched(this._onObjectMatched, this);
            
            //var oRouter = this.getRouter();
            //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           // oRouter.getRoute("master").attachPatternMatched(this._onObjectMatched, this);
            
           
           //this.getRouter().attachRoutePatternMatched(this._onObjectMatched, this);





            // Format.numericFormatter(ChartFormatter.getInstance());
            // var formatPattern = ChartFormatter.DefaultPattern;
            // this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, Bar);
            //this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, HeatmapA);

          

        }
    });
});