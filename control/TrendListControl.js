
sap.ui.define([
    "sap/m/StandardListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/viz/ui5/controls/VizFrame",
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    'sap/ui/model/Filter', 
    'sap/ui/model/FilterOperator',
    "sap/ui/model/json/JSONModel"
], function (Control, Text, Input, VizFrame, ODataModel, APP_CONSTANTS, FlattenedDataset, FeedItem, Filter, FilterOperator, JSONModel) {
    "use strict";
    var customControl = Control.extend("com.dla.webstat.control.TrendtListControl", {
        metadata : {
            aggregations : {},
            properties : {
                items: {
                    type: 'object'
                }
            },
            events : {}
        },
        init: function () {},
        onAfterRendering: function () {
            this.addStyleClass("trendListControl");
            var trendHtml = `<div class="trendListBody">
                                <h2>Trending This Week</h2>
                                <hr/>`+ 
                                    this.mProperties.items.list.reduce(function(agg, currValue, currIndex){
                                        agg += "<h3>" + currValue.name + ": " + currValue.value + "<img src='sap-icon://navigation-up-arrow'/>" + "<h3/>";
                                        return agg;
                                    }, "") +`
                            </div>`;
            
                           // sap-icon://navigation-up-arrow
                           //sap-icon://navigation-down-arrow
            var domRef = this.getDomRef();  
            $("#__control0-content").append(trendHtml);
        },
        renderer: function (oRm, oControl) {
            sap.m.StandardListItemRenderer.render(oRm, oControl);
        }
    });
    return customControl;
});