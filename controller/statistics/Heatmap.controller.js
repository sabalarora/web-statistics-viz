sap.ui.define([
	'jquery.sap.global',
    "sap/ui/core/mvc/Controller",
    'sap/viz/ui5/data/FlattenedDataset',
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel",
	"com/dla/webstat/constants",
	"sap/viz/ui5/format/ChartFormatter",
	'sap/viz/ui5/api/env/Format',
	'sap/viz/ui5/controls/common/feeds/FeedItem'
], function(jQuery, Controller, FlattenedDataset, JSONModel, ODataModel, APP_CONSTANTS, ChartFormatter, Format, FeedItem){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Heatmap",{
        onAfterRendering: function(){
            this.oVizFrame;

        },
        onInit: function(){
			Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
			var oSettingsModel = new JSONModel({

                dataLabel : {
                    name : "Value Label",
                    defaultState : false
                },
				color : {
					name : "Color",
					defaultSelected : 1,
					values : [{
						name : "3 Sections",
						value : [{
							"feed": "color",
							"type": "color",
							"numOfSegments": 3,
							"palette": ["sapUiChartPaletteSequentialHue1Light2", "sapUiChartPaletteSequentialHue1", 
								"sapUiChartPaletteSequentialHue1Dark2"]
						}]
					},{
						name : "5 Sections",
						value : [{
							"feed": "color",
							"type": "color",
							"numOfSegments": 5,
							"palette": ["sapUiChartPaletteSequentialHue1Light2", "sapUiChartPaletteSequentialHue1Light1", 
								"sapUiChartPaletteSequentialHue1", "sapUiChartPaletteSequentialHue1Dark1", 
								"sapUiChartPaletteSequentialHue1Dark2"]
						}]
					},{
						name : "8 Sections",
						value : [{
							"feed": "color",
							"type": "color",
							"numOfSegments": 8,
							"palette": ["sapUiChartPaletteSequentialHue3Dark1", "sapUiChartPaletteSequentialHue3",
								"sapUiChartPaletteSequentialHue3Light1", "sapUiChartPaletteSequentialHue3Light2", 
								"sapUiChartPaletteSequentialHue1Light2", "sapUiChartPaletteSequentialHue1Light1", 
								"sapUiChartPaletteSequentialHue1", "sapUiChartPaletteSequentialHue1Dark1"]
						}]
					}]
				}
            });
            oSettingsModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.getView().setModel(oSettingsModel);
			
			var oModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, true);
           
            // var filters = new Array();
            // var filterByHours = new sap.ui.model.Filter("Hours", sap.ui.model.FilterOperator.Contains, 'January');
            // filters.push(filterByHours);  
            // oModel.read("/daily", {
            //     filters: filters,
            //     success: function(response){
                 
            //     },
            //     error: function(){
             
            //     }
            // });
            this.oVizFrame = this.getView().byId("idVizFrame");
			this.oVizFrame.setVizProperties({
                plotArea: {
                    background: {
                        border: {
                            top: {
                                visible: false
                            },
                            bottom: {
                                visible: false
                            },
                            left: {
                                visible: false
                            },
                            right: {
                                visible: false
                            }
                        }
                    },
                    dataLabel: {
                        formatString:formatPattern.STANDARDINTEGER,
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                categoryAxis2: {
                    title: {
                        visible: false
                    }
                },
                legend: {
                    visible: true,
                    formatString:formatPattern.SHORTFLOAT,
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: true,
                    text: 'Daily Usage (Heatmap)'
                }
            });
            this.oVizFrame.setVizScales([{
                name : "8 Sections",
                value : [{
                    name : "3 Sections",
                    value : [{
                        "feed": "color",
                        "type": "color",
                        "numOfSegments": 3,
                        "palette": ["sapUiChartPaletteSequentialHue1Light2", "sapUiChartPaletteSequentialHue1", 
                            "sapUiChartPaletteSequentialHue1Dark2"]
                    }]
                }]
            }]);
            this.oModel = oModel;
            this.oVizFrame.setModel(oModel);
        }
    })
})