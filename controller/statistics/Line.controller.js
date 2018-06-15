sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
], function(jQuery, Controller, JSONModel, FlattenedDataset, ChartFormatter, Format,ODataModel, APP_CONSTANTS) {
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Line", {
        onInit : function (evt) {
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:formatPattern.SHORTFLOAT_MFD2,
                        visible: true
                    }
                },
                valueAxis: {
                    label: {
                        formatString: formatPattern.SHORTFLOAT
                    },
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
            });
            var feedValueAxis = this.getView().byId('valueAxisFeed');
            this.oVizFrame.removeFeed(feedValueAxis);

            feedValueAxis.setValues(["Hits", "LastWeeksHits"]);
            this.oVizFrame.addFeed(feedValueAxis);

            var dataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, true);
            oVizFrame.setModel(dataModel);
        }
    });
});