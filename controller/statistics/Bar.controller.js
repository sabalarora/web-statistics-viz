sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
], function(jQuery, Controller, JSONModel, ChartFormatter, Format,ODataModel, APP_CONSTANTS) {
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Bar",{
        onInit : function(){
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString: formatPattern.SHORTFLOAT_MFD2,
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
                    visible: true,
                    text: 'Total Views and Users'
                }
            });
            var dataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, true);
            oVizFrame.setModel(dataModel);
        }
    });   
});