function WinAnimation() {
    var me = this;
    this.winType = '';
    this.winAmount = 0;
    this.readyToAnimate = false;
    this.textSize = 60;


    this.onServerResponse = function (responseData) {
        me.winType = responseData.winType;
        me.maxValue = responseData.winAmount;
        console.log(me.winType);
        console.log(me.winAmount);

    };

    this.playAnimation = function () {
        if (me.maxValue > 0) {
            me.readyToAnimate = true;
            console.log('YOU EARNED SMALL WIN');
        }



    };


    this.draw = function (ctx) {
        if (me.readyToAnimate) {



            ctx.save();
            ctx.fillStyle = "#000000";
            ctx.globalAlpha = 0.7;
            ctx.fillRect(70, 115, 717, 300);
            ctx.restore();

            me.drawWinTypeText(ctx);

            ctx.save();
            ctx.fillStyle = '#ffffff';
            //ctx.textAlign = 'left';
            ctx.textBaseline = "middle";
            ctx.font = me.textSize + "px Arial";
            ctx.fillText('WIN: ', 310, 270);
            ctx.fillStyle = 'yellow';
            ctx.fillText(me.winAmount, 470, 270);

            ctx.restore();
        }
    };

    this.drawWinTypeText = function (ctx) {
        ctx.save();

        var text;

        switch (me.winType) {
            case 'smallWin':
                text = 'SMALL WIN';
                ctx.fillStyle = '#FF9900';
                break;
            case 'mediumWin':
                text = 'MEDIUM WIN';
                ctx.fillStyle = '#3300FF';
                break;
            case 'bigWin':
                text = 'BIG WIN';
                ctx.fillStyle = '#33CC00';
                break;
            case 'megaWin':
                text = 'MEGA WIN';
                ctx.fillStyle = '#CC3333';
                break;
            case 'superMegaWin':
                text = 'SUPER MEGA WIN';
                ctx.fillStyle = '#FF0000';
                break;
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = "middle";
        ctx.strokeStyle = '#ffffff';
        ctx.font = "bold " + me.textSize + "px Arial";
        ctx.fillText(text, 430, 180);
        ctx.strokeText(text, 430, 180);

        ctx.restore();

    };

    this.update = function () {
        if (me.readyToAnimate) {
            me.winAmount += 1;
            if (me.winAmount >= me.maxValue) {
                me.winAmount = me.maxValue;
                setTimeout(function () {
                    me.readyToAnimate = false;
                }, 4000);
            }
        } else {
            me.winAmount = 0;
        }
        ;

    };

    observer.addListener('serverResponse', me.onServerResponse);
    observer.addListener('allReelsStopped', me.playAnimation);
    observer.addListener('spinButtonClick', function () {
        me.readyToAnimate = false;
    });


}