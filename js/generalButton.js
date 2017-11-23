function GeneralButton(_params) {
    var me = this;

    this.width = _params.width;
    this.height = _params.height;
    this.x = _params.x;
    this.y = _params.y;
    this.type = _params.type ? _params.type : 'rectangle';
    this.title = _params.title;
    this.hideTitle = _params.hideTitle; //ВОВА

    this.ready = false;

    this.enabled = true;
    this.state = 'up';
    this.isMousePressed = false;

    this.isMouseOverCalled = false; // ВОВА
    this.isMouseOutCalled = false;

    this.init = function (config) {
        if (me.type == 'circle') {
            me.centerX = me.x + me.width / 2;
            me.centerY = me.y + me.height / 2;
            me.radius = (me.width + me.height) / 4;
        }

        me.upImage = config.up;
        me.disabledImage = config.disabled;
        me.downImage = config.down;
        me.hoverImage = config.hover;
        me.fontColor = config.fontColor ? config.fontColor : "#ffffff";

        me.addListeners();
        me.ready = true;

    };

    this.disable = function () {
        me.enabled = false;
    };

    this.enable = function () {
        me.enabled = true;
    };


    this.addListeners = function () {
        observer.addListener('mouseDown', me.onMouseDown);
        observer.addListener('mouseUp', me.onMouseUp);
        observer.addListener('mouseMove', me.onMouseMove);
    };

    this.onMouseDown = function (event) {

        //console.log('mouse pressed - ' + me.isMousePressed);

        if (me.enabled && me.detectHitArea(event.clientX, event.clientY)) {
            me.state = 'down';
            me.isMousePressed = true;
        }
    };
    this.onMouseUp = function (event) {

        // console.log('mouse pressed - ' + me.isMousePressed);
        if (me.enabled && me.detectHitArea(event.clientX, event.clientY) && me.isMousePressed) { //сработает только если нажали на ней
            me.state = 'up';
            me.onclick();
        }
        me.isMousePressed = false;
    };

    this.onMouseMove = function (event) {

        if (me.enabled) {

            if (me.detectHitArea(event.clientX, event.clientY)) {
                me.isMouseOutCalled = true;
                
                
                if (me.isMousePressed) {
                    me.state = 'down';
                } else {
                    me.state = 'hover';
                }
                if (me.isMouseOverCalled) {
                    me.onMouseOverCallback();
                    me.isMouseOverCalled = false;
                }
            } else {
                me.state = 'up';
                me.isMouseOverCalled = true;
                if (me.isMouseOutCalled) {
                    me.onMouseOutCallback();
                    me.isMouseOutCalled = false;
                }

            }


        }
    };

    this.onclick = function () {};
    this.onMouseOverCallback = function () {};
    this.onMouseOutCallback = function () {};

    this.detectHitArea = function (clientX, clientY) {
        if (me.type == 'circle') {

            if (calcDistance(clientX, clientY, me.centerX, me.centerY) <= me.radius) {
                return true;
            }
            //если прямоугольник
        } else {
            if ((clientX >= me.x && clientX <= me.x + me.width) && (clientY >= me.y && clientY <= me.y + me.height)) {
                return true;
            }
        }
        return false;

    };

    this.update = function () { };

    this.draw = function (ctx) {
        var image;

        if (me.ready) {
            ctx.save();

            if (me.enabled) {

                if (me.state == 'up') {
                    image = me.upImage;
                }
                if (me.state == 'hover') {

                    if (me.hoverImage) {
                        image = me.hoverImage;
                    } else {
                        ctx.globalAlpha = 0.9;
                        image = me.upImage;
                    }
                }
                if (me.state == 'down') {
                    image = me.downImage;
                }

            } else {
                image = me.disabledImage;
            }

            //ctx.fillRect(me.x, me.y, me.width, me.height);

            if (image.width < me.width && image.height < me.height) {
                ctx.drawImage(image, me.x + (me.width - image.width) / 2, me.y + (me.height - image.height) / 2, image.width, image.height);
            } else {
                ctx.drawImage(image, me.x, me.y, me.width, me.height);
            }


            if (me.title && me.hideTitle == false) {
                ctx.fillStyle = me.fontColor;
                ctx.font = me.height * 0.3 + "px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(me.title, me.x + me.width / 2, me.y + me.height / 2);

            }

            ctx.restore();
        }
    };
}