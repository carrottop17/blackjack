// Set messages after game over
// the table game needs to be formated to look good. change it.
// what about thos 11, 12, 13?
// what about aces
// the player can hit forever
// there is no win counter/bet system
// there is no deck to draw from 
// the cards arent red or black
// the cards are lame
// there is no delay on showing cards
// you can see the dealers cards

// 1. when the user click deal, deal.
var theDeck = [];
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){
	$('.deal-button').click(function(){
		createDeck(); //run a function that creates an array of 1H-13C
		shuffleDeck();//shuffle the deck

		//push onto the playersHand array, the new card. Then place it in the DOM
		playersHand.push(theDeck[0]);
		placeCard('player', 'one', theDeck[0]);
		
		dealersHand.push(theDeck[1]);
		placeCard('dealer', 'one', theDeck[1]);
		playersHand.push(theDeck[2]);
		placeCard('player', 'two', theDeck[2]);
		dealersHand.push(theDeck[3]);
		placeCard('dealer', 'two', theDeck[3]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
		// for(var = i; i < theDeck.length; i++){
		// 	if(theDeck[i] == "10c"){
		// 		cardToPlace = ""
		// 	}
		// }


	});

	$('.hit-button').click(function(){
		// placeCard('player', 'three', theDeck[4]);
		var slotForNewCard = '';
		if(playersHand.length == 2){slotForNewCard = "three";}
			else if(playersHand.length == 3){slotForNewCard = "four";}
			else if(playersHand.length == 4){slotForNewCard = "five";}
			else if(playersHand.length == 5){slotForNewCard = "six";}
			// else{(checkWin());}
			placeCard('player', slotForNewCard, theDeck[topOfTheDeck]);
			playersHand.push(theDeck[topOfTheDeck]);
			playerTotal = calculateTotal(playersHand, 'player');
			topOfTheDeck++;
			if (playerTotal > 21){
				setInterval(function(){checkWin(); }, 500);
				clearInterval(function(){checkWin(); });
				// checkWin();
			}


	});

	$('.stand-button').click(function(){
		//player clicked on stand. what happens to the player? nothing.
		var slotForNewCard = "";
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17){
			// dealer has less then 17 hit away
			if(dealersHand.length == 2){slotForNewCard = "three";}
			else if(dealersHand.length == 3){slotForNewCard = "four";}
			else if(dealersHand.length == 4){slotForNewCard = "five";}
			else if(dealersHand.length == 5){slotForNewCard = "six";}
			placeCard('dealer', slotForNewCard, theDeck[topOfTheDeck]);
			dealersHand.push(theDeck[topOfTheDeck]);
			dealerTotal = calculateTotal(dealersHand, 'dealer');
			topOfTheDeck++;
		}

		// Dealer has at least 17 check to see who won.
		checkWin();
	});

});

function placeCard(who, where, cardToPlace){
	console.log('pppppppppp')
	var classSelector = '.'+who+'-cards .card-'+where;
	// write logic to fix the 11, 12, 13 value
	$(classSelector).html('<img src="images/' + cardToPlace + '.png">');
	
}

function checkWin(){
	// Get player total
	// Get dealer total
	var playersTotal = calculateTotal(playersHand, 'player');
	var dealerTotal = calculateTotal(dealersHand, 'dealer');

	if(playersTotal > 21){
		//player has busted
		//set message
		alert("You have busted!");
	}else if(dealerTotal > 21){
		//dealer has busted
		//set message
		alert("You win!")
	}else{
		//neither player has more than 21
		if(playersTotal > dealerTotal){
			//player won
			alert("You win!")
		}else if(dealerTotal > playersTotal){
			//dealer won
			alert("You lose!")
		}else{
			//push. tie
			alert("Tie. Game over.")
		}
	}
	location.reload();
}



function createDeck(){
	// fill the deck with 
	// - 52 cards
	// - 4 suits
	// 	- h, 2, d, c
	var suits = ['h','s','d','c']
	for(s=0; s<suits.length; s++){
		for(c=1; c<=13; c++){
			theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){
	for(var i=1; i<1000; i++){
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
}

function calculateTotal(hand, whosTurn){
	// console.log(hand);
	// console.log(whosTurn);
	var total = 0;
	var cardValue = 0;
	for (var i = 0; i<hand.length; i++){
		cardValue = Number(hand[i].slice(0,-1))
		if (cardValue > 10) {
			cardValue = 10;
		}
		// console.log(hand[i]);
		// console.log(cardValue);
		total += cardValue;
	}
	// update the html with the new total
	var elementToUpdate = '.'+whosTurn+'-total-number';
	$(elementToUpdate).text(total);



	return total;
}
















