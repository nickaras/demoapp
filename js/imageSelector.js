function ImageSelector(inputImages) {
    var me = this;
    this.images = [];
    this.positionIndex = 0;
    this.ready = false;
    this.elements = 0;

    this.init = function (loadedImages) {

        for (var i = 0; i < inputImages.length; i++) {
            var imageToDraw = loadedImages[inputImages[i]];
            me.images.push(imageToDraw);
        }


//        var sym1 = images.sym1,
//                sym3 = images.sym3,
//                sym4 = images.sym4,
//                sym5 = images.sym5,
//                sym6 = images.sym6,
//                sym7 = images.sym7;
//        me.images.push(sym1, sym3, sym4, sym5, sym6, sym7);


        me.elements = me.images.length - 1;
        me.ready = true;

        this.leftButton = new GeneralButton({x: 100, y: 575, width: 70, height: 70, type: 'circle'});
        this.rightButton = new GeneralButton({x: 310, y: 575, width: 70, height: 70, type: 'circle'});

        this.leftButton.onclick = me.moveLeft;
        this.rightButton.onclick = me.moveRight;

    };

    this.moveLeft = function () {
        me.positionIndex--;
        if (me.positionIndex < 0) {
            me.positionIndex = me.elements;
        }
    };
    this.moveRight = function () {
        me.positionIndex++;
        if (me.positionIndex > me.elements) {
            me.positionIndex = 0;
        }
    };

    this.onImagesLoaded = function (images) {
        me.init(images);
        me.leftButton.init(images.left_arrow_active, images.left_arrow_disabled, images.left_arrow_down);
        me.rightButton.init(images.right_arrow_active, images.right_arrow_disabled, images.right_arrow_down);

    };

    this.draw = function (ctx) {
        if (me.ready) {
            ctx.save();
            ctx.translate(0, 540);
            ctx.scale(0.5, 0.5);
            ctx.drawImage(me.images[me.positionIndex], 360, 60); // из-за скейла приходится удваинвать координаты

            ctx.restore();

            me.leftButton.draw(ctx);
            me.rightButton.draw(ctx);
        }

    };

    this.update = function () {};

    observer.addListener('imagesLoaded', me.onImagesLoaded);



}

