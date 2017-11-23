var CONFIG = {
    symbol: {
        width: 235,
        height: 155
    },
    symbolsOnReel: 3,
    reels: [
        {
            x: 68,
            y: 35,
            structure: [
                //'sym3','sym1','sym1',
                'sym5', 'sym1', 'sym3', 'sym6', 'sym3', 'sym3', 'sym4', 'sym5',
                'sym4', 'sym1', 'sym4', 'sym3', 'sym6', 'sym3', 'sym5', 'sym3',
                'sym4', 'sym1', 'sym4', 'sym3', 'sym7', 'sym4', 'sym1', 'sym3',
                'sym5', 'sym7', 'sym3', 'sym4', 'sym1', 'sym3',
                'sym1', 'sym3', 'sym5', 'sym4', ]
        }, {
            x: 311,
            y: 35,
            structure: [
                //'sym1','sym3','sym1',
                'sym5', 'sym6', 'sym3', 'sym1', 'sym3', 'sym5', 'sym4', 'sym6',
                'sym1', 'sym3', 'sym5', 'sym7', 'sym3', 'sym4', 'sym1', 'sym3',
                'sym1', 'sym3', 'sym5', 'sym4', 'sym6', 'sym1', 'sym3', 'sym5',
                'sym6', 'sym3', 'sym1', 'sym3', 'sym5', 'sym4', 'sym6', 'sym1',
                'sym3', 'sym7']

        }, {
            x: 553,
            y: 35,
            structure: [
                //'sym1','sym1','sym3',
                'sym5', 'sym7', 'sym5', 'sym1', 'sym3', 'sym7', 'sym4', 'sym6',
                'sym1', 'sym3', 'sym5', 'sym7', 'sym3', 'sym4', 'sym1', 'sym1',
                'sym3', 'sym5', 'sym7', 'sym3', 'sym5', 'sym7', 'sym3', 'sym3',
                'sym4', 'sym1', 'sym7', 'sym5', 'sym1', 'sym3', 'sym5', 'sym7',
                'sym5', 'sym1', 'sym3', 'sym7', 'sym4', 'sym6',
                'sym1', 'sym3', 'sym5', 'sym7', 'sym3', 'sym4', 'sym1', 'sym1',
                'sym3', 'sym5', 'sym7', 'sym3', 'sym5', 'sym7', 'sym3', 'sym3',
                'sym4', 'sym1', 'sym7', 'sym5', 'sym1', 'sym3', ]
        }
    ],
    spinButton: {
        x: 824,
        y: 218,
        width: 98,
        height: 98
    },
    betlinesConfig: [
        [0, 0, 0],
        [0, 1, 2],
        [1, 1, 1],
        [2, 1, 0],
        [2, 2, 2]

    ],
    betLines: [
        {
            x: 140,
            y: 115,
            height: 3,
            drawToX: 700,
            drawToY: 115
        },
        {
            x: 160,
            y: 115,
            height: 3,
            drawToX: 690,
            drawToY: 440
        },
        {
            x: 140,
            y: 270,
            height: 3,
            drawToX: 700,
            drawToY: 270
        },
        {
            x: 690,
            y: 115,
            height: 3,
            drawToX: 115,
            drawToY: 440
        },
        {
            x: 140,
            y: 425,
            height: 3,
            drawToX: 700,
            drawToY: 425
        }

    ],
    betIndicators: [
        {
            x: 25,
            y: 95
        },
        {
            x: 25,
            y: 170
        },
        {
            x: 25,
            y: 245
        },
        {
            x: 25,
            y: 330
        },
        {
            x: 25,
            y: 420
        }
    ],
    symbolsCoinValue: {
        sym1: 100,
        sym3: 10,
        sym4: 20,
        sym5: 30,
        sym6: 40,
        sym7: 50
    },
    winType: {
        smallWin: {
            from: 0,
            to: 5
        }
    }

};