function GameServer() {
    var me = this;



    this.lastResponse = {
        stopPositions: [4, 4, 4],
        betLines: [0, 2],
        winAmount: 200,
        winType: 'smallWin'
    };

    this.response = function (responseData) {
        // console.log(responseData);
        observer.fireEvent('serverResponse', responseData);

    };

    this.startNewRound = function () {

        me.response(me.generateOutcome(CONFIG.reels, CONFIG.betlinesConfig, CONFIG.symbolsOnReel));
        // console.log(me.lastResponse.stopPositions);

    };

    this.generateOutcome = function (reels, betlines, symbolsOnReel) {
        var position,
                symbolsOnReels = [],
                i,
                j,
                k,
                symbolIndexOnReel,
                symbol,
                comparativeArray = [],
                betlineConfig,
                winSummArray = [],
                winAmount = 0;
        ;

        var response = {
//            stopPositions: [0, 4, 4],
            stopPositions: [],
            betLines: [],
            winAmount: 0,
            winType: ''
        };

        for (i = 0; i < reels.length; i++) {
            position = Math.round(Math.random() * reels[i].structure.length);
            response.stopPositions.push(position);
        }



        for (j = 0; j < response.stopPositions.length; j++) {
            symbolsOnReels[j] = [];
            //symbolsOnReels.push([]); --- либо так
            for (k = 0; k < symbolsOnReel; k++) {
                symbolIndexOnReel = response.stopPositions[j];
                symbol = reels[j].structure[symbolIndexOnReel + k];
                symbolsOnReels[j].push(symbol);
            }
        }

        var betline;

        for (i = 0; i < betlines.length; i++) {
            comparativeArray.length = 0;
            betline = betlines[i];

            for (j = 0; j < betline.length; j++) {
                symbolIndexOnReel = betline[j];
                symbol = symbolsOnReels[j][symbolIndexOnReel];

                comparativeArray.push(symbol);

            }
            if (isAllElementsAreSame(comparativeArray)) { 
                response.betLines.push(i);

                var symValue = CONFIG.symbolsCoinValue[comparativeArray[0]];
                winSummArray.push(symValue * 3);
            }

        }

        for (i = 0; i < winSummArray.length; i++) {
            winAmount += winSummArray[i];
        }

        response.winAmount = winAmount;

        response.winType = me.checkwinType(winAmount);



        console.log(symbolsOnReels);
        console.log(response);
        console.log(winSummArray);
        console.log('winAmount = ' + winAmount);
        return response;
    };

    this.checkwinType = function (num) {
        if (num > 0 && num <= 100) {
            return 'smallWin';
        } else if (num > 100 && num <= 200) {
            return 'mediumWin';
        } else if (num > 200 && num <= 300) {
            return 'bigWin';
        } else if (num > 300 && num <= 400) {
            return 'megaWin';
        } else if (num > 400) {
            return 'superMegaWin';
        }


    };

    this.onServerRequest = function (params) {
        if (params.action == 'spin') {
            me.startNewRound();
        }
    };

    observer.addListener('serverRequest', me.onServerRequest);
}

//var testServer = new GameServer();
//console.log(testServer.generateOutcome(CONFIG.reels, CONFIG.betlinesConfig, CONFIG.symbolsOnReel));




//[Math.floor(Math.random()*15),Math.floor(Math.random()*15),Math.floor(Math.random()*15)]