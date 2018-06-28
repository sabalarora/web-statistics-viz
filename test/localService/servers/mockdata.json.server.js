sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
], function(jQuery, MockServer){
    "use strict";
    var oMockServer = new MockServer({
        rootUri: "/data/api.svc/"
    });
    var oUriParameters = jQuery.sap.getUriParameters();
    MockServer.config({
        autoRespond: true
    });
    oMockServer.setRequests([
        {
            method: "GET",
            path: RegExp("trends(.*)"),
            response: function(response){
                debugger;
                jQuery.ajax({
                    url: "localService/mockdata/statistics/viz-trends.json",
                    dataType: 'json',
                    async: false,
                    success: function(data){
                        var urlParams = new URLSearchParams(["?",response.url.split("?")[1]].join(""));
                        var appName = urlParams.getAll('appName')[0]
                        var filteredData = data.filter(function(value){
                            return (value.name == appName)?true:false;
                        });
                        filteredData = (filteredData.length == 1) ? filteredData[0] : null;
                        return response.respondJSON(200,  {
                            "Content-Type": "application/json;charset=utf-8"
                        }, filteredData);
                    }
                });
            }
        }
        ]);
    return oMockServer;
});