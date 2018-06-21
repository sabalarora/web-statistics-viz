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
                name: 'Category',
                value: "{Category}"
            }],
            measures: [{
                name: 'Total',
                value: '{Total}'
            }],
            data: {
                path: "/barchart"
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
                    params: 4444
                }
            }
        ],
        applications: [
            {name: "RomSync"}
        ]
    };
});