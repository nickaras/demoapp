var images = {
    sym1: 'images/SYM1.png',
    sym3: 'images/SYM3.png',
    sym4: 'images/SYM4.png',
    sym5: 'images/SYM5.png',
    sym6: 'images/SYM6.png',
    sym7: 'images/SYM7.png',
    spinButton_active: 'images/BTN_Spin.png',
    spinButton_disabled: 'images/BTN_Spin_d.png',
    spinButton_down: 'images/BTN_Spin_hover.png',
    background: 'images/BG.png',
    left_arrow_active: 'images/left_arrow_button_active.png',
    left_arrow_down: 'images/left_arrow_button_active_down.png',
    left_arrow_disabled: 'images/left_arrow_button_disabled.png',
    right_arrow_active: 'images/right_arrow_button_active.png',
    right_arrow_down: 'images/right_arrow_button_active_down.png',
    right_arrow_disabled: 'images/right_arrow_button_disabled.png',
    rect_button_active: 'images/rect_button_active.png',
    rect_button_disabled: 'images/rect_button_disabled.png',
    rect_button_down: 'images/rect_button_down.png',
    bet_indicator_normal: 'images/bet_indicator_normal.png',
    bet_indicator_active: 'images/bet_indicator_active.png'
};

function ImageLoader() {
    var me = this;
    this.loadedImages = {};

    this.counter = 0;
    this.num = 0;

    this.loadImages = function (images) {

        for (var name in images) {
            me.num++; // num увеличивается каждую итерацию, что ьы знать сколько картинок СОЗДАНО(не загружено)

            var image = new Image();

            image.onload = me.checkAllImagesLoaded;
            image.src = images[name];
            me.loadedImages[name] = image;

            //console.log("me.loadedImages['" + name + "'] = image;");
        }
    };

    this.checkAllImagesLoaded = function () {
        me.counter++;
        if (me.counter === me.num) {
            console.log(me.counter + ' картинок загружено!');

            observer.fireEvent('imagesLoaded', me.loadedImages);
        }
    };

    this.getImage = function (imgName) {
        return me.loadedImages[imgName];
    };
}

var imageLoader = new ImageLoader();
imageLoader.loadImages(images);