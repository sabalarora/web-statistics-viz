sap.ui.define([
    "com/dla/webstat/controller/BaseController"
], function(Controller){
    "use strict";
    return Controller.extend("com.dla.webstat.controller.App", {
        onInit: function(){
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },
        onSideNavButtonPress: function() {
            var oToolPage = this.byId("app");
            var bSideExpanded = oToolPage.getSideExpanded();
            //this._setToggleButtonTooltip(bSideExpanded);
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());

        },
    
        onItemSelect: function(oEvent) {
            var oItem = oEvent.getParameter('item');
            var sKey = oItem.getKey();
            console.log(sKey);
            var key = sKey.split(".");
        
            this.getRouter().navTo(key[0], {
                application: key[1],
                interval: "All"}
            );
            // // if you click on home, settings or statistics button, call the navTo function
            // if ((sKey === "home" || sKey === "masterSettings" || sKey === "statistics")) {
            //     // if the device is phone, collaps the navigation side of the app to give more space
            //     // if (Device.system.phone) {
            //     //     this.onSideNavButtonPress();
            //     // }
               
            //     this.getRouter().navTo(sKey);
            // } else {
            //    // MessageToast.show(sKey);
            // }
        }
    });
});