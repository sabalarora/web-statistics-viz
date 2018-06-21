sap.ui.define([
    'jquery.sap.global',
    'com/dla/webstat/controller/BaseController',
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/ui/model/json/JSONModel",
    'sap/viz/ui5/api/env/Format',
    "sap/viz/ui5/format/ChartFormatter",
    "./Heatmap.settings",
    "./Bar.settings"
], function(jQuery, Controller,ODataModel,APP_CONSTANTS,JSONModel,Format,ChartFormatter, HeatmapA, Bar) {
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics-viz.Master",{
        _onObjectMatched: function(oEvent) {
            if(!oEvent.mParameters.arguments.chartIndex){
                this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, Bar);
            }else{
                this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, HeatmapA);
            }
        },
        switchChartByIndex: function(chartIndex) {
            if (chartIndex == "Bar") {
              this.oVizFrame.setVizType('bar');
            };
            if (chartIndex == "Line") {
              this.oVizFrame.setVizType('line');
            };
            if (chartIndex == "Column") {
              this.oVizFrame.setVizType("column")
            };
            if (chartIndex == "Stacked_Column") {
              this.oVizFrame.setVizType("stacked_column")
            };
        },
        onSelectionChange: function(oEvent){
            debugger;
        },
        _onParseSettings: function(oDataService, settingsObject){
            this.setModel(new JSONModel(settingsObject));
         
            var oVizFrame = this.getView().byId("idoVizFrame", "/");
            // oVizFrame.destroyDataset();
            // oVizFrame.destroyFeeds();
            var amModel = new ODataModel(oDataService, true);
            var oDataset = new sap.viz.ui5.data.FlattenedDataset(settingsObject.dataset);
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(amModel);
            
            settingsObject.feedItems.forEach(function(value){
                var item = new sap.viz.ui5.controls.common.feeds.FeedItem(value);
                oVizFrame.addFeed(item);
            });
            oVizFrame.setVizType(settingsObject.type);
            oVizFrame.setVizProperties(settingsObject.properties);
            this.settingsObject = settingsObject.actionItems;
            var popoverProps = {};
            var chartPopover = new sap.viz.ui5.controls.Popover(popoverProps);
            chartPopover.setActionItems(this.onAddClickEventToItems(settingsObject.actionItems));
            chartPopover.connect(oVizFrame.getVizUid());
        },
        onAddClickEventToItems: function(actionItems){
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

            this.getRouter().navTo("master", {chartIndex: "bar"});
            // if(event.oSource.mProperties.text == "Show Heatmap"){
            //     this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, HeatmapA);
            // }
        },
        onInit: function() {
            //var oRouter = this.getRouter();
            //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           // oRouter.getRoute("master").attachPatternMatched(this._onObjectMatched, this);
            this.getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
            // Format.numericFormatter(ChartFormatter.getInstance());
            // var formatPattern = ChartFormatter.DefaultPattern;
            // this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, Bar);
            //this._onParseSettings(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, HeatmapA);

          

        }
    });
});