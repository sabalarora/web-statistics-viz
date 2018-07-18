sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "./stats-generator",
    "./dual-linechart-generator"
], function(jQuery, MockServer, statsGenerator, DualLineChartGenerator){
    "use strict";
    var oMockServer = new MockServer({
        rootUri: "/data/webstatistics.svc/"
    });
    //var oUriParameters = jQuery.sap.getUriParameters();
    MockServer.config({
        autoRespond: true
    });
    var sPath = jQuery.sap.getModulePath("com.dla.webstat.test.localService.mockdata.statistics");
    oMockServer.simulate(sPath + "/metadata.xml", sPath);
    var webpages = [
        "/index.html",
        "batch/index.html",
        "pentrist/index.html",
        "hotmail/index.html",
        "google/index.html"
    ];
    var statistics = new statsGenerator();
    statistics.init(function(dataContainer){
        return {
            AGGREGATIONLEVEL: "h",
            COUNTER: null,
            PCDURL: null,
            OBJECTTYPE: "iView",
            IMPRESSIONS: Math.floor(Math.random() * 50) + 0,
            VISITS: Math.floor(Math.random() * 10),
            CUSTOM: webpages[Math.floor(Math.random() * webpages.length) + 0],
            ID: null
        };
    });
    var dualLineChart = new DualLineChartGenerator(statistics);
    var week = dualLineChart.generateWeekly();
    debugger;

    oMockServer.setEntitySetData("statsDaily",statistics.aggregateData("YYYY-MM-DD"));
    oMockServer.setEntitySetData("statsMonthly",statistics.aggregateData("YYYY-MM"));
    oMockServer.attachAfter("GET", function(oEvent) {
        var daily = statistics.aggregateData("YYYY-MM-DD");
        var monthly = statistics.aggregateData("YYYY-MM");
       debugger;
        // var statistics = new statisticsGenerator();
        // var re =statistics.getWeekly();
        // oEvent.mParameters.oXhr.respondJSON(200,{
        //     "Content-Type": "application/json;charset=utf-8"
        // },re);
    }, "MEETING");
    // oMockServer.setEntitySetData("TestData",[{
    //     name: "ewfojwnefojwe"
    // }]);


    // oMockServer.attachAfter("GET", function(oEvent) {
    //     debugger;
    // }, "MEETING");
    return oMockServer;
});