sap.ui.define([
    "sap/ui/base/Object",
   "../../../node_modules/moment/moment",
   "./statistics-generator-constants"
], function(Object, DATE_SELECTOR){
    return Object.extend("StatisticsGenerator", {
        getWeeklyObject : function(){
            return {
                start: this.getLastWeekStart().day(-7).startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL),
                end: this.getLastWeekStart().day(6).startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL),
                mid: this.getLastWeekStart().startOf('day').format(moment.HTML5_FMT.DATETIME_LOCAL)
            }
        },
        getWeeklyData: function(data){
            var weeklyObject = this.getWeeklyObject();
          
            return data.reduce(function(acc, val){
                if(val.TIMESTAMP >= weeklyObject.start && val.TIMESTAMP <= weeklyObject.mid){
                    
                    acc.first.push(val);
                    var r = moment(val.TIMESTAMP).day();
            
                    if(!acc.combined[r]){
                        acc.combined[r] = {};
                    }
                    acc.combined[r]["lastvisits"] = val.VISITS;
                    acc.combined[r]["TIMESTAMPLAST"] = val.TIMESTAMP;
                    //acc.combined[r]["DAY"] = moment().isoWeekday(r);
           
                }
                if(val.TIMESTAMP >= weeklyObject.mid && val.TIMESTAMP <= weeklyObject.end){
                    acc.second.push(val);
                    var r = moment(val.TIMESTAMP).day();
                    if(!acc.combined[r]){
                        acc.combined[r] = {};
                    }
                    acc.combined[r]["visits"] = val.VISITS;
                    acc.combined[r]["TIMESTAMP"] = val.TIMESTAMP;
                }
                return acc;
                },{first: [], second: [], combined: []}).combined;
        },
         dailyData :function(hourlyData, TIMESTAMP_PATTERN){
            var lastTimeStamp = null;
           
            return hourlyData.reduce(function(acc, val){
                var x = moment(lastTimeStamp).format(TIMESTAMP_PATTERN.PATTERN);
                var y = moment(val.TIMESTAMP).format(TIMESTAMP_PATTERN.PATTERN);
                if(x == y){
                    acc.VISITS += val.VISITS;
                    acc.IMPRESSIONS += val.IMPRESSIONS;
                } else{
                    acc.push($.extend({}, val, {
                        AGGREGATIONLEVEL: TIMESTAMP_PATTERN.AGGREGATIONLEVEL,
                        VISITS: acc.VISITS,
                        IMPRESSIONS: acc.IMPRESSIONS
                    }));
                    acc.VISITS = 0;
                    acc.IMPRESSIONS = 0;
                }
                lastTimeStamp = val.TIMESTAMP;
                return acc;
            },[]);
        },
        constructor: function() {
            var webpages = [
                "/index.html",
                "batch/index.html",
                "pentrist/index.html",
                "hotmail/index.html",
                "google/index.html"
            ];
            this.__HOURLY_DATA__ = this._generateData(function(object){
                var newData = {
                    AGGREGATIONLEVEL: "h",
                    COUNTER: null,
                    PCDURL: null,
                    OBJECTTYPE: "iView",
                    IMPRESSIONS: Math.floor(Math.random() * 50) + 0,
                    VISITS: Math.floor(Math.random() * 10),
                    CUSTOM: webpages[Math.floor(Math.random() * webpages.length) + 0],
                    ID: null
                };
                return $.extend({}, object, newData);
            });
           
            debugger;
            var daily = this.dailyData(this.__HOURLY_DATA__, DATE_SELECTOR.DAILY);
            var monthly = this.dailyData(this.__HOURLY_DATA__, DATE_SELECTOR.MONTHLY);
            //var yy = this.getWeeklyData(daily);
          
        },
        getWeekly: function(){
            var daily = this.dailyData(this.__HOURLY_DATA__, DATE_SELECTOR.DAILY);
           debugger;
            return this.getWeeklyData(daily);
        },
        getDaily: function(){
            return this.__DAILY_DATA__;
        },
        getHourly: function(){
            return this.__HOURLY_DATA__;
        },
       
        getLastWeekStart : function() {
            var today = moment();
            var daystoLastMonday = 0 - (1 - today.isoWeekday()) + 8;
            var lastMonday = today.subtract('days', daystoLastMonday);``
            return lastMonday;
        },
        _generateData: function(callback){
            var _dataObj = [];
            [2018].forEach(function(year){
                for(var d = 0; d <= 365; d++){
                    for(var h = 0; h <= 23; h++){
                        var timeStamp = moment([year]).zone("-04:00")
                        .set('day', d)
                        .set("hour", h)
                        .format(moment.HTML5_FMT.DATETIME_LOCAL);
                        var obj = this._getDefaultObject(timeStamp);
                        if(callback){
                            obj = callback(obj);
                        }
                        _dataObj.push(obj);
                    }
                }
            }, this);
            return _dataObj;
        },
        _getDefaultObject: function(timestamp){
            return {
                TIMESTAMP: timestamp || null
            }; 
        }
    });
});