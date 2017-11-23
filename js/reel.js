function Reel(reelIndex) {
    var me = this;

    this.startPosition = 0;
    this.stopPosition = 0;
    this.stopPosInPX = 0;
    this.currentPosition = 0;
    this.reelIndex = reelIndex;

    this.extraSymbols = 4;

    this.spinState = 'stopped';
    this.spinSpeed = 0;
    this.restartSpeed = 40;

    this.createVirtualCanvas = function (width, height) {
        var virtualCanvas = document.createElement('canvas'),
                virtualCTX;
        virtualCanvas.width = width;
        virtualCanvas.height = height;

        virtualCTX = virtualCanvas.getContext('2d');

        this.virtualCanvas = virtualCanvas;
        this.virtualCTX = virtualCTX;

        //document.body.appendChild(virtualCanvas);
    };

    this.reelStucture = CONFIG.reels[reelIndex].structure;

    this.init = function (ctx) {
        var width = CONFIG.symbol.width,
                height = CONFIG.symbol.height * (this.reelStucture.length + this.extraSymbols);

        this.createVirtualCanvas(width, height);

        this.startPosition = -CONFIG.symbol.height * this.reelStucture.length + CONFIG.reels[reelIndex].y;
        this.currentPosition = this.startPosition;
    };

    this.drawReel = function (ctx) {
        for (var i = 0; i < me.reelStucture.length; i++) {
            var symbol = me.reelStucture[i];
            var img = me.images[symbol];
            me.drawSymbol(img, ctx, i);
        }
    };

    this.drawSymbol = function (img, ctx, i) {
        ctx.drawImage(img, 0, i * img.height);
        if (i < me.extraSymbols) {
            ctx.drawImage(img, 0, (i + me.reelStucture.length) * img.height);
        }
    };

    this.draw = function (ctx) {
        ctx.drawImage(me.virtualCanvas, CONFIG.reels[reelIndex].x, me.currentPosition);
    };

    this.isStopped = function () {
        return me.spinState == 'stopped';
    };

    this.isSpinning = function () {
        return me.spinState == 'spinning';
    };

    this.isStopping = function () {
        return me.spinState == 'stopping';
    };


    this.update = function () {
        if (me.isStopped()) {
            return true;
        }

        if (me.isSpinning()) {
            me.spinSpeed = me.restartSpeed;
            me.currentPosition += me.spinSpeed;
            //setTimeout(observer.fireEvent('stopSpin',{reelIndex: me.reelIndex, stopSymbol:4}), me.reelIndex*1000+1000);
        }



        if (me.isStopping()) {


            if (me.stopPosInPX >= me.currentPosition && me.stopPosInPX - me.currentPosition < me.spinSpeed) {
                me.currentPosition = me.stopPosInPX;
                me.spinState = 'stopped';

                observer.fireEvent('reelSpinStopped', me.reelIndex);
                
                return true;

            } else {
                me.currentPosition += me.spinSpeed;
            }


        }



        if (me.currentPosition > 0) {
            me.currentPosition = me.startPosition + me.currentPosition;
        }
    };



    observer.addListener('imagesLoaded', function (loadedImages) {
        me.images = loadedImages;

        me.drawReel(me.virtualCTX);
        console.log('Reel inited');
    });

    observer.addListener('reelSpinStart', function (reelIndex) {
        if (me.reelIndex == reelIndex) {
            me.spinState = 'spinning';
        }

    });

    observer.addListener('reelSpinStop', function (params) {
        //observer.fireEvent('stopSpin',{reelIndex:0, stopSymbol:4})
        if (params.reelIndex == me.reelIndex) {
            me.spinState = 'stopping';
            me.stopPosition = params.stopPosition;
            me.stopPosInPX = -me.stopPosition * CONFIG.symbol.height + CONFIG.reels[reelIndex].y;
        }

    });
}

