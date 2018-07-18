sap.ui.define([], function(Object){
    return  {
        HOURLY:{
            AGGREGATIONLEVEL: "h"
        },
        DAILY:{
            PATTERN: "YYYY-MM-DD",
            AGGREGATIONLEVEL: "d"
        },
        MONTHLY:{
            PATTERN: "YYYY-MM",
            AGGREGATIONLEVEL: "m"
        },
        QUARTERLY:{
            AGGREGATIONLEVEL: "q"
        }
    }
});