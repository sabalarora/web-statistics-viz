/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/fe/core/TemplateAssembler","sap/fe/templates/ObjectPage/controller/ControllerImplementation"],function(q,T,C){"use strict";function g(c){var v={};return{oControllerSpecification:{getMethods:C.getMethods.bind(null,v),oControllerDefinition:{}},init:function(){},preTemplater:function(p,t){return[];}};}return T.getTemplateComponent(g,"sap.fe.templates.ObjectPage",{metadata:{properties:{"templateName":{"type":"string","defaultValue":"sap.fe.templates.ObjectPage.view.ObjectPage"}},"manifest":"json"}});});
