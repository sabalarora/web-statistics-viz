/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
(function(){"use strict";jQuery.sap.declare("sap.ui.mdc.internal.common.Helper");sap.ui.mdc.internal.common.Helper={isSemanticKey:function(c,v){var e=c.getPath().split('/')[1];var s=c.getModel().getObject("/"+e+"/@com.sap.vocabularies.Common.v1.SemanticKey");if(s){for(var i=0;i<s.length;i++){if(s[i].$PropertyPath===v.$Path){return true;}}}return false;},replaceSpecialCharsInId:function(i){if(i.indexOf(" ")>=0){jQuery.sap.log.error("Annotation Helper: Spaces are not allowed in ID parts. Please check the annotations, probably something is wrong there.");}return i.replace(/@/g,"").replace(/\//g,"::").replace(/#/g,"::");},_getEntitySetPath:function(m,p){var l;var e=p.slice(0,p.indexOf("/",1));if(m.getObject(e+"/$kind")==="EntityContainer"){l=e.length+1;e=p.slice(l,p.indexOf("/",l));}return e;}};sap.ui.mdc.internal.common.Helper.isSemanticKey.requiresIContext=true;})();
