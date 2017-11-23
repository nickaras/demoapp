function ValueSelector(_params) {
    var me = this;
    this.ready = false;

    this.x = _params.x ? _params.x : 0; // дофиксить
    this.y = _params.y;
    this.width = _params.width;
    this.height = _params.height;

    this.buttonWidth = me.width / 4;
    this.infoFieldWidth = me.width / 2;


    this.dragBarY = me.y + me.height + me.height / 10;
    this.dragBarHeight = me.height / 8;


    this.defaultValue = _params.defaultValue;
    this.value = this.defaultValue;
    this.valueStep = _params.valueStep;
    this.minValue = _params.minValue;
    this.maxValue = _params.maxValue;
    this.title = _params.title;

    this.mousePressed = false;



    this.init = function () {
        var leftButtonX = me.x + me.buttonWidth * 3;


        this.leftButton = new GeneralButton({x: me.x, y: me.y, width: me.buttonWidth, height: me.height, type: 'circle'});
        this.rightButton = new GeneralButton({x: leftButtonX, y: me.y, width: me.buttonWidth, height: me.height, type: 'circle'});

        this.leftButton.onclick = me.decreaseValue;
        this.rightButton.onclick = me.increaseValue;

        me.addListeners();
    };



    this.decreaseValue = function () {
        var newValue = me.value - me.valueStep;
        me.setNewValue(newValue);

    };

    this.increaseValue = function () {
        var newValue = me.value + me.valueStep;
        me.setNewValue(newValue);
    };

    this.update = function () {};

    this.onImagesLoaded = function (images) {
        me.init(images);
        me.leftButton.init({
            up: images.left_arrow_active,
            down: images.left_arrow_down,
            disabled: images.left_arrow_disabled
        });
        me.rightButton.init({
            up: images.right_arrow_active,
            down: images.right_arrow_down,
            disabled: images.right_arrow_disabled
        });
        
        me.ready = true;
        
        me.updateButtonsStatus();
    };



    this.draw = function (ctx) {
        if (me.ready) {
            ctx.save();

            me.drawValueField(ctx);
            me.drawValue(ctx);
            me.drawTitle(ctx);
            me.drawDragBar(ctx);

            me.leftButton.draw(ctx);
            me.rightButton.draw(ctx);

            ctx.restore();
        }
    };

    this.drawValueField = function (ctx) {
        ctx.fillStyle = '#99CC66';
        ctx.fillRect(me.x + me.buttonWidth, me.y, me.infoFieldWidth, me.height);
    };
    this.drawValue = function (ctx) {
        ctx.fillStyle = "#000000";
        ctx.font = me.height * 0.7 + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(me.value, me.x + me.width / 2, me.y + me.height / 2);
    };

    this.drawTitle = function (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.font = me.height * 0.5 + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(me.title.toUpperCase(), me.x + me.width / 2, me.y - me.height / 3);
    };

    this.drawDragBar = function (ctx) {
        ctx.fillStyle = '#99CC66';
        ctx.fillRect(me.x, me.dragBarY, me.width, me.dragBarHeight+0.5);

        ctx.fillStyle = '#0099CC';

        ctx.fillRect(me.x, me.dragBarY, (me.width * ((me.value - me.minValue) / (me.maxValue - me.minValue))), me.dragBarHeight+0.5);


    };



    this.detectHitArea = function (clientX, clientY) {

        if ((clientX >= me.x && clientX <= me.x + me.width) && (clientY >= me.dragBarY && clientY <= me.dragBarY + me.dragBarHeight)) {
            return true;
        }

        return false;
    };


    this.onMouseDown = function (event) {

        if (me.detectHitArea(event.clientX, event.clientY)) {
            me.mousePressed = true;
            me.detectValue(event);
        }

    };


    this.onMouseUp = function (event) {
        me.mousePressed = false;

    };
    
    this.onMouseMove = function (event) {
        if (me.mousePressed) {
            me.detectValue(event);
        }

    };

    this.onSpinButtonClick = function(){
        me.leftButton.disable();
        me.rightButton.disable();
    };
    this.onAllReelsStopped = function(){
        me.leftButton.enable();
        me.rightButton.enable();
        me.updateButtonsStatus();
    };
    
    this.detectValue = function (event) {
        var valueRangeLength = me.maxValue - me.minValue,
                distBetwClickAndX = event.clientX - me.x,
                currentValue = ((distBetwClickAndX / me.width) * (valueRangeLength)) + me.minValue,
                newValue = Math.round(currentValue / me.valueStep) * me.valueStep;

        me.setNewValue(newValue);

    };

    this.setNewValue = function (newValue) {
        me.value = newValue;
        if (newValue >= me.maxValue) {
            me.value = me.maxValue;
        }
        if (newValue <= me.minValue) {
            me.value = me.minValue;
        }

        me.updateButtonsStatus();
    };
    
    this.isMaxValue = function(){
        return me.value == me.maxValue;
    };
    
    this.isMinValue = function(){
        return me.value == me.minValue;
    };
    
    this.setMaxValue = function(){
        me.setNewValue(me.maxValue);
    };
    
    this.setMinValue = function(){
        me.setNewValue(me.minValue);
    };

    this.updateButtonsStatus = function () {

        if (me.value == me.maxValue) {
            me.rightButton.disable();
        } else {
            me.rightButton.enable();
        }

        if (me.value == me.minValue) {
            me.leftButton.disable();
        } else {
            me.leftButton.enable();
        }
    };

    this.addListeners = function () {
        observer.addListener('mouseDown', me.onMouseDown);
        observer.addListener('mouseUp', me.onMouseUp);
        observer.addListener('mouseMove', me.onMouseMove);
    };


    observer.addListener('imagesLoaded', me.onImagesLoaded);
    
    observer.addListener('spinButtonClick', me.onSpinButtonClick);
    observer.addListener('allReelsStopped', me.onAllReelsStopped);
}
