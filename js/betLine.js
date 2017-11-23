function BetLine(betLineIndex) {
    var me = this;

    this.index = betLineIndex;
    this.lineHeight = CONFIG.betLines[me.index].height;

    this.x = CONFIG.betLines[me.index].x;
    this.y = CONFIG.betLines[me.index].y;

    this.drawToX = CONFIG.betLines[me.index].drawToX;
    this.drawToY = CONFIG.betLines[me.index].drawToY;

    this.visible = false;
    this.canHide = true;

    this.init = function () {};

    this.show = function () {
        me.visible = true;
    };
    this.hide = function () {
        if (me.canHide) {
            me.visible = false;
        }
    };

    this.onclick = function () {};

    this.update = function () { };

    this.draw = function (ctx) {

        if (me.visible) {
            ctx.save();

            ctx.beginPath();
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = me.lineHeight;

            ctx.moveTo(me.x, me.y);
            ctx.lineTo(me.drawToX, me.drawToY);
            ctx.stroke();
            ctx.restore();
        }
    };
}

