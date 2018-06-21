sap.ui.define([

], function () {
    "use strict";
    return {
        type: "heatmap",
        dataset: {
            dimensions: [{
                name: 'Day',
                value: "{Day}"
              },{
                name: 'Time',
                value: "{Time}"
              }],
              measures: [{
                  name: 'Hits',
                  value: '{Hits}'
                },
              ],
              data: {
                path: "/heatmapdaily"
              }
        },
        feedItems: [{
                uid: "color",
                type: "Measure",
                values: ["Hits"]
            },
            {
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Time"]
            },
            {
                uid: "categoryAxis2",
                type: "Dimension",
                values: ["Day"]
            }
        ],
        properties: {
            plotArea: {
                dataLabel: {
                    visible: false
                }
            },
            legend: {
                title: {
                    visible: false
                }
            },
            title: {
                visible: true,
                text: 'Profit and Cost and Revenue by Item Category'
            }
        }
    };
});