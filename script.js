$(document).ready(function() {

	//what does this do?
    // return the value in string form
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
                case 14:return 'Ace';
                break;
			}
		}
		return value.toString();
	};


	//what does this do?
    // creates the deck of cards
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 1; j<14; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}

    //console.log(deck);

	
	//what does this do?
    // shuffles the deck
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	};

    //console.log(shuffle(deck));
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);
    //console.log('check', deck);

    // creating two players
	var cards_player_1 = [];
	var cards_player_2 = [];
	// Deals out the deck that will evenly divide the deck up between the two players
	var deal = function(){
        for(var i = 0; i< deck.length; i++){
            if(i%2==0) {
                cards_player_1.push(deck[i]);
            } else {
                cards_player_2.push(deck[i]);
            }
        }
    };
    deal();

    //console.log(cards_player_1.length);
    //console.log(cards_player_2.length);


	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card1, card2){
	    if(card1.number>card2.number){
            return 1;
        } else if(card2.number>card1.number) {
            return 2;
        } else if(card1.number==card2.number) {
            return "tie";
        } else {
            return false;
        }
	};

    //console.log(war(3, 2));
    var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);

		}
    };
	// console.log player decks
	var check = function () {
        console.log(cards_player_1);
        console.log(cards_player_2);
    };
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function(){
        var tempDeck = [];
        var deleteCards = function(){
            cards_player_1.splice(0,4);
            cards_player_2.splice(0,4);
        };
        var pushIntoTempDeck = function () {
                tempDeck.push(cards_player_1[0],cards_player_1[1],cards_player_1[2],cards_player_1[3],cards_player_2[0], cards_player_2[1], cards_player_2[2], cards_player_2[3]);
        };
        // when there is a tie
        function tieBreaker() {
            // create temporary deck to push the 8 cards into
            pushIntoTempDeck();
            deleteCards();
            console.log(tempDeck);
            // checks which player's 4th card wins with war function
            var currentWinner2 = war(cards_player_1[3],cards_player_2[3]);
            // if player 1 wins
            if(currentWinner2===1){
                for(var i=0; i<tempDeck.length;i++){
                    cards_player_1.push(tempDeck[i]);
                }
                tempDeck = [];
                console.log("player 1 breaks the tie");
                check();
            }
            // if player 2 wins
            else if(currentWinner2===2) {
                for(var j=0; j<tempDeck.length;j++){
                    cards_player_2.push(tempDeck[i]);
                }
                tempDeck=[];
                console.log("player 2 breaks the tie");
                check();
                // if tied
            } else if(currentWinner2==="tie") {
                // recurses tieBreaker function
                tieBreaker();
            }
            console.log(tempDeck);
        }
        function determine() {
            var deleteEachCard = function () {
                cards_player_1.splice(0, 1);
                cards_player_2.splice(0, 1);
            };
            var currentWinner = war(cards_player_1[0], cards_player_2[0]);

            if (currentWinner === 1) {
                cards_player_1.push(cards_player_1[0], cards_player_2[0]);
                deleteEachCard();
            }
            else if (currentWinner === 2) {
                cards_player_2.push(cards_player_1[0], cards_player_2[0]);
                deleteEachCard();
            } else if(currentWinner==="tie"){
                tieBreaker();
            }
        }

            // when tie, check 4th card from the top of the deck of each player see who is largest

            //
            //} else if(cards_player_1[3]==cards_player_2[3]) {
            //    war(cards_player_1[3],cards_player_2[3]);
            //
            //
            //    if(cards_player_1[3]>cards_player_2[3]){
            //        cards_player_1.push(cards_player_1[0],cards_player_1[1],cards_player_1[2],cards_player_1[3],cards_player_2[0],cards_player_2[1], cards_player_2[2],cards_player_2[3]);
            //        cards_player_1.splice(0,4);
            //        cards_player_2.splice(0,4);
            //        console.log("player 1 wins the double war");
            //
            //        check();
            //
            //    }
            //    else if(cards_player_2[3]>cards_player_1[3]) {
            //        cards_player_1.push(cards_player_1[0], cards_player_1[1], cards_player_1[2], cards_player_1[3], cards_player_2[0], cards_player_2[1], cards_player_2[2], cards_player_2[3]);
            //        cards_player_1.splice(0, 4);
            //        cards_player_2.splice(0, 4);
            //        console.log("player 2 wins the double war");
            //        check();
            //
            //    }
            //}
            // winner takes all 8 cards
        determine();
        advance();
	};


	advance();

	$(".btn").click(function() {
		play();
	});
});
