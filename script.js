var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
var cardContainer = document.querySelector('.cards-container');
var qualityList = ['Swill','Plausible','Genius'];
var searchBarInput = document.querySelector('.search-bar-input');
var incrementor = 0;
// var ideaArray = [];
// var ideaArray = document.querySelector('.cards-container');

searchBarInput.addEventListener('keyup', filterSearch);
saveButton.addEventListener('click', createCard);
cardContainer.addEventListener('click', cardButtonPushed);
titleInput && bodyInput.addEventListener('keyup', enableButtons);


function createCard(event) {
  event.preventDefault();
  var idea = new Idea(titleInput.value, bodyInput.value);
  createTemplateLiteral(idea.id, idea.title, idea.body, idea.quality);
  idea.saveToStorage();
  clearInputs();
  enableButtons();
  updateIdeaArray();
}

var localStorageObjects = Object.keys(localStorage);

function makeCards() {
  localStorageObjects.forEach(function(localObject, i) {
    var objectValue = JSON.parse(Object.values(localStorage)[i]);
    createTemplateLiteral(objectValue.id, objectValue.title, objectValue.body, objectValue.quality);
  })
}

makeCards();
updateIdeaArray();

function createTemplateLiteral(id, title, body, quality) {
  var cardsContainer = document.querySelector('.cards-container');
  var card = `<article id="${id}" class="idea-card">
  <section class="output-container">
  <h1 class="title-output" contenteditable="true">${title}</h1> 
  <p class="body-output" contenteditable="true">${body}</p>
  </section>
  <section class="quality-container">
  <div class="left-quality-container">
  <img onclick="vote('down')" data-ideaID="${id}" class="quality-icons downvote-btn" src="images/downvote.svg">
  <img onclick="vote('up')" data-ideaID="${id}" class="quality-icons upvote-btn" src="images/upvote.svg">
  <h2 class="quality-header">Quality: <span class="quality-actual">${quality}<span></h2>
  </div>
  <div class="right-quality-container">
  <img class="quality-icons delete-btn" src="images/delete.svg">
  </div>
  </section>
  </article>`;
  cardsContainer.innerHTML = cardsContainer.innerHTML + card;
}

function cardButtonPushed() {
  checkDeleteButton();
}

function checkDeleteButton() {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
   var cardToDeleteId = event.target.closest('article').id;
   Idea.prototype.deleteFromStorage(cardToDeleteId);
   updateIdeaArray();
 }
}


function vote(type) {
  var ideaID = event.target.dataset.ideaid;
  var qualityStatus = event.target.parentElement.childNodes[5].firstElementChild.innerText;
  var qualityIndex = qualityList.indexOf(qualityStatus);
  var output = "";
  var newQuality = "";
  if (type ==='up') {
    newQuality = qualityIndex === qualityList.length-1 ? qualityList[qualityList.length-1] : qualityList[qualityIndex + 1];
    output = event.target.parentElement.childNodes[5].firstElementChild; 
  } else if (type === 'down') {
    newQuality = qualityIndex === 0 ? qualityList[0] : qualityList[qualityIndex - 1];
    output = event.target.parentElement.childNodes[5].firstElementChild;  
  }
  output.innerText = newQuality;
  Idea.prototype.updateQuality(ideaID, newQuality);
}


function enableButtons() {
   if (titleInput.value === '' || bodyInput.value === ''){
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}


function updateIdeaArray(){
  return document.getElementsByClassName('idea-card');
}


function filterSearch() {
  var filterInput = searchBarInput.value.toLowerCase();
  var ideaArray = updateIdeaArray();
  for (var i = 0; i < ideaArray.length; i++) {  
    if(ideaArray[i].childNodes[1].childNodes[1].innerText.toLowerCase().indexOf(filterInput) === -1 
      && ideaArray[i].childNodes[1].childNodes[3].innerText.toLowerCase().indexOf(filterInput) === -1) {
      ideaArray[i].setAttribute("style", "display: none");
      } else {
      ideaArray[i].setAttribute("style", "display: block");
    } 
  }
}