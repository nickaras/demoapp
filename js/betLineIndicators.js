function BetLineIndicators() {
    var me = this;
    this.width = 45;
    this.height = 45;
    this.indicators = [];

    this.init = function () {};

    this.onImagesLoaded = function (images) {
        var indicator,
                i;
        for (i = 0; i < CONFIG.betLines.length; i++) {
            indicator = new GeneralButton({
                x: CONFIG.betIndicators[i].x,
                y: CONFIG.betIndicators[i].y,
                width: me.width,
                height: me.height,
                title: i + 1,
                type: 'circle'
            });
            indicator.init({
                up: images.bet_indicator_normal,
                down: images.bet_indicator_active,
                hover: images.bet_indicator_active,
                fontColor: '#000000',
                hideTitle: true
            });

            indicator.betLineNumber = i;

            indicator.onMouseOverCallback = function () {
                this.hideTitle = false;
                if(!this.hideTitle){
                observer.fireEvent('mouseOverBetLine', this.betLineNumber);}
                
            };
            indicator.onMouseOutCallback = function () {
                this.hideTitle = true;
                if (this.hideTitle) {
                    observer.fireEvent('mouseOutBetLine', this.betLineNumber);
                }
                
            };

            me.indicators.push(indicator);
        }
    };

    this.draw = function (ctx) {
        for (var i = 0; i < me.indicators.length; i++) {
            me.indicators[i].draw(ctx);
        }
    };



    this.update = function () {};

    me.hideTitle = false;


    observer.addListener('imagesLoaded', me.onImagesLoaded);
}