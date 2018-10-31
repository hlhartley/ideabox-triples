// ** Event Listeners **
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);
document.querySelector('.title-input') && document.querySelector('.body-input').addEventListener('keyup', disableSaveButton);
document.querySelector('.cards-container').addEventListener('click', checkDeleteButton);
document.querySelector('.cards-container').addEventListener('change', saveUserInput);
document.querySelector('.save-btn').addEventListener('click', createInitialCard);
document.querySelector('.garbage-button').addEventListener('click', filterByQuality);
document.querySelector('.swill-button').addEventListener('click', filterByQuality);
document.querySelector('.plausible-button').addEventListener('click', filterByQuality);
document.querySelector('.genius-button').addEventListener('click', filterByQuality);
document.querySelector('.louisa-tier-button').addEventListener('click', filterByQuality);
document.querySelector('.show-all-button').addEventListener('click', showAllIdeas);

// ** Functions **
function showMoreCards() {
  cardsContainer.classList.remove('max-height');
  showMore.classList.toggle('more-less-toggle');
  showLess.classList.toggle('more-less-toggle');
}

function showLessCards() {
  cardsContainer.classList.add('max-height');
  showMore.classList.toggle('more-less-toggle');
  showLess.classList.toggle('more-less-toggle');
}

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
   var titleInput = document.querySelector('.title-input');
  var bodyInput = document.querySelector('.body-input');
  event.preventDefault();
  var idea = new Idea(titleInput.value, bodyInput.value);
  createCardTemplate(idea.id, idea.title, idea.body, idea.quality);
  idea.saveToStorage();
  clearInputs();
  disableSaveButton();
  updateIdeaArray();
}

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
  cardsContainer.innerHTML = newCard + cardsContainer.innerHTML;
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
   var saveButton = document.querySelector('.save-btn');
  var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
   if (titleInput.value === '' || bodyInput.value === ''){
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function clearInputs() {
  var titleInput = document.querySelector('.title-input');
  var bodyInput = document.querySelector('.body-input');
  titleInput.value = '';
  bodyInput.value = '';
}

function updateIdeaArray(){
  return document.getElementsByClassName('idea-card');
}

function filterSearch() {
  var searchBarInput = document.querySelector('.search-bar-input');
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


function displayIdeas() {
  const mostRecentFilter = localStorage.mostRecentFilter;
  if (mostRecentFilter) {
    showFilteredIdeas(mostRecentFilter);
  } else {
    showAllIdeas();
  }
}

displayIdeas();

function showAllIdeas() {

  removeAll();
   delete localStorage.mostRecentFilter;
  allIdeas().forEach(function(idea) {
    // This is called destructuring, to minimize so many variable declarations:
    const { id, title, body, quality } = idea;
    // var id = idea.id;
    // var title = idea.title;
    // var body = idea.body;
    // var quality = idea.quality;
    createCardTemplate(id, title, body, quality);
  })
}

function showFilteredIdeas(filterQualityNumber) {

  removeAll();
  // Loop over all the filteredIdeas, and for each one call createCardTemplate()
  filteredIdeas(filterQualityNumber).forEach(function(idea){
    const { id, title, body, quality } = idea;
    createCardTemplate(id, title, body, quality);
  })
}


function allIdeas() {
  // Make a copy of localStorage locally so you don't mutate your source of truth (data store)
  // In JavaScript, arrays and objects are sort of called by reference (techically called by sharing)
  // while primitive values (string, number, boolean) are called by value
  // This means that if you assign one object to another variable (let tempStorage = localStorage)
  // Both these things (localStorage and tempStorage) will point to the same place in memory
  // So... when you delete or change one, actually both will change
  // To truly copy localStorage to a new space in memory you can do Object.assign like below.
  // Or you could use the spread operator:
  // Now changing tempStorage won't mess with localStorage
  let tempStorage = Object.assign({}, localStorage);
  // let tempStorage = { ...localStorage };
  // Important to delete the key value pair for mostRecentFilter (Object.values would have grabbed that)
  delete tempStorage.mostRecentFilter;

  return Object.values(tempStorage).map(function(ideaString) {
    return JSON.parse(ideaString);
  })
}

function filteredIdeas(filterQualityNumber) {
  return allIdeas().filter(function(eachIdea) {
    return eachIdea.quality == filterQualityNumber;
  })
}

function filterByQuality() {
  const filterQualityNumber = event.target.dataset.qualitynumber;
  // Step 0: Save this qualityNumber in localStorage, so you can remember what was the most recent filtered item
  localStorage.setItem('mostRecentFilter', filterQualityNumber);
  // step 1: clear cards cards-container
  // removeAll(); 
  // step 2: filter all ideas by quality
  // step 3: repopulate cards-container with this filtered quality ideas
  showFilteredIdeas(filterQualityNumber);
}

function removeAll() {
  var cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = ''; 
}


// NOTES:
// var localStorage = {
//   2321321: "some idea as an object",
//   2321321: "some idea as an object",
//   2321321: "some idea as an object",
//   2321321: "some idea as an object",

//   'mostRecentFilter': "3",
//   // Another way to design your local storage
//   // filteredIdeas: [],
// }





