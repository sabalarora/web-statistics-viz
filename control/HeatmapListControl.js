sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/StandardListItem",
    "../node_modules/dom-to-image/src/dom-to-image"
], function (Control, StandardListItem, dimage) {
    "use strict";
    return StandardListItem.extend("com.dla.webstat.control.HeatmapListControl", {
        metadata : {
            aggregations : {
            },
            properties : {

            },
            events : {

            }
        },
        init : function(){
            // this.setAggregation("_heatmap", new sap.ui.core.mvc.XMLView({
            //     viewName: "com.dla.webstat.view.statistics.Heatmap",
            //     id: "heatmap"
			// }));
        },
        renderer : function(oRM, oControl){
            debugger;
           
            domtoimage.toPng(document.getElementById("__grid0"))
                .then(function(dataUrl){
                    var img = new Image();
                    img.src = dataUrl;
                    document.body.appendChild(img);
                }
            ).catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
            // var img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);
            // sap.m.StandardListItemRenderer.render(oRM,oControl);
           
           // $(oControl.oParent.getContent()[0]).html("ewfkjnwijfnewnjifnwe");
            // oRM.write("<div");
            // // <mvc:XMLView viewName='com.dla.webstat.view.statistics.Heatmap' id='heatmap'/>
            // oRM.writeControlData(oControl);
            // oRM.addClass("myAppDemoWTProductRating");
            // oRM.writeClasses();
            // oRM.write(">");
            // oRM.renderControl(oControl.getAggregation("_heatmap")[0]);
            // oRM.write("</div>");
        }
    });
});