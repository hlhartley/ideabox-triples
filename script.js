var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
var cardContainer = document.querySelector('.cards-container');

saveButton.addEventListener('click', createCard);
cardContainer.addEventListener('click', cardButtonPushed);

function createCard(event) {
  event.preventDefault();
  var idea = new Idea(titleInput.value, bodyInput.value);
  displayCard(idea);
}

var localStorageObjects = Object.keys(localStorage);

function makeCards() {
  localStorageObjects.forEach(function(localObject, i) {
    var objectValue = JSON.parse(Object.values(localStorage)[i]);
    displayPulledCard(objectValue.id, objectValue.title, objectValue.body, objectValue.quality);
  })
}


  function displayPulledCard(newCardID, newCardTitle, newCardBody, newCardQuality) {

    var cardsContainer = document.querySelector('.cards-container');
    var card = `<article id="${newCardID}" class="idea-card">
    <section class="output-container">
    <h1 class="title-output" contenteditable="true">${newCardTitle}</h1> 
    <p class="body-output" contenteditable="true">${newCardBody}</p>
    </section>
    <section class="quality-container">
    <div class="left-quality-container">
    <img class="quality-icons downvote-btn" src="images/downvote.svg">
    <img class="quality-icons upvote-btn" src="images/upvote.svg">
    <h2 class="quality-header">Quality: <span class="quality-actual">${newCardQuality}<span></h2>
    </div>
    <div class="right-quality-container">
    <img class="quality-icons delete-btn" src="images/delete.svg">
    </div>
    </section>
    </article>`;
    cardsContainer.innerHTML = cardsContainer.innerHTML + card;

  }


  makeCards();

  function displayCard(idea) {
    var uniqueCardId = Math.floor(Date.now() / 1000);
    var cardsContainer = document.querySelector('.cards-container');
    var card = `<article id="${idea.id}" class="idea-card">
    <section class="output-container">
    <h1 class="title-output" contenteditable="true">${idea.title}</h1> 
    <p class="body-output" contenteditable="true">${idea.body}</p>
    </section>
    <section class="quality-container">
    <div class="left-quality-container">
    <img class="quality-icons downvote-btn" src="images/downvote.svg">
    <img class="quality-icons upvote-btn" src="images/upvote.svg">
    <h2 class="quality-header">Quality: <span class="quality-actual">${idea.quality}<span></h2>
    </div>
    <div class="right-quality-container">
    <img class="quality-icons delete-btn" src="images/delete.svg">
    </div>
    </section>
    </article>`;
    cardsContainer.innerHTML = cardsContainer.innerHTML + card;

    idea.saveToStorage();
  }

function cardButtonPushed() {
  checkDeleteButton();
  checkVoteButton();
}

function checkDeleteButton() {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
   var cardToDeleteId = event.target.closest('article').id;
   Idea.prototype.deleteFromStorage(cardToDeleteId);
 }
}

var incrementor = 0;

function checkUpOrDown() {
  if (event.target.classList.contains('upvote-btn')) {
    incrementor = 1;
    return true;
  } else if (event.target.classList.contains('downvote-btn')) {
    incrementor = -1;
    return true;
  } 
}

var qualityList = ['Swill','Plausible','Genius'];

function checkVoteButton() {
  checkUpOrDown();
  if (checkUpOrDown() === true) {
    var qualityStatus = event.target.parentElement.childNodes[5].firstElementChild.innerText;
    var qualityListMatch = qualityList.indexOf(qualityStatus);
    if (qualityList[qualityListMatch + incrementor] !== undefined) {
      var newQualityStatus = qualityList[qualityListMatch + incrementor];
      event.target.parentElement.childNodes[5].firstElementChild.innerText = newQualityStatus;
      var cardIdOfButton = event.target.closest('article').id;
      Idea.prototype.updateQuality(cardIdOfButton, newQualityStatus);
    } 
  }
}

