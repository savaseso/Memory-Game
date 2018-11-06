/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const decks = document.querySelector('.deck');

let toggledCards  = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched=0;
const TotalPairs=8;

//listen to cards inside the class decks
decks.addEventListener('click',function(event){
    const target = event.target;
    if ((target.classList.contains('card') && !target.classList.contains('match')&& toggledCards.length < 2 && !toggledCards.includes(target))){
        if (clockOff) {
		    startClock();
			clockOff = false;	
		}
        target.classList.toggle('show');
        target.classList.toggle('open');
        toggledCards.push(target);
        if (toggledCards.length === 2){
            addMove();
            checkScore();
            if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
                toggledCards[0].classList.toggle('match');
                toggledCards[1].classList.toggle('match');
                toggledCards = [];
                matched++;
                win();
            }else {
                setTimeout(function() {
                    toggledCards[0].classList.toggle('open');
                    toggledCards[0].classList.toggle('show');
                    toggledCards[1].classList.toggle('open');
                    toggledCards[1].classList.toggle('show');
                    toggledCards = [];   
                }, 800); 
            }
        }        
    }
});




function deckShuffle() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const cardsShuffled = shuffle(cardsToShuffle);
    for (card of cardsShuffled){
        decks.appendChild(card);
    }
   
};
//move
function addMove(){
    moves++;
    const text = document.querySelector('.moves');
    text.innerHTML = moves;

};
//stars
function checkScore() {
	if (moves === 17 || moves === 24) { hideStar();
	}
}

function hideStar() {
	  const starList = document.querySelectorAll('.stars li');
	  for (star of starList) {
		    if (star.style.display !== 'none'){
			  star.style.display = 'none';
			  break;
		    }
	  }
}
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
console.log(starCount);
return starCount;
}
//time and clock
function startClock(){
    time = 0;
    let = clockId = setInterval(() => {
        time++;
        displayTime();   
    },1000);

};

function displayTime(){
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
	const seconds = time % 60; 
		if (seconds < 10) {
		    clock.innerHTML = `Time:${minutes}:0${seconds}`;
	  } else {
		    clock.innerHTML = `Time:${minutes}:${seconds}`;	
	  }	
};

function stopClock() {
    clearInterval(clockId);
}
//stats Window
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	if(modal.classList.contains('hide')) {
		modal.classList.remove('hide');
	} else {
		modal.classList.add('hide');
	}
}
function writeModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `${clockTime}`;
    movesStat.innerHTML = `Moves: ${moves}`;
    starsStat.innerHTML = `Stars: ${stars}`;
}


//reset,replay,cancel
document.querySelector('.restart').addEventListener('click',function(){
    resetGame();
});
document.querySelector('.modal_cancel').addEventListener('click', function() {
	toggleModal();
});
document.querySelector('.modal_replay').addEventListener('click',function(){
    replayGame();
});
//reset section
function resetGame(){
    toggledCards=[];
    matched=0;
    resetClockAndTime();
    resetMoves();
    resetStars();
    deckShuffle();
    resetCards();
}
function resetClockAndTime(){
    stopClock();
    clockOff=true;
    time=0;
    displayTime();
}
function resetMoves (){
    moves=0;
    document.querySelector('.moves').innerHTML = moves;
}
function resetStars() {
    stars = 0;
	  const starList = document.querySelectorAll('.stars li');
	  for (star of starList) {
		    star.style.display = 'inline';
	    }
}
function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}
//game over
function win() {
    if (matched === TotalPairs) {
    gameOver();
    }
}

function gameOver(){
    stopClock();
    writeModalStats();
    toggleModal();
}
//replay game
function replayGame(){
    resetGame();
    toggleModal();

}

