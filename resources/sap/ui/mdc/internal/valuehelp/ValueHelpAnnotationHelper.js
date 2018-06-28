/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/mdc/library"],function(L){"use strict";jQuery.sap.declare("sap.ui.mdc.internal.valuehelp.ValueHelpAnnotationHelper");sap.ui.mdc.internal.valuehelp.ValueHelpAnnotationHelper={getCollectionEntitySet:function(v){var V=v.getObject();return V.$model.getMetaModel().createBindingContext("/"+V.CollectionPath);},getValueListProperty:function(p){var v=p.getModel();var V=v.getObject("/");return V.$model.getMetaModel().createBindingContext('/'+V.CollectionPath+'/'+p.getObject());},formatIconTabFilterText:function(i,c){return L.getText(i);},formatSelectedItemTitle:function(s,c){if(c&&c.conditions&&c.conditions.length!==0){var C=c.conditions.filter(function(o){return o.isEmpty!==true;});return L.getText(s,[C.length]);}else{return L.getText(s,[0]);}},formatedTokenText:function(f,c){var r="";if(c){var C=this.getModel("cm");var o=C.getFilterOperatorConfig().getOperator(c.operator);r=o.format(c.values,c,f);}return r;}};});
