/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/XMLComposite','./library'],function(X,L){"use strict";var M=X.extend("sap.ui.mdc.XMLComposite",{defaultMetaModel:'sap.ui.mdc.metaModel',alias:"this","abstract":true});M.prototype.init=function(){this.setModel(L.getResourceModel(),"$i18n");};return M;},true);
