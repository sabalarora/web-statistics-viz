
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
                settings: {
                    type: 'object'
                }
            },
            events : {}
        },
        init: function () {},
        onAfterRendering: function () {
            var trendHtml = `<div style="width:100% !important;height:480px;">
                                <h2>Trending This Week</h2>
                                <hr/>
                                <h3>Hits: 3211</h3>
                                <h3>Users: 2223</h3>
                            </div>`;
                      
            var domRef = this.getDomRef();
            domRef.style.setProperty('background-color','rgb(88, 153, 218)','');
            domRef.style.setProperty('color','White','');
            domRef.style.setProperty('height','100%','');
            domRef.style.setProperty('padding-top','5px','');
            domRef.style.setProperty('padding-bottom','20px','');
            domRef.style.setProperty('text-shadow','2px 2px #2c2c2c','');
            
            $("#__control0-content").css('flex-direction','column');
            $("#__control0-content").append(trendHtml);
        },
        renderer: function (oRm, oControl) {
            sap.m.StandardListItemRenderer.render(oRm, oControl);
        }
    });
    return customControl;
});