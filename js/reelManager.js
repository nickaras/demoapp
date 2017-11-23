function ReelManager() {
    var me = this;

    this.reels = CONFIG.reels;

    this.reelStopPositions = [];
    this.reelSpinCounter = 0;


    this.startReelSpin = function (reelIndex) {

        setTimeout(function () {
            observer.fireEvent('reelSpinStart', reelIndex);
            me.reelSpinCounter++;

        }, reelIndex * 100);


    };

    this.stopReelSpin = function (reelIndex) {

        observer.fireEvent('reelSpinStop', {reelIndex: reelIndex, stopPosition: me.reelStopPositions[reelIndex]});

    };

    this.onSpinButtonClick = function () {

        for (var i = 0; i < me.reels.length; i++) {
            me.startReelSpin(i);
        }
               

        observer.fireEvent('serverRequest', {action: 'spin'});
        
        
        observer.fireEvent('spinButtonEnable', false);

        setTimeout(function () {
            me.stopReelSpin(0);
        }, 3000);
    };

    this.allReelsStopped = function () {
        observer.fireEvent('allReelsStopped');
        observer.fireEvent('spinButtonEnable', true);
    };

    this.onReelSpinStopped = function (reelIndex) {
        me.reelSpinCounter--;

        if (me.reelSpinCounter == 0) {
            me.allReelsStopped();
        } else {
            me.stopReelSpin(reelIndex + 1);
        }
    };
    
    this.onServerResponse = function(response){
        //console.log(response);
        me.reelStopPositions = response.stopPositions;
        
    };


    observer.addListener('spinButtonClick', me.onSpinButtonClick);

    observer.addListener('reelSpinStopped', me.onReelSpinStopped);
    
    observer.addListener('serverResponse', me.onServerResponse);



}