/*global jQuery, sap, window */
// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
/**
 * @fileOverview The Search adapter for the ABAP platform.
 *
 * @version 1.52.7
 */
sap.ui.define([
    'sap/ushell/renderers/fiori2/search/SearchConfiguration',
    'sap/ushell/renderers/fiori2/search/esh/api/release/sina'
], function(SearchConfiguration) {
    "use strict";

    /**
     *
     * @param oSystem
     * @returns {sap.ushell_abap.adapters.abap.SearchAdapter}
     * @private
     */
    sap.ushell_abap.adapters.abap.SearchAdapter = function (oSystem) {

        //@deprecated
        if (!this.isSearchRegistered) {
            var config = new SearchConfiguration.getInstance();
            this.sina = config.getSina();
            this.isSearchRegistered = true;
        }

        //@deprecated
        this.getSina = function () {
            return this.sina;
        };
    };
    return sap.ushell_abap.adapters.abap.SearchAdapter;
});
