sap.ui.define([
    "sap/m/StandardListItem",
    "sap/viz/ui5/controls/VizFrame",
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
], function (Control, VizFrame, ODataModel, APP_CONSTANTS, FlattenedDataset, FeedItem) {
    "use strict";
    var customControl = Control.extend("com.dla.webstat.control.LineChartListControl", {
        metadata : {
            aggregations : {},
            properties : {
                settings: {
                    type: 'object'
                }
            },
            events : {}
        },
        onAfterRendering: function () {
            this.addStyleClass("customTileControl");
            var vizframe = new VizFrame( {
                'vizType': 'bar',
                'uiConfig': {
                    'applicationSet': 'fiori',
                    'showErrorMessage': true
                }
            }).placeAt(this.sId + "-content");
            var settings = this.mProperties.settings;
            //var dataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL);
            var oDataset = new FlattenedDataset(settings.dataset);
            vizframe.setDataset(oDataset);
            vizframe.setModel(new ODataModel(settings.dataset.data.service_url));
            settings.feedItems.forEach(function(value){
                var item = new FeedItem(value);
                vizframe.addFeed(item);
            });
            vizframe.setVizType(settings.type);
            vizframe.setVizProperties(settings.properties);
        },
        renderer: function (oRm, oControl) {
            sap.m.StandardListItemRenderer.render(oRm, oControl);
        }
    });
    return customControl;
});