/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global"],function(q){"use strict";var C={};C.render=function(r,c){r.write("<div");r.writeControlData(c);r.writeClasses();r.write(">");if(c._bReadyToRender){r.renderControl(c.getLayout());}r.write("</div>");};return C;},true);
