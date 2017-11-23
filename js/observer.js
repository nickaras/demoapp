function Observer() {
    var me = this;
    this.storage = {};


    this.addListener = function (eventName, callBack) {

        if (me.storage[eventName] == undefined) {
            me.storage[eventName] = [];
        }
        me.storage[eventName].push(callBack);

    };

    this.fireEvent = function (eventName, params) {
        //console.error(eventName, params);
        if (me.storage[eventName] != undefined) {
            for (var i = 0; i < me.storage[eventName].length; i++) {
                me.storage[eventName][i](params);
            }
        }
    };

}

var observer = new Observer();





////Мой вариант
//function Observer() {
//    var me = this;
//    this.storage = [];
//
//
//    this.addListener = function (eventName, callBack) {
//
//        var eventObj = {};
//        eventObj.func = callBack;
//        eventObj.name = eventName;
//        me.storage.push(eventObj);
//
//        console.log(eventObj);
//        console.log(me.storage);
//
//    };
//
//
//    this.fireEvent = function (eventName, params) {
//        for (var i = 0; i < me.storage.length; i++) {
//            if (me.storage[i].name == eventName) {
//                me.storage[i].func(params);
//               
//            } 
//
//        }
//    };
//
//}