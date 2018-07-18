sap.ui.define([
    "com/dla/webstat/controller/BaseController"
], function (Controller) {
    "use strict";
    return Controller.extend("com.dla.webstat.controller.Statistics", {
        onInit: function(){
            var oRouter = this.getRouter();
            //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("statistics").attachPatternMatched(this._onObjectMatched, this);
            var tabbar = this.byId("tabbar"); 
            tabbar.attachSelect(this._onClickItem.bind(this));
        },
       
        _onObjectMatched: function(oEvent){
            var oInterval = oEvent.getParameter("arguments").interval;
            this.args = oEvent.getParameter("arguments");
          
            // var iSelection;
            // var intervalMap = {
            //     weekly: "webcontent_stat_weekly",
            //     monthly: "webcontent_stat_monthly",
            //     daily: "webcontent_stat_daily"
            // }
            // var iSelection = (!intervalMap[oInterval]) ? "webcontent_stat_daily" : intervalMap[oInterval];
            // var table = this.byId("tabledata");
            // // table.setBusy(true);
            // table.getBinding("items").sPath = "/" + iSelection;
            // table.getBinding("items").refresh();
        },
        _onClickItem: function(oEvent){
            var sKey = oEvent.mParameters.key;
            this.args.interval = sKey;
            this.getRouter().navTo("statistics", this.args);
        }
    });
});