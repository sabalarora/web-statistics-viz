/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
/* global jQuery, sap */
jQuery.sap.declare("sap.apf.ui.representations.utils.paginationDisplayOptionHandler");
jQuery.sap.require("sap.apf.ui.representations.utils.displayOptionHandler");
(function() {
	"use strict";
	sap.apf.ui.representations.utils.PaginationDisplayOptionHandler = function() {
		sap.apf.ui.representations.utils.DisplayOptionHandler.apply(this);
		this.oKeyTextForProperties = {};
	};
	sap.apf.ui.representations.utils.PaginationDisplayOptionHandler.prototype = Object.create(sap.apf.ui.representations.utils.PaginationDisplayOptionHandler.prototype);
	sap.apf.ui.representations.utils.PaginationDisplayOptionHandler.prototype.constructor = sap.apf.ui.representations.utils.PaginationDisplayOptionHandler;
	/**
	 * @description creates a lookup for the filters in table and treetable. 
	 * These representations might not load all the data response at once, hence the lookup is created whenever the data response comes. 
	**/
	sap.apf.ui.representations.utils.PaginationDisplayOptionHandler.prototype.createDisplayValueLookupForPaginatedFilter = function(sPropertyKey, sDisplayTextForProperty) {
		this.oKeyTextForProperties[sPropertyKey] = sDisplayTextForProperty;
	};
	/**
	 * @param  sPropertyKey - filter property value 
	 * @param oRequiredFilteroptions - display option for filter
	 * @param sRequiredFilter - filter property 
	 * @param oFormatter - formatter instance
	 * @description based on the display option(key/text/keyAndText) it generates the display name which is used by selection pop up dialog to display the selected filters. 
	 * This is used for for table and treetable in case of the values, coming from pagination(table)/expansion(tree table).
	 * @returns sSelectionDisplayText -  filter display name.
	**/
	sap.apf.ui.representations.utils.PaginationDisplayOptionHandler.prototype.getDisplayNameForPaginatedFilter = function(sPropertyKey, oRequiredFilteroptions, sRequiredFilter, oFormatter) {
		var sSelectionDisplayText = sPropertyKey, oValueToBeFormatted;
		if (oRequiredFilteroptions && oRequiredFilteroptions.labelDisplayOption) {
			if (oRequiredFilteroptions.labelDisplayOption === sap.apf.core.constants.representationMetadata.labelDisplayOptions.KEY) {
				return sSelectionDisplayText;
			}
			if (oRequiredFilteroptions.labelDisplayOption === sap.apf.core.constants.representationMetadata.labelDisplayOptions.TEXT && this.oKeyTextForProperties[sPropertyKey]) {
				sSelectionDisplayText = this.oKeyTextForProperties[sPropertyKey];
			} else if (oRequiredFilteroptions.labelDisplayOption === sap.apf.core.constants.representationMetadata.labelDisplayOptions.KEY_AND_TEXT && this.oKeyTextForProperties[sPropertyKey]) {
				oValueToBeFormatted = {
					key : sPropertyKey,
					text : this.oKeyTextForProperties[sPropertyKey]
				};
				sSelectionDisplayText = oFormatter.getFormattedValueForTextProperty(sRequiredFilter, oValueToBeFormatted);
			}
		}
		return sSelectionDisplayText;
	};
}());