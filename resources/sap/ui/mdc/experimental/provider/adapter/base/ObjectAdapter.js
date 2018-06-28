/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","./BaseAdapter"],function(q,B){"use strict";var O=B.extend("sap.ui.mdc.experimental.provider.model.ObjectAdapter",{constructor:function(m,M,s,c,a){var S=B;if(a){q.extend(S.prototype,a.prototype);S.prototype.constructor=B;}S.prototype.constructor.apply(this,arguments);this.putProperty("collection",this.collection);this.putProperty("keys",this.keys);this.putProperty("fields",this.fields);this.putProperty("relations",this.relations);},kind:function(){return'object';},collection:function(){throw new Error("ap.ui.mdc.experimental.provider.model.ObjectAdapter:  method collection must be redefined");},keys:function(){},fields:function(){throw new Error("ap.ui.mdc.experimental.provider.model.ObjectAdapter:  method fields must be redefined");},relations:function(){throw new Error("ap.ui.mdc.experimental.provider.model.ObjectAdapter:  method relations must be redefined");}});return O;});
