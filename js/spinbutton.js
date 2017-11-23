function SpinButton() {
    var me = this;
    this.x = CONFIG.spinButton.x;
    this.y = CONFIG.spinButton.y;

    this.width = CONFIG.spinButton.width;
    this.height = CONFIG.spinButton.height;


    this.init = function () {
        me.button = new GeneralButton({width: me.width, height: me.height, x: me.x, y: me.y, type: 'circle', hideTitle: false});

        me.button.onclick = me.startNewRound;
        
        me.button.onMouseOverCallback = function () {
           // console.log("Over");
        };
        me.button.onMouseOutCallback = function () {
           // console.log("Out");
        };

    };

    this.startNewRound = function () {
        observer.fireEvent('spinButtonClick');
    };


    this.update = function () {};



    this.draw = function (ctx) {
        me.button.draw(ctx);
    };

    this.onImagesLoaded = function (images) {
        me.button.init({
            up: images.spinButton_active,
            down: images.spinButton_down,
            disabled: images.spinButton_disabled
        });

    };

    this.onSpinButtonEnable = function (state) {
        if (state == true) {
            me.button.enable();
        } else {
            me.button.disable();
        }
    };


    observer.addListener('imagesLoaded', me.onImagesLoaded);

    observer.addListener('spinButtonEnable', me.onSpinButtonEnable);

}



// DETECT HOVER
// 
// this.hoverX = 0;
// this.hoverY = 0;
// this.detectHoverArea = function () {
//    if (calcDistance(me.hoverX, me.hoverY, me.centerX, me.centerY) <= me.radius && me.buttonState == 'enabled') {
//        me.buttonState = 'hover';
//    } else if (calcDistance(me.hoverX, me.hoverY, me.centerX, me.centerY) > me.radius && me.buttonState == 'enabled')
//    {
//        me.buttonState = 'enabled';
//    }
//}
//
//observer.addListener('mouseMove', function (event) {
//    me.hoverX = event.clientX;
//    me.hoverY = event.clientY;
//    console.log('ssssssssss');
//    me.detectHoverArea();
//
//});
//
//if (me.isHovered()) {
//    ctx.drawImage(me.hoverImage, me.x, me.y);
//}