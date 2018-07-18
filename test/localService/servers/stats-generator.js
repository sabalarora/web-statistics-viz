sap.ui.define([
    "sap/ui/base/Object",
   "../../../node_modules/moment/moment",
   "./statistics-generator-constants"
], function(Object, DATE_SELECTOR){
    return Object.extend("StatisticsGenerator", {
        constructor: function() {
            this._constants = {
                aggregationLevel: {
                    "YYYY-MM-DD": "d",
                    "YYYY-MM": "m"
                }
            }
        },
        init: function(generateCallback){
            return this.generateData(generateCallback);
        },
        aggregateData: function(TIMESTAMP_PATTERN){
            var lastTimeStamp = null;
            var constants = this._constants.aggregationLevel;
            return this._dataObj.reduce(function(acc, val, idx){
                var x = moment(lastTimeStamp).format(TIMESTAMP_PATTERN);
                var y = moment(val.TIMESTAMP).format(TIMESTAMP_PATTERN);
                if(x == y){
                    acc.VISITS += val.VISITS;
                    acc.IMPRESSIONS += val.IMPRESSIONS;
                } else{
                    acc.push($.extend({}, val, {
                        AGGREGATIONLEVEL: constants[TIMESTAMP_PATTERN],
                        VISITS: acc.VISITS,
                        IMPRESSIONS: acc.IMPRESSIONS
                    }));
                    acc.VISITS = 0;
                    acc.IMPRESSIONS = 0;
                }
                lastTimeStamp = val.TIMESTAMP;
                return acc;
            }, []);
        },
        generateData: function(generateDataCallback){
            this._dataObj = [];
            [2018].forEach(function(year){
                for(var d = 0; d <= 365; d++){
                    for(var h = 0; h <= 23; h++){
                        var timeStamp = moment([year]).zone("-04:00")
                        .set('day', d)
                        .set("hour", h)
                        .format(moment.HTML5_FMT.DATETIME_LOCAL);
                        var obj = {
                            TIMESTAMP: timeStamp
                        }
                        if(generateDataCallback){
                            var newData = generateDataCallback(obj);
                            obj = $.extend({}, obj, newData);
                        }
                        this._dataObj.push(obj);
                    }
                }
            }, this);
            return this._dataObj;
        }
    });
});