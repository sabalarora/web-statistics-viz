sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/util/MockServer",
    "com/dla/webstat/test/localService/servers/mockdata.odata.server",
    "com/dla/webstat/test/localService/servers/mockdata.json.server"
], function(jQuery, MockServer){
    "use strict";
    return {
        init : function(){
            sap.ui.core.util.MockServer.startAll();
        }
    };
});