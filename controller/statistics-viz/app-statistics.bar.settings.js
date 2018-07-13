sap.ui.define([
    'jquery.sap.global',
    "sap/viz/ui5/format/ChartFormatter",
    "com/dla/webstat/constants"
], function (jQuery,ChartFormatter, APP_CONSTANTS) {
    "use strict";
    var formatPattern = ChartFormatter.DefaultPattern;
    return {
        type: "bar",
        dataset: {
            dimensions: [{
                name: 'Applications',
                value: "{object}"
            }],
            measures: [{
                name: 'Visits',
                value: '{visits}'
            },{
                name: 'Users',
                value: '{users}'
            }],
            data: {
                collection: APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL,
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
            },    
            {
                type: 'action',
                text: 'Show Application Dashboard',
                route: {
                    url: "appdashboard"
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