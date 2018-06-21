sap.ui.define([
    'jquery.sap.global',
    "sap/viz/ui5/format/ChartFormatter"
], function (jQuery,ChartFormatter) {
    "use strict";
    var formatPattern = ChartFormatter.DefaultPattern;

    //      path: "/barchart"
    return {
        type: "bar",
        dataset: {
            dimensions: [{
                name: 'Category',
                value: "{Category}"
            }],
            measures: [{
                name: 'Total',
                value: '{Total}'
            }],
            data: {
                path: null //is the collection name
            }
        },
        feedItems: [{
                id: 'valueAxisFeed',
                uid: "valueAxis",
                type: "Measure",
                values: ["Total"]
            },
            {
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Category"]
            }
        ],
        properties: {
            plotArea: {
                dataLabel: {
                   
                    visible: true
                }
            },
            valueAxis: {
                label: {
        
                },
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
                visible: true,
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
        applications: [
            {name: "RomSync"}
        ]
    };
});