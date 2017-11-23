function KeyPad() {
    var me = this;

    this.ready = false;

    this.levelSelectorCONFIG = {x: 220, y: 608, width: 120, height: 30, defaultValue: 1, valueStep: 1,
        minValue: 1, maxValue: 10, title: 'level'};

    this.autoPlayButtonCONFIG = {x: 380, y: 590, width: 160, height: 60, title: 'AUTOPLAY', hideTitle: false};

    this.maxBetButtonCONFIG = {x: 580, y: 590, width: 160, height: 60, title: 'MAX BET', hideTitle: false};

    this.coinValueSelectorCONFIG = {x: 780, y: 608, width: 120, height: 30, defaultValue: 1, valueStep: 1,
        minValue: 1, maxValue: 10, title: 'coin value'};



    this.defaultBet = 20;
    this.bet = this.defaultBet;
    this.defaultCoins = 500000;
    this.coins = this.defaultCoins;
    this.timeToShowBetLines = 1500;
    this.betLineShowingTimerId = null;


    this.init = function () {
        this.levelSelector = new ValueSelector(me.levelSelectorCONFIG);
        this.coinValueSelector = new ValueSelector(me.coinValueSelectorCONFIG);
        this.maxBetButton = new GeneralButton(me.maxBetButtonCONFIG);
        this.autoPlayButton = new GeneralButton(me.autoPlayButtonCONFIG);
        this.field1 = new this.InfoField({x: 25, y: 590, title: 'BET', value: me.bet});
        this.field2 = new this.InfoField({x: 25, y: 623, title: 'COINS', value: me.coins});

        me.maxBetButton.onclick = me.onMaxBetButtonClick;
    };

    this.onMaxBetButtonClick = function () {
        if (me.levelSelector.isMaxValue()) {
            observer.fireEvent('hideAllBetLines');
            me.startNewRound();

            if (me.betLineShowingTimerId) {
                clearTimeout(me.betLineShowingTimerId);
            }

        } else {
            me.levelSelector.setMaxValue();
            observer.fireEvent('ligthAllBetLines');
            me.betLineShowingTimerId = setTimeout(function () {
                observer.fireEvent('hideAllBetLines');
            }, me.timeToShowBetLines);
        }
    };


    this.startNewRound = function () {
        observer.fireEvent('spinButtonClick');
    };



    this.onImagesLoaded = function (images) {

        me.init();
        me.maxBetButton.init({
            up: images.rect_button_active,
            down: images.rect_button_down,
            disabled: images.rect_button_disabled
        });
        me.autoPlayButton.init({
            up: images.rect_button_active,
            down: images.rect_button_down,
            disabled: images.rect_button_disabled
        });

        me.ready = true;
    };

    this.draw = function (ctx) {
        if (me.ready) {
            ctx.save();
            me.field1.draw(ctx);
            me.field2.draw(ctx);
            me.levelSelector.draw(ctx);
            me.coinValueSelector.draw(ctx);
            me.maxBetButton.draw(ctx);
            me.autoPlayButton.draw(ctx);


            ctx.restore();
        }
    };


    this.InfoField = function (InfoFieldParams) {
        var meInfoField = this;
        this.width = 180;
        this.height = 30;
        this.x = InfoFieldParams.x;
        this.y = InfoFieldParams.y;
        this.infoFieldTitle = InfoFieldParams.title;
        this.infoFieldValue = InfoFieldParams.value;

        this.drawField = function (ctx) {
            ctx.save();

            ctx.globalAlpha = 0.6;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(meInfoField.x, meInfoField.y, meInfoField.width, meInfoField.height);
            ctx.restore();
        };

        this.drawValues = function (ctx) {

            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.font = meInfoField.height * 0.6 + "px Arial";
            ctx.textAlign = "start";
            ctx.textBaseline = "middle";
            ctx.fillText(meInfoField.infoFieldTitle, meInfoField.x + 3, meInfoField.y + meInfoField.height / 2);
            ctx.textAlign = "end";
            ctx.fillText(meInfoField.infoFieldValue, meInfoField.x + meInfoField.width - 3, meInfoField.y + meInfoField.height / 2);
            ctx.restore();
        };

        this.draw = function (ctx) {
            meInfoField.drawField(ctx);
            meInfoField.drawValues(ctx);
        };
    };
    //this.infoFieldCONFIG = {x: 25, y: 590, width: 180, height: 30};





    this.update = function () {
        if (me.ready) {
            me.field1.infoFieldValue = me.defaultBet * me.levelSelector.value;
            me.field2.infoFieldValue = Math.round(me.defaultCoins / me.coinValueSelector.value);
        }
    };

    this.onSpinButtonClick = function () {
        me.maxBetButton.disable();
    };
    this.onAllReelsStopped = function () {
        me.maxBetButton.enable();
    };



    observer.addListener('imagesLoaded', me.onImagesLoaded);

    observer.addListener('spinButtonClick', me.onSpinButtonClick);
    observer.addListener('allReelsStopped', me.onAllReelsStopped);
}

