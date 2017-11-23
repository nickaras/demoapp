function WinManager(reelsConfig) {
    var me = this;

    this.lastResponse = {};

    this.reels = reelsConfig.reels;
    this.stopPosition_1 = 0;
    this.stopPosition_2 = 0;
    this.stopPosition_3 = 0;

    this.reel1 = me.reels[0].structure;
    this.reel2 = me.reels[1].structure;
    this.reel3 = me.reels[2].structure;

//    this.checkLines = function () {
//        if ((me.reel1[me.stopPosition_1] === me.reel2[me.stopPosition_2])
//                && (me.reel1[me.stopPosition_1] === me.reel3[me.stopPosition_3])) {
//
//            observer.fireEvent('ligthBetLine', 0);
//        }
//
//        // LINE 2   ---- костыль на определении позиции "+1"
//        if (me.reel1[me.stopPosition_1 + 1] === me.reel2[me.stopPosition_2 + 1]
//                && me.reel1[me.stopPosition_1 + 1] === me.reel3[me.stopPosition_3 + 1]) {
//            observer.fireEvent('ligthBetLine', 1);
//        }
//        // LINE 3   ---- костыль на определении позиции "+2"
//        if (me.reel1[me.stopPosition_1 + 2] === me.reel2[me.stopPosition_2 + 2]
//                && me.reel1[me.stopPosition_1 + 2] === me.reel3[me.stopPosition_3 + 2]) {
//            observer.fireEvent('ligthBetLine', 2);
//        }
//
//    };

    this.onAllReelsStopped = function () {
        for (var i = 0; i < me.lastResponse.betLines.length; i++) {
            observer.fireEvent('ligthBetLine', me.lastResponse.betLines[i]);
        }
        setTimeout(function(){
            observer.fireEvent('hideAllBetLines');
        },1500);

    };


    observer.addListener('serverResponse', function (responseData) {
        me.stopPosition_1 = responseData.stopPositions[0];
        me.stopPosition_2 = responseData.stopPositions[1];
        me.stopPosition_3 = responseData.stopPositions[2];

        me.lastResponse = responseData;

    });

    observer.addListener('allReelsStopped', me.onAllReelsStopped);


}