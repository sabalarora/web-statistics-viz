
sap.ui.define([
    "sap/m/StandardListItem"
], function (Control) {
    "use strict";
    return Control.extend("com.dla.webstat.control.TrendtListControl", {
        metadata : {
            aggregations : {},
            properties : {
                items: {
                    type: 'object'
                }
            },
            events : {}
        },
        onAfterRendering: function () {
            this.addStyleClass("trendListControl");
            var trendHtml = this.generateHtml();
                           // sap-icon://navigation-up-arrow
                           //sap-icon://navigation-down-arrow
            var domRef = this.getDomRef();  
            $("#__control0-content").append(trendHtml);
        },
        generateHtml: function(){
            return '<div class="trendListBody">'
                    + '<h2>'+this.mProperties.items.title+'</h2>'
                    + '<hr/>'
                    + this.mProperties.items.items.reduce(function(agg, currValue){
                            agg += "<h3>" + currValue.name + ": " + currValue.value + "<h3/>";
                            return agg;
                        }, "") + 
                    '</div>';
        },
        renderer: function (oRm, oControl) {
            sap.m.StandardListItemRenderer.render(oRm, oControl);
        }
    });
});