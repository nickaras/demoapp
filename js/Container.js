function Container(_params) {
    var me = this;
    this.x = _params.x;
    this.y = _params.y;
    this.alpha = _params.alpha;

    this.children = [];
    this.addChild = function (child) {
        me.children.push(child);
    };


    this.draw = function (ctx) {
       
            ctx.save();
            ctx.translate(me.x, me.y);

            ctx.rotate(me.angle * 3.14 / 180);
            ctx.globalAlpha = me.alpha;
            for (var i = 0; i < me.children.length; i++) {
                me.children[i].draw(ctx);
            }

            ctx.restore();
            };
    this.update = function () {};
    this.detectHitArea = function () {};
    
    }
