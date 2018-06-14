/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["./base/ObjectAdapter","./ODataBaseAdapter","./ODataFieldAdapter"],function(O,a,b){"use strict";var c=O.extend("sap.ui.mdc.experimental.provider.adapter.ODataObjectAdapter",{_schemaCache:{},aExpand:[],constructor:function(m,M,s,C){O.prototype.constructor.apply(this,[m,M,s,C,a]);}});c.prototype.collection=function(){return this.asPath("/"+this.oEntitySet.name);};c.prototype.keys=function(){var i,k=this["//"]["key"]["propertyRef"],K={};for(i=0;i<k.length;i++){K[k[i].name]=this.fields[k[i].name];}return K;};c.prototype.fields=function(){var i,f,F=this["//"]["property"],o={};for(i=0;i<F.length;i++){f=F[i];o[f.name]=new b(this.oModel,this.sModelName,this.sContextName,this.sMetaContext+"/property/"+i,true);o[f.name].oEntitySet=this.oEntitySet;}return o;};c.prototype.relations=function(){};return c;});
