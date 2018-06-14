sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.Start",{
        onInit: function(){
            var oModel = new JSONModel({
                daily: {
                    hits: 300,
                    difference: -1,
                    lastUpdated: "10/23/2018"
                },
                weekly: {
                    hits: 5000,
                    difference: 1,
                    lastUpdated: "10/23/2018"
                },
                monthly: {
                    hits: 30000,
                    difference: 1,
                    lastUpdated: "10/23/2018"
                },
            });
            
            this.getView().setModel(oModel);
        },
        calculateDailyMetrics: function(){
           
        },
        onNavToDailyMetrics: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            oRouter.navTo("webcontentodata", {
                interval: "daily"
            });
        },
        onNavToWeeklyMetrics: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            oRouter.navTo("webcontentodata", {
                interval: "weekly"
            });
        },
        onNavToMonthlyMetrics: function(oEvent){
            var oItem = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
            oRouter.navTo("webcontentodata", {
                interval: "monthly"
            });
        }
    });
});


