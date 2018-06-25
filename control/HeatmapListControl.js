sap.ui.define([
    "sap/m/ObjectListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/viz/ui5/controls/VizFrame",
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
], function (Control, Text, Input, VizFrame, ODataModel, APP_CONSTANTS, FlattenedDataset, FeedItem) {
    "use strict";

    return Control.extend("com.dla.webstat.control.HeatmapListControl", {
        init: function () {},
        onAfterRendering: function () {
            var vizframe = sap.ui.getCore().byId("vizframe");
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
                        path: "/appstatistics", //is the collection name
                        sorter: [
                            new sap.ui.model.Sorter({
                                path: 'object',
                                descending: false
                            })
                        ]
                    }
                },
                feedItems: [{
                        id: 'valueAxisFeed',
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
          
            var dataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL, true);
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
        renderer: function (oRenderManager, oControl) {
            var vizFrame = new VizFrame("vizframe", {
                'vizType': 'bar',
                'uiConfig': {
                    'applicationSet': 'fiori',
                    'showErrorMessage': true
                }
            });

            oRenderManager.write("<div");
            oRenderManager.writeControlData(oControl);
            oRenderManager.addClass("myClass");
            oRenderManager.writeClasses();
            oRenderManager.write(">");


            oRenderManager.renderControl(vizFrame);

            ///oRenderManager.renderControl(new Text({...}));
            oRenderManager.renderControl(new Input());
            oRenderManager.write("</div>");
        }
    });
});

// metadata : {
//     aggregations : {
//     },
//     properties : {

//     },
//     events : {

//     }
// },
// init : function(){

// },