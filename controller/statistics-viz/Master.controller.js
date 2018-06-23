sap.ui.define([
    'jquery.sap.global',
    'com/dla/webstat/controller/BaseController',
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/ui/model/json/JSONModel",
    'sap/viz/ui5/api/env/Format',
    "sap/viz/ui5/format/ChartFormatter",
    "./Heatmap.settings",
    "./app-statistics.bar.settings",
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
        measures: {},
        onSelectionChange: function(oEvent){
            var measures = [];
            var query = {};
            if(oEvent.getParameters().listItem.isSelected()){
                console.log("selected")
                //measures.push(oEvent.getParameters().listItem.getTitle());
            }
            debugger;
            // var ra = this.oView.byId("ApplicationList");
            // debugger;
            // debugger;
           // query.hideMeasures = measures;
         ///   console.log(measures);


            // var params = {
            //     chartType: "bar", 
            //     collection: "appstatistics"
            // };
            // params.query = query;
            // this.getRouter().navTo("master", params);



            // var oParent = oEvent.oSource.getParent();
            // oParent.oVizFrame;
            // var oVizFrame = this.byId("idoVizFrame");
            // oVizFrame.removeFeed(0);
        },
        _onParseSettings: function(oDataService, settingsObject, collection, hideMeasures){

            var re = new JSONModel(settingsObject);
            this.setModel(re);
            var oVizFrame = this.oVizFrame;
            this.oVizFrame.destroyDataset();
            this.oVizFrame.destroyFeeds();
            
            settingsObject.dataset.data.path = collection;
            var amModel = new ODataModel(oDataService, true);
            amModel.attachBatchRequestCompleted(function(response, tre){
                this.oAppList =  sap.ui.getCore().byId("__component0---master--idoApplist");
                this.detailPage = sap.ui.getCore().byId("__component0---detail--detailPage");
                this.detailPage.setTitle(settingsObject.properties.title.text);
                var dims = settingsObject.dataset.dimensions;
                var r = Object.values(response.getSource().oData)
                    .map(function(values){
                        return {'object' : values[dims[0].name]};
                    });

                
                var er = [];
                r.forEach(function(value){
                    if(!er[value["object"]]){
                        er[value["object"]] = value;
                    }
                });
               r = Object.keys(er).map(function(value){
                   return {object : value};
               });
               
                this.oAppList.setModel(new JSONModel(r));
            }.bind(this));
            var oDataset = new FlattenedDataset(settingsObject.dataset);
            this.oVizFrame.setDataset(oDataset);
            this.oVizFrame.setModel(amModel);
            
            //this.setModel(amModel);
            //this.setModel(new JSONModel({names: ["ffffff"]}), "vm");
            //sap.ui.getCore().setModel(new JSONModel({names: ["ffffff"]}), "vm");
          
            settingsObject.feedItems.forEach(function(value){
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

            var popoverProps = {};
            var chartPopover = new Popover(popoverProps);
            chartPopover.setActionItems(this.onAddClickEventToItems(settingsObject.actionItems));
            chartPopover.connect(this.oVizFrame.getVizUid());
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
            this.getRouter().getRoute("master").attachMatched(this._onObjectMatched, this);
            this.oVizFrame = this.getView().byId("idoVizFrame");
            
            this.firstRun = true;
            //var titleModel = new JSONModel({name: "dfsfsfdds"});
            //this.setModel(titleModel, "title");
          
            //titleModel.setProperty("title", {name: "Wefihbfihbwehifibwehiefwbewf"});

       
            
            
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