sap.ui.define([
    "sap/ui/core/UIComponent"
], function(UIComponent){
    "use strict"
    return UIComponent.extend("com.dla.webstat.Component", {
        metadata:{
            manifest: "json"
        },
        init: function(){
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();
        },
        exit: function(){

        },
        getContentDensityClass : function() {
            if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
        }
    });
});