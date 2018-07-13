sap.ui.require([
    // "sap/ui/demo/walkthrough/model/formatter",
    // "sap/ui/model/resource/ResourceModel",
    "com/dla/webstat/controller/statistics-viz/app-statistics.bar.settings",
    "com/dla/webstat/controller/statistics-viz/Master.controller",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
], function(Settings, MasterController, sinon){
    "use strict";
    QUnit.module("Master Controller functions", {
        beforeEach: function(){
            this._oMasterController = new MasterController();
            this.actionItems = [
                {
                    type: 'action',
                    text: 'Show Application Dashboard',
                    route: {
                        url: "appdashboard"
                    }
                }
            ];
        },
        afterEach: function(){
            // this._oResourceModel.destroy();
        }
    });
    
    QUnit.test("._setPopOverActionItems Should return popover action items", function(assert){
        var actionItems = this._oMasterController._setPopOverActionItems(this.actionItems);
        var filteredItem = actionItems.filter(function(value){
            return (this === value.text && "action" === value.type);
        }, "Show Application Dashboard")[0];
        assert.ok( filteredItem, "Show Application Dashboard is present in action items" );
        assert.strictEqual( actionItems.length, 1, "The number of action item returned maches the number inputed" );
        var actionItems = this._oMasterController._setPopOverActionItems(null);
        assert.strictEqual( actionItems, null, "Action items should be null" );
        var actionItems = this._oMasterController._setPopOverActionItems({});
        assert.strictEqual( actionItems, null, "Action items should be null" );
    });
});