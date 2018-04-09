/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var array = ['fa-diamond','fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bomb', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt','fa-cube','fa-leaf','fa-bomb','fa-bicycle']; 

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

// While on load page list will be set
window.onload = function(){
	resetlist();
}

//on click restart button list will reset
var restartBtn = document.getElementsByClassName("restart");
for(var i=0; i<restartBtn.length; i++) {
    restartBtn[i].onclick = resetlist;
}

// generate list
function resetlist () {
	if(remove()){
		var rndArray = shuffle(array);
		rndArray.forEach(function(element) {
		    var list = document.createElement("LI");
		    list.setAttribute("class", "card notOpened" );

		    var itag = document.createElement("i");
		    itag.setAttribute("class", "fa "+element);
		    list.appendChild(itag);
		    document.querySelector(".deck").appendChild(list);

			list.onclick = function () {
				var opendLiChild = '';
			    var CurrentChildClassName =this.firstElementChild.getAttribute('class');
				var opendLi = document.querySelector("li.open.show.firstClick");

				if (opendLi != null) {
					opendLiClass = opendLi.getAttribute('class');
					opendLiChild = opendLi.firstElementChild.getAttribute('class');

					if (opendLiChild != '' && CurrentChildClassName != '' && (opendLiChild == CurrentChildClassName)) {
				    	this.setAttribute("class", "card open show matched" );
				    	opendLi.setAttribute("class", "card open show matched" );	    	
				    }else if(opendLiChild != '' && CurrentChildClassName != '' && opendLi != null){
				    	this.setAttribute("class", "card open show secondClick" );
				    	var currentli  = this;
				    	setTimeout(function() {
				    		opendLi.setAttribute("class", "card notmatch" );
				    		currentli.setAttribute("class", "card notmatch" );
				    	 }, 500);
				    	setTimeout(function() {
					    	opendLi.setAttribute("class", "card notOpened" );
					    	currentli.setAttribute("class", "card notOpened" );
				    	 }, 1000);

				    }	
				}else{
					this.setAttribute("class", "card open show firstClick" );
				}

				// showing you won message while all match
				var remainedLi = document.querySelector("li.notOpened");
				if (remainedLi == null) {
				    var youWon = document.createElement("span");
				    youWon.setAttribute("style", "text-align:center;" );
				    var youWonText = document.createTextNode('You Won!');
		    		youWon.appendChild(youWonText);
					if(remove()){
					    document.querySelector(".deck").appendChild(youWon);
				    }
				    
				}
			}

	    });
	}
}

//removing all list inside ul
function remove() {
    var list = document.querySelector(".deck");
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
        debugger;
    }
    return true;
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
