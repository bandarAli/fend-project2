/*
 * Create a list that holds all of your cards
 */

const arrayOfSym = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-cube",
    "fa-bolt", "fa-bicycle", "fa-leaf", "fa-bomb", "fa-diamond",
    "fa-paper-plane-o", "fa-anchor", "fa-cube", "fa-bolt",
    "fa-bicycle", "fa-leaf", "fa-bomb"];

/* add the Shuffled Cards array to the page After Loading the page */
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let i = 0;
    for (sym of arrayOfSym) {
        cards[i].firstElementChild.classList.add(sym);
        i++;
    }
});


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
 *  - display the card's symbol ( Function openCard() )
 *  - check to see if the two cards matched (Function checkMatch() )
 *    + if the cards do match, lock the cards in the open  position (Function lockMatchedCards())
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (Function hideNotMatchedCards())
 *    + increment the move counter and display it on the page (Function hideNotMatchedCards)
 *    + if all cards have matched, display a message with the final score (Function winingDisplay())
 */
const cards = document.querySelectorAll('.card'); 
const moves = document.querySelector(".moves");
const stars = document.querySelector('.stars').querySelectorAll('.fa');
const rest = document.querySelector('.restart');
const modal = document.getElementById('myModal');
let timerSpan = document.querySelector(".timer");

let clickNum = 0;                    /*count of clicks to cntrol opening two cards only */

let clickedCard;                     /* Elments variable */
let prevCard = cards[0];

let openStatus = false;              /* Checking status variales */
let timerStarted = false;

let movesCounter = 0;
let matchCounter = 0;               /* counters */
let starsIndex = 3;
let min = 0;
let sec = 0;
let timerText;

/* add listiner on document click with check for card target */
document.addEventListener('click', function () {  
    startTimer();
    if (clickNum <= 2 && !(openStatus)) {
        clickedCard = event.target;
        if (clickedCard.classList == "card") {   /* check the click is on a card that not been locked yet */
            clickNum++;
            openCard();
            if (matchCounter === 8) { winingDisplay() }    /* Display the Win modal */
        }
    }
});

/* open the cards to check and count and rate*/
function openCard() {
    clickedCard.classList.add("show", "open");
    if (clickNum === 2) {
        openStatus = true;
        checkMatch();
        movesUpdate();
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
        lockMatchedCards()
    } else {
        hideNotMatchedCards()
    }
};

function lockMatchedCards() {
    matchCounter++;
    clickedCard.classList = "card match";
    prevCard.classList = "card match";
    openStatus = false;
}
function hideNotMatchedCards() {
    setTimeout(function () {
        clickedCard.classList = "card";
        prevCard.classList = "card";
        openStatus = false;
    }, 500);
}


/* count the Number Moves */
function movesUpdate() {
    movesCounter++;
    moves.textContent = movesCounter;
}

/* downrate the stars by remove the class name*/
function starRate() {
    if (movesCounter % 12 === 0 && starsIndex > 0) {
        stars[starsIndex - 1].classList.add('fa-star-o');
        starsIndex--;
    }
}

function winingDisplay() {
    let modalBody = document.querySelector('.modal-body');
    let starOrStars = '';
    if (starsIndex > 1) { starOrStars = 's' }
    const counterMsg = `<p> With ${movesCounter} moves 
                        and ${starsIndex} Star${starOrStars}
                        in ${timerText}
                        </p>`;
    modalBody.insertAdjacentHTML('afterbegin', counterMsg);
    setTimeout(function () {
        modal.style.display = "block";
    }, 500);
}

function startTimer() {
    if (!timerStarted) {
        let timerUpdate = setInterval(function () {
            if (matchCounter === 8) {
                clearInterval(timerUpdate);
            } else if (sec > 59) {
                sec = 0;
                min++;
            }
            timerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            timerSpan.textContent = timerText;
            sec++;
        }, 1000);
    }
    timerStarted = true;
}

/* Button Clicl to reload the game */
rest.addEventListener('click', function () {
    reloadPage();       /* restart Click event listener */
});

function reloadPage() {
    modal.display = 'none';
    location.reload();
}