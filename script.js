var cardQuality = document.querySelector('.card-quality');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-btn');
var titleOutput = document.querySelector('.title-output');
var bodyOutput = document.querySelector('.body-output');
var cardsContainer = document.querySelector('.cards-container');
var searchBarInput = document.querySelector('.search-bar-input');
var localStorageObjects = Object.keys(localStorage);

searchBarInput.addEventListener('keyup', filterSearch);
saveButton.addEventListener('click', createInitialCard);
cardsContainer.addEventListener('click', checkDeleteButton);
titleInput && bodyInput.addEventListener('keyup', disableSaveButton);
cardsContainer.addEventListener('change', saveUserInput);

function checkEnterKey(type) {
  var key = event.keyCode;
  if (key === 13) { 
    event.preventDefault();
    saveUserInput(type);
  }
}

function saveUserInput(text) {
  if (text === 'title') {
    var changedElement = 'title';
    var changedTextID = event.target.dataset.titleid;
    var changedTextValue = event.target.innerText;
  } else if (text === 'body') {
    var changedElement = 'body';
    var changedTextID = event.target.dataset.bodyid;
    var changedTextValue = event.target.innerText;
  }
  Idea.prototype.updateSelf(changedElement, changedTextID, changedTextValue);
}

function createInitialCard() {
  event.preventDefault();
  var idea = new Idea(titleInput.value, bodyInput.value);
  createCardTemplate(idea.id, idea.title, idea.body, idea.quality);
  idea.saveToStorage();
  clearInputs();
  disableSaveButton();
  updateIdeaArray();
}

function reinitializeCardsOnReload(limit, quality) {
  // if (quality === '') {
  //   show all
  // } else if (quality === 'garbage') {
  //   objectValue.quality === 0;
  // }

  // if (limit === '') {
  //   index <= 10
  // } else {
    
  // }

  localStorageObjects.forEach(function(localObject, index) {
    var objectValue = JSON.parse(Object.values(localStorage)[index]);
    createCardTemplate(objectValue.id, objectValue.title, objectValue.body, objectValue.quality);
  })
}

// if limit = 0, stop at 10
// pass parameter to reinitialize function
// show more button limit function to 10 iterations

reinitializeCardsOnReload();
updateIdeaArray();

function createCardTemplate(id, title, body, quality) {
  var qualityList = ['Garbage','Swill','Plausible','Genius','Louisa Tier'];
  var cardsContainer = document.querySelector('.cards-container');
  var stringQuality = qualityList[quality];
  var newCard = `<article id="${id}" class="idea-card">
  <section class="output-container">
  <h1 onkeydown="checkEnterKey('title')" onfocusout="saveUserInput('title')" data-titleID="${id}" class="title-output" contenteditable="true">${title}</h1> 
  <p onkeydown="checkEnterKey('body')" onfocusout="saveUserInput('body')" data-bodyID="${id}" class="body-output" contenteditable="true">${body}</p>
  </section>
  <section class="quality-container">
  <div class="left-quality-container">
  <img onclick="updateVote('down')" data-ideaID="${id}" class="quality-icons downvote-btn" src="images/downvote.svg">
  <img onclick="updateVote('up')" data-ideaID="${id}" class="quality-icons upvote-btn" src="images/upvote.svg">
  <h2 class="quality-header">Quality: <span class="quality-actual">${stringQuality}<span></h2>
  </div>
  <div class="right-quality-container">
  <img class="quality-icons delete-btn" src="images/delete.svg">
  </div>
  </section>
  </article>`;
  cardsContainer.innerHTML = cardsContainer.innerHTML + newCard;
}

function checkDeleteButton() {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('article').remove();
   var cardToDeleteId = event.target.closest('article').id;
   Idea.prototype.deleteFromStorage(cardToDeleteId);
   updateIdeaArray();
 }
}


function updateVote(type) {
  var qualityList = ['Garbage','Swill','Plausible','Genius','Louisa Tier'];
  var ideaID = event.target.dataset.ideaid;
  var qualityStatus = event.target.parentElement.childNodes[5].firstElementChild.innerText;
  var qualityIndex = qualityList.indexOf(qualityStatus);

  if (type ==='up' && (qualityIndex === qualityList.length-1)) {
    var newQualityIndex = qualityList.length-1; 
  } else if (type ==='up') {
   var newQualityIndex = qualityIndex + 1;
  }
    if (type === 'down' && qualityIndex === 0) {
    var newQualityIndex = 0; 
  } else if (type === 'down') { 
    var newQualityIndex = qualityIndex - 1;    
  }

  var output = event.target.parentElement.childNodes[5].firstElementChild; 
  output.innerText = qualityList[newQualityIndex];
  Idea.prototype.updateQuality(ideaID, newQualityIndex);
}

function disableSaveButton() {
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
      ideaArray[i].setAttribute('style', 'display: none');
      } else {
      ideaArray[i].setAttribute('style', 'display: block');
    } 
  }
}

// var garbageButton = document.querySelector('.garbage-button');
// var swillButton = document.querySelector('.swill-button');
// var plausibleButton = document.querySelector('.swill-button');
// var geniusButton = document.querySelector('.genius-button');
// var louisaTierButton = document.querySelector('.louisa-tier-button');

// garbageButton.addEventListener('click', filterByQuality);
// swillButton.addEventListener('click', filterByQuality);
// plausibleButton.addEventListener('click', filterByQuality);
// geniusButton.addEventListener('click', filterByQuality);
// louisaTierButton.addEventListener('click', filterByQuality);

// function updateQualityArray() {
//   return document.getElementsByClassName('quality-header');
// }

// function filterByQuality() {
//  var qualityArray = updateQualityArray();
//  for (var i = 0; i < qualityArray.length; i++) {
//   if(qualityArray[i].innerText === 'Garbage' {
//     qualityArray[i].
//   } 

//   }
//  }  
// }




