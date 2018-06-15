sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/viz/ui5/controls/common/feeds/FeedItem',
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel",
	"com/dla/webstat/constants"
], function(Controller, FlattenedDataset, FeedItem, JSONModel, ODataModel, APP_CONSTANTS){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Chart",{
        onInit: function(){
            var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
            this._updateVizFrame(oVizFrame);
         
            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.getRoute("statistics").attachPatternMatched(this._onObjectMatched, this);
        },
        _constants: {
            sampleName: "com.dla.webstat.model",
            chartContainerId: "chartContainer",
            table: {
				icon: "sap-icon://table-view",
				title: "Table",
				itemBindingPath: "/businessData",
				columnLabelTexts: ["Sales Month", "Marital Status", "Customer Gender", "Sales Quarter", "Cost", "Unit Price", "Gross Profit", "Sales Revenue"],
				templateCellLabelTexts: ["{Sales_Month}", "{Marital Status}", "{Customer Gender}", "{Sales_Quarter}", "{Cost}", "{Unit Price}", "{Gross Profit}", "{Sales Revenue}"]
			},
			vizFrame: {
				id: "chartContainerVizFrame",
				dataset: {
					dimensions: [{
						name: 'timestamphour',
						value: "{timestamphour}"
					}],
					measures: [{
						group: 1,
						name: 'visits',
						value: '{visits}'
					}],
					data: {
						path: "/"
					}
				},
				modulePath: "/webcontent_stat_daily.json",
				type: "line",
				properties: {
					plotArea: {
						showGap: true
					}
				},
				feedItems: [{
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["visits"]
				}, {
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["timestamphour"]
				}]
			}
		},
        _updateVizFrame: function(vizFrame) {
			var oVizFrame = this._constants.vizFrame;
			//var oVizFramePath = jQuery.sap.getModulePath(this._constants.sampleName, oVizFrame.modulePath);
			//var oModel = new JSONModel(oVizFramePath);
			var oModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, true);

			var oDataset = new FlattenedDataset(oVizFrame.dataset);

			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
        },
        _addFeedItems: function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		},
        _onObjectMatched: function(oEvent){
            
        },
        handleSelectionChange: function(oEvent){
            debugger;
        }
    })
})