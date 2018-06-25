sap.ui.define([
    "sap/m/StandardListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/viz/ui5/controls/VizFrame",
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
], function (Control, Text, Input, VizFrame, ODataModel, APP_CONSTANTS, FlattenedDataset, FeedItem) {
    "use strict";

    var customControl = Control.extend("com.dla.webstat.control.HeatmapListControl", {
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
           
            var vizframe = new VizFrame( {
                'vizType': 'bar',
                'uiConfig': {
                    'applicationSet': 'fiori',
                    'showErrorMessage': true
                }
            }).placeAt(this.sId + "-content");
            vizframe.attachRenderComplete(function(){
                $("#"+vizframe.sId).attr("style", "width:100% !important;height:480px;");

            });
            
            $("#"+this.sId + "-content").attr("style", "flex-direction: column !important;");
            $("#"+this.sId).attr("style", "height: 100%; width: 100%;");
            var settings = {
                type: "bar",
                dataset: {
                    dimensions: [{
                        name: 'Applications',
                        value: "{object}"
                    }],
                    measures: [{
                        name: 'Visits',
                        value: '{visits}'
                    }, {
                        name: 'Users',
                        value: '{users}'
                    }],
                    data: {
                        path: "/appstatistics" //is the collection name
                    }
                },
                feedItems: [{
                        uid: "valueAxis",
                        type: "Measure",
                        values: ["Visits", "Users"]
                    },
                    {
                        uid: "categoryAxis",
                        type: "Dimension",
                        values: ["Applications"]
                    }
                ],
                properties: {

                    plotArea: {
                        dataLabel: {

                            visible: true
                        }
                    },
                    valueAxis: {
                        label: {},
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
                        visible: false,
                        text: 'Total Views and Users'
                    }
                },
            };
      
          //var settings = this.mProperties.settings;
            var dataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL);
           
            var oDataset = new FlattenedDataset(settings.dataset);
            vizframe.setDataset(oDataset);
            vizframe.setModel(dataModel);
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
    customControl.test = "wgfojwnfijownmfe";
    return customControl;
});