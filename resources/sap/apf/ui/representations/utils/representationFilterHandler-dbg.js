/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
/* global jQuery, sap */
jQuery.sap.declare("sap.apf.ui.representations.utils.representationFilterHandler");
jQuery.sap.require("sap.apf.ui.representations.utils.displayOptionHandler");
(function() {
	'use strict';
	//discard the filter values which are not available in dataset
	function _getValidatedFiltersFromDataset(aModifiedDataResponse, aFilterValues, sRequiredFilter) {
		var aValidatedFilterValues = [];
		var aAvailableFiltersInData = aModifiedDataResponse.map(function(oDataRow) {
			return oDataRow[sRequiredFilter];
		});
		aValidatedFilterValues = aFilterValues.filter(function(sFilterValue) {
			return aAvailableFiltersInData.indexOf(sFilterValue) !== -1;
		});
		return aValidatedFilterValues;
	}
	function _getUniqueFilters(aFilterValues) {
		return aFilterValues.filter(function(item, nIndex, aFilterArray) {
			return aFilterArray.indexOf(item) === nIndex;
		});
	}
	function _createLookupForFilters(oRepresentationFilterHandlerInstance, oMetadata, aModifiedDataResponse) {
		var nIndex, sSelectedFilterDisplayName;
		var sLabelDisplayOption = oRepresentationFilterHandlerInstance.oParameter.requiredFilterOptions ? oRepresentationFilterHandlerInstance.oParameter.requiredFilterOptions.labelDisplayOption : undefined;
		var sRequiredFilterColumnName = oRepresentationFilterHandlerInstance.oDisplayOptionHandler.getColumnNameBasedOnDisplayOption(oRepresentationFilterHandlerInstance.oParameter.requiredFilters[0], sLabelDisplayOption, oMetadata);
		oRepresentationFilterHandlerInstance.filterValues.forEach(function(sFilterValue) {
			for(nIndex = 0; nIndex < aModifiedDataResponse.length; nIndex++) {
				if (aModifiedDataResponse[nIndex][oRepresentationFilterHandlerInstance.oParameter.requiredFilters[0]] === sFilterValue) {
					sSelectedFilterDisplayName = aModifiedDataResponse[nIndex][sRequiredFilterColumnName];
					break;
				}
			}
			oRepresentationFilterHandlerInstance.filterValueLookup[sFilterValue] = sSelectedFilterDisplayName;
		});
	}
	sap.apf.ui.representations.utils.RepresentationFilterHandler = function(oApi, oParameter, oTimeAxisDateConverter) {
		this.oApi = oApi;
		this.filterValues = [];
		this.oParameter = oParameter;
		this.sRequiredFilter = this.oParameter.requiredFilters[0];
		this.oDisplayOptionHandler = new sap.apf.ui.representations.utils.DisplayOptionHandler();
		this.filterValueLookup = {};
		this.oTimeAxisDateConverter = oTimeAxisDateConverter;
	};
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.constructor = sap.apf.ui.representations.utils.RepresentationFilterHandler;
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.setMetadata = function(oMetadata) {
		this.oMetadata = oMetadata;
	};
	/**
	* @param aNewFilter - filter values in case of alternate representation or table
	* @description creates core filter based on the values selected 
	* @returns core filter
	**/
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.createFilterFromSelectedValues = function(aNewFilter) {
		var oFilterHandlerInstance = this, bIsConversionRequired = false, sValue;
		var aFilterValues = this.filterValues;
		var oFilter = this.oApi.createFilter();
		if (aNewFilter && aNewFilter.length > 0) {
			aFilterValues = _getUniqueFilters(aNewFilter.concat(aFilterValues));
		}
		var oAddedOrCondition = oFilter.getTopAnd().addOr('exprssionOr');
		var EQ = oFilter.getOperators().EQ;
		bIsConversionRequired = oFilterHandlerInstance.oTimeAxisDateConverter.bIsConversionToDateRequired(this.oParameter.requiredFilters[0], this.oMetadata);
		aFilterValues.forEach(function(requiredFilter) {
			if (bIsConversionRequired) {
				sValue = oFilterHandlerInstance.oTimeAxisDateConverter.getConvertedDateLookUp()[requiredFilter] || requiredFilter;
			} else {
				sValue = requiredFilter;
			}
			var oFilterExpression = {
				id : requiredFilter,
				name : oFilterHandlerInstance.sRequiredFilter,
				operator : EQ,
				value : sValue
			};
			oAddedOrCondition.addExpression(oFilterExpression);
		});
		return oFilter;
	};
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.updateFilterFromSelection = function(aFilterValue) {
		var aUniqueFilterValues = _getUniqueFilters(aFilterValue);
		this.filterValues = aUniqueFilterValues.slice(0);
	};
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.clearFilters = function() {
		this.filterValues = [];
	};
	/**
	* @param oMetadata - meta data of a chart
	* @param aModifiedDataResponse - the data response of a chart
	* @description  creates array of objects of filter values with id and text based on display options(key/text/keyAndText) to be displayed
	* @returns array of filter values to display values in selection popup
	**/
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.getDisplayInfoForFilters = function(oMetadata, aModifiedDataResponse) {
		var aFilterValues = [], oRepresentationFilterHandlerInstance = this;
		var sRequiredFilter = oRepresentationFilterHandlerInstance.oParameter.requiredFilters[0];
		this.filterValues = _getValidatedFiltersFromDataset(aModifiedDataResponse, oRepresentationFilterHandlerInstance.filterValues, sRequiredFilter);
		_createLookupForFilters(oRepresentationFilterHandlerInstance, oMetadata, aModifiedDataResponse);
		oRepresentationFilterHandlerInstance.filterValues.forEach(function(filterValue) {
			var oFilterValue = {
				id : filterValue,
				text : oRepresentationFilterHandlerInstance.filterValueLookup[filterValue]
			};
			aFilterValues.push(oFilterValue);
		});
		return aFilterValues;
	};
	/**
	* @returns array of raw filter values which is used to set the selection on representations 
	**/
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.getFilterValues = function() {
		return this.filterValues;
	};
	sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.getIfSelectedFilterChanged = function(aNewFilters) {
		var bIsFilterSameAsPrevious = (jQuery(this.filterValues).not(aNewFilters).length === 0) && (jQuery(aNewFilters).not(this.filterValues).length === 0);
		return !bIsFilterSameAsPrevious;
	};
}());
