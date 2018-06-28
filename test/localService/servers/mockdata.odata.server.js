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
    return oMockServer;
});