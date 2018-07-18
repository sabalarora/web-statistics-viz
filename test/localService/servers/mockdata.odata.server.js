sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "./statistics-generator"
], function(jQuery, MockServer, statisticsGenerator){
    "use strict";
    
    var oMockServer = new MockServer({
        rootUri: "/data/webstatistics.svc/"
    });
    var oUriParameters = jQuery.sap.getUriParameters();
    MockServer.config({
        autoRespond: true
    });
    var sPath = jQuery.sap.getModulePath("com.dla.webstat.test.localService.mockdata.statistics");
    
    
    oMockServer.simulate(sPath + "/metadata.xml", sPath);

    oMockServer.attachAfter("GET", function(oEvent) {
        var statistics = new statisticsGenerator();
        var re =statistics.getWeekly();
        oEvent.mParameters.oXhr.respondJSON(200,{
            "Content-Type": "application/json;charset=utf-8"
        },re);
    }, "MEETING");
    // oMockServer.setEntitySetData("TestData",[{
    //     name: "ewfojwnefojwe"
    // }]);


    // oMockServer.attachAfter("GET", function(oEvent) {
    //     debugger;
    // }, "MEETING");
    return oMockServer;
});