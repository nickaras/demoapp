function BetLinesManager() {
    var me = this;

    this.lines = [];

    this.init = function () {
        var betLine,
                i;

        for (i = 0; i < CONFIG.betLines.length; i++) {
            betLine = new BetLine(i);
            betLine.init();
            me.lines.push(betLine);
        }
    };


    this.draw = function (ctx) {
        for (var i = 0; i < me.lines.length; i++) {
            me.lines[i].draw(ctx);
        }
    };
    this.update = function () {};

    this.onLigthAllBetLines = function () {
        for (var i = 0; i < me.lines.length; i++) {
            me.lines[i].show();
        }
    };

    this.onLightBetLine = function (betLineIndex) {
        me.lines[betLineIndex].show();
    };

    this.onHideBetLine = function (betLineIndex) {
        me.lines[betLineIndex].hide();
    };
    this.onHideAllBetLines = function () {
        for (var i = 0; i < me.lines.length; i++) {
            me.lines[i].hide();
        }
    };

    this.onMouseOverBetLine = function (betLineIndex) {
        me.lines[betLineIndex].show();
        me.lines[betLineIndex].canHide = false;
    };

    this.onMouseOutBetLine = function (betLineIndex) {
        me.lines[betLineIndex].canHide = true;
        me.lines[betLineIndex].hide();
        
    };



    observer.addListener('ligthBetLine', me.onLightBetLine); //Show bet line by bet line number
    observer.addListener('ligthAllBetLines', me.onLigthAllBetLines);

    observer.addListener('hideBetLine', me.onHideBetLine);
    observer.addListener('hideAllBetLines', me.onHideAllBetLines);

    observer.addListener('mouseOverBetLine', me.onMouseOverBetLine);
    observer.addListener('mouseOutBetLine', me.onMouseOutBetLine);
}