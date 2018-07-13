/*global QUnit*/
/*global opaTest*/

sap.ui.require([
    "sap/ui/test/opaQunit"
], function(){
    "use strict";
    QUnit.module("Navigation");
    opaTest("Should open the VizFrame Popup Menu", function(Given, When, Then){
        Given.iStartMyAppInAFrame(jQuery.sap.getResourcePath("sap/ui/demo/app/test", ".html#/NewStatistics/bar/appstatistics"));
       // Then.onTheAppPage.iShouldSeePopOverItem("Show Application Dashboard");
        When.onTheAppPage.iPressPopoverItem({
            text: "Show Application Dashboard"
        });
        // When.onTheAppPage.iPressTheSayHelloWithDialogButton();
        // Then.onTheAppPage.iShouldSeeTheHelloDialog().and.iTeardownMyAppFrame();
    });
});

