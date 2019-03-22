/*
 * Create a list that holds all of your cards
 */
const arrayOfSym = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-cube",
    "fa-bolt", "fa-bicycle", "fa-leaf", "fa-bomb", "fa-diamond",
    "fa-paper-plane-o", "fa-anchor", "fa-cube", "fa-bolt",
    "fa-bicycle", "fa-leaf", "fa-bomb"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cards = document.querySelectorAll('.card');
let i = 0;
for (sym of shuffle(arrayOfSym)) {
    cards[i].firstElementChild.classList.add(sym);
    i++;
}
/*
  Putting the array of symbols on the Cards Randomly , 
  every time page loaded or reset.
*/
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

let clickNum = 0;                    /*count of clicks to cntrol opening two cards only */

let clickedCard;                     /* Checking status variales */
let prevCard = cards[0];



let matchStatus;                    /* Checking status variales */
let openStatus = false;


let movesCounter = 0;               /* Identifing move counter and stars rate variables */
let starsIndex = 0;

const moves = document.querySelector(".moves");
const stars = document.querySelector('.stars').querySelectorAll('.fa');
const rest = document.querySelector('.restart');

rest.addEventListener('click',function(){       /* restart Click event listener */
    location.reload()
});

document.addEventListener('click', function () {  /* Page Click event listener */
    if (clickNum <= 2 && !(openStatus)) {
        clickedCard = event.target;
        if (clickedCard.classList == "card") {
            clickNum++;
            openCard();
        }
    }
});

/* open the cards to check and count and rate*/
function openCard() {
    clickedCard.classList.add("show", "open");
    if (clickNum === 2) {
        openStatus = true;
        checkMatch();
        moveCounter();
        starRate();
        clickNum = 0;
    } else {
        if (!openStatus) {
            prevCard = clickedCard;
        }
    }
};


/* check the two cards already opened and change the classes according to this result*/
function checkMatch() {
    if (clickedCard.firstElementChild.classList[1]
        === prevCard.firstElementChild.classList[1]) {
        clickedCard.classList = "card match";
        prevCard.classList = "card match";
        openStatus = false;
    } else {
        setTimeout(function () {
            clickedCard.classList = "card";
            prevCard.classList = "card";
            openStatus = false;
        }, 500);
    }
};

/* count the Number Moves */
function moveCounter() {
    movesCounter++;
    moves.textContent = movesCounter;
}

/* downrate the stars by remove the class name*/
function starRate() {
    if (movesCounter % 12 === 0 && starsIndex < 2) {
        stars[starsIndex].remove('fa-fa-star');
        starsIndex++;
    }
}



