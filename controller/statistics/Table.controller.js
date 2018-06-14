sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Table",{
        onInit: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("statistics").attachPatternMatched(this._onObjectMatched, this);


            var oModel = new JSONModel("com.dla.webstat.model.webcontent_stat_daily.json");
            var table = this.byId("tabledata");
            
            $.get("model/webcontent_stat_daily.json").then(function(resources){
                var jsonModel = new JSONModel({
                    items : resources
                });
                table.setModel(jsonModel);
            });

            
            //var oModel = this.getOwnerComponent().getModel("daily");
            //table.getBinding("items").sPath = "/" + iSelection;
            //table.getBinding("items").refresh();
         
        },
        _onObjectMatched: function(oEvent){
            
        }
    });
});