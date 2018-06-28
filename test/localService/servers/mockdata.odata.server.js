sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
], function(jQuery, MockServer){
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
    oMockServer.setRequests([
        {
            method: "GET",
            path: RegExp("trends"),
            response: function(response){
                jQuery.ajax({
                    url: "localService/mockdata/statistics/viz-trends.json",
                    dataType: 'json',
                    async: false,
                    success: function(data){
                        response.respondJSON(200,  {
                            "Content-Type": "application/json;charset=utf-8"
                        }, data);
                    }
                });
            }
        }
    ]);
    //web-statistics/test/localService/mockdata/statistics/viz-trends.json
    return oMockServer;
});