function Sprite(_params, image) {
    var me = this;
    this.x = _params.x;
    this.y = _params.y;
    this.height = _params.height;
    this.width = _params.width;
    this.angle = _params.angle ? _params.angle : 0;
    this.alpha = _params.alpha;
    this.ready = false;
    this.anchor = _params.anchor;




    this.detectHitArea = function () {};

    this.onImagesLoaded = function (images) {
        me.image = image ? images[image] : 'rectangle'; /// Если не приходит картинка, рисуем прямоугольник
        //me.image =  images[image];
        //console.log(me.image);

        me.ready = true;
    };

    this.draw = function (ctx) {
        if (me.ready) {

            if (typeof(me.image)=='object') {
                
                ctx.save();
                //ctx.globalAlpha = ctx.globalAlpha * me.alpha;
                ctx.drawImage(me.image, me.x, me.y);
                ctx.restore();
            }
            if (me.image == 'rectangle') {
                ctx.save();
                //ctx.globalAlpha = ctx.globalAlpha * me.alpha;
                ctx.fillRect(me.x, me.y, me.width, me.height);
                ctx.restore();

            }

        }
    };
    this.update = function () {};

    observer.addListener('imagesLoaded', me.onImagesLoaded);
}
;