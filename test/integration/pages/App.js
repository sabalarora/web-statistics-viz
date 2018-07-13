sap.ui.require([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press",
	"sap/m/Popover",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/AggregationContainsPropertyEqual"
],
function (Opa5, PropertyStrictEquals, Press, Popover, Properties, AggregationContainsPropertyEqual) {
	"use strict";
	Opa5.createPageObjects({
		onTheAppPage: {
			actions: {
				iPressPopoverItem: function(popoverItem){
					return this.waitFor({
						viewName: "statistics-viz/appStatisticsViz",
					
						actions: function (oSelect) {
							debugger;
							
						},
						success: function(pp){
							debugger;
						},
						//sap.m.ActionListItem
						// matchers : [
						
						// 	new sap.ui.test.matchers.Properties({ text: "Show Application Dashboard"})
						// ],
						// actions: new Press(),
						errorMessage: "The Technocom check box was not found and could not be selected"
					});
				}
			},
			assertions: {
				iShouldSeePopOverItem: function(vizFramePopoverItem){
					return this.waitFor({
						id: "__popover2-vizChartPopover-popover",
						controlType: "sap.m.Popover",
						autoWait: false,
						success: function (popover) {
							var result = popover.mAggregations.content[1].getItems().filter(function(value){
								return value.mProperties.text === vizFramePopoverItem;
							});
							Opa5.assert.ok(result.length > 0, "Show Application Dashboard item was shown");
						},
						errorMessage: "Did not find Show Application Dashboard Item on the vizchart popover"
					});
				}
			}
		}
	});
});