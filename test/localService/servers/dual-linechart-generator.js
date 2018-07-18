sap.ui.define(["sap/ui/base/Object"], function(Object){
    return  Object.extend("DualLineChartGenerator", {
        constructor: function(statisticsGenerator){
            this.statisticsGenerator = statisticsGenerator;
            this.weeklySelector = {
                startY: this.getLastWeekStart().day(-7).startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL),
                endY: this.getLastWeekStart().day(-1).startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL),
                startX: this.getLastWeekStart().startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL),
                endX: this.getLastWeekStart().day(6).startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL)
            }
        },
        generateWeekly: function(){
          
            var dailyAggregation = this.statisticsGenerator.aggregateData("YYYY-MM-DD");
            var DaysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
            var weeklySelector = this.weeklySelector;
           
            var r = dailyAggregation.reduce(function(acc, val){
                if(val.TIMESTAMP >= weeklySelector.startX && val.TIMESTAMP <= weeklySelector.endX){
                    acc.first.push(val);
                    var re = moment(val.TIMESTAMP).format('dddd').toUpperCase();
                    if(!acc.combined[re]){
                        acc.combined[re] = {};
                    }
                    acc.combined[re] = $.extend({}, acc.combined[re], val);
                }
                if(val.TIMESTAMP >= weeklySelector.startY && val.TIMESTAMP <= weeklySelector.endY){
                    acc.second.push(val);
                    var re = moment(val.TIMESTAMP).format('dddd').toUpperCase();
                    if(!acc.combined[re]){
                        acc.combined[re] = {};
                    }
                    var tr = {};
                    for(var index in val){
                        tr["last"+index] = val[index]
                    }
                    acc.combined[re] = $.extend({}, acc.combined[re],tr)  
                }
                return acc;
            }, {first: [], second: [], combined:[]})
            return Object.keys(r.combined);
        },
        generateMonthly: function(){

        },

        getLastWeekStart : function() {
            var today = moment();
            var daystoLastMonday = 0 - (1 - today.isoWeekday()) + 8;
            var lastMonday = today.subtract('days', daystoLastMonday);
            return lastMonday;
        },
    });
});