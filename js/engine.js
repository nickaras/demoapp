/*
 * 1. Посчитать сумму выиграша по бетлайнам
 *    Внести таблицу стоимости символов
 * 2. Определять тип выиграша по сумме выиграша
 *    Внести таблицу коефициентов типа выиграша - напр. 1-3х стоимости мин бетлинии = смол вин,
 *          от 3-5 - медиум вин
 *          от5-7 - биг вин
 *          от 7 - 10 - мега вин
 *          от 10---  супер мега вин
 * 3. Анимация под тип выииграша
 */
var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        drawingObjects_ctx = [],
        combinationArray = [],
        stoppingIndicator = 0,
        reelsArray = [];

var reelManager = new ReelManager();

var bg_image = new Sprite({
    x: 0,
    y: 0,
    width: 960,
    height: 536,
    alpha: 0,
    anchor: 0.5
}, 'background');

var reel1 = new Reel(0);
var reel2 = new Reel(1);
var reel3 = new Reel(2);
var spinButton = new SpinButton();
var server = new GameServer();
var betLines = new BetLinesManager();
var winManager = new WinManager(CONFIG);
//var imageSelector = new ImageSelector(['sym1', 'sym3', 'sym4', 'sym5', 'sym6', 'sym7']);
var winAnimation = new WinAnimation();
//var valueSelector = new ValueSelector({x: 100, y:500, width: 400, height:100, defaultValue: 2, valueStep: 0.5, minValue:-5, maxValue:5, title: 'Coin value'});
var keyPad = new KeyPad();
var betIndicators = new BetLineIndicators();

var footer = new Sprite({
    x: 0,
    y: 536,
    width: 960,
    height: 180,
});


reel1.init(ctx);
reel2.init(ctx);
reel3.init(ctx);
spinButton.init();
betLines.init();


drawingObjects_ctx.push(bg_image);
drawingObjects_ctx.push(reel1);
drawingObjects_ctx.push(reel2);
drawingObjects_ctx.push(reel3);
drawingObjects_ctx.push(footer);
drawingObjects_ctx.push(spinButton);
drawingObjects_ctx.push(betLines);
drawingObjects_ctx.push(betIndicators);
drawingObjects_ctx.push(keyPad);
drawingObjects_ctx.push(winAnimation);





reelsArray.push(reel1);
reelsArray.push(reel2);
reelsArray.push(reel3);

function renderLoop() {
    ctx.clearRect(0, 0, 960, 716);

    for (var i = 0; i < drawingObjects_ctx.length; i++) {
        drawingObjects_ctx[i].update();
        drawingObjects_ctx[i].draw(ctx);
    }


    setTimeout(renderLoop, 1000 / 60);
}
renderLoop();






document.addEventListener('mousedown', function (event) {
    observer.fireEvent('mouseDown', {clientX: event.clientX, clientY: event.clientY});
    //console.log(event);
});
document.addEventListener('mouseup', function (event) {
    observer.fireEvent('mouseUp', {clientX: event.clientX, clientY: event.clientY});
    //console.log(event);
});
document.addEventListener('mousemove', function (event) {
    observer.fireEvent('mouseMove', {clientX: event.clientX, clientY: event.clientY});

});







//function loadImages(reelPositions, ctx) {
//    var onImageLoad = function(img, i){
//        
//        return function () {
//            ctx.drawImage(img, 20, i * img.height);
//        };
//    };
//
//    for (var i = 0; i < reelPositions.length; i++) {
//        var img = new Image();
//        img.src = 'images/SYM' + reelPositions[i] + '.png';
//        
//
//
//        img.onload = onImageLoad(img, i);
//
//    }
//    
//}
//
//loadImages(reelPositions, ctx);





//img.onload = function (i, someImg) {
//            
//            var y = i;
//            var kartinka = someImg;
//            
//            return function () {
//                ctx.drawImage(kartinka, 20, y*kartinka.height);
//            };
//        }(i, img);





//img.reelStipPos = i;
//
//        img.onload = function () {
//            ctx.drawImage(this, 20, this.reelStipPos * this.height);
//        };
//
//    }
//}





//img.onload = onImageLoad(img, i);
//
//    }
//    
//    function onImageLoad(img, i){
//        
//        return function () {
//            ctx.drawImage(img, 20, i * img.height);
//        };
//    };