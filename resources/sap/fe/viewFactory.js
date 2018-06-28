/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/json/JSONModel','sap/ui/core/mvc/View'],function(q,J,V){"use strict";function c(o,m){var M=m.getMetaModel(),d=new J(sap.ui.Device);d.setDefaultBindingMode("OneWay");return M.requestObject("/").then(function(){o.preprocessors=q.extend(o.preprocessors,{xml:{bindingContexts:{},models:{'sap.fe.metaModel':M,'sap.fe.deviceModel':d}}});o.type="XML";var a=sap.ui.view(o),i=new sap.ui.model.resource.ResourceModel({bundleName:"sap/fe/messagebundle",async:false});a.setModel(i,"sap.fe.i18n");return a;});}var v={create:c};return v;});
