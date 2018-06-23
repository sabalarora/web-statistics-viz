sap.ui.define([
    'jquery.sap.global',
    "sap/viz/ui5/format/ChartFormatter"
], function (jQuery,ChartFormatter) {
    "use strict";
    var formatPattern = ChartFormatter.DefaultPattern;
    return {
        type: "bar",
        dataset: {
            dimensions: [{
                name: 'object',
                value: "{object}"
            }],
            measures: [{
                name: 'visits',
                value: '{visits}'
            },{
                name: 'users',
                value: '{users}'
            }],
            data: {
                path: "appstatistics", //is the collection name
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
                values: ["visits", "users"]
            },
            {
                uid: "categoryAxis",
                type: "Dimension",
                values: ["object"]
            }
        ],
        properties: {
            plotArea: {
                dataLabel: {
                   
                    visible: true
                }
            },
            valueAxis: {
                label: { },
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
        actionItems:[
            {
                type: 'action',
                text: 'Show Heatmap',
                route: {
                    chartType: "Heatmap",
                    collection: "heatmapdaily"
                }
            }
        ],
        aggregations:[
            {
                name: 'Weekly'
            },
            {
                name: 'Monthly'
            }
        ]
    };
});