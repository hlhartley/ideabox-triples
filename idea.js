class Idea {
  constructor(title, body) {
    this.id = Math.floor(Date.now() / 1000); 
    this.title = title;
    this.body = body;
    this.quality = 1;
  }

  saveToStorage() {
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this));
  }

  deleteFromStorage(cardToDeleteId) {
    localStorage.removeItem(cardToDeleteId);
  }

  updateSelf(changedElement, changedTextID, text) {
   var idea = JSON.parse(localStorage.getItem(changedTextID));
   if (changedElement === 'title') {
    idea.title = text;
  } else if (changedElement === 'body') {
    idea.body = text;
  } 
  localStorage.setItem(changedTextID, JSON.stringify(idea));
}

  updateQuality(ideaID, newQualityIndex) {
    var idea = JSON.parse(localStorage.getItem(ideaID));
    idea.quality = newQualityIndex;
    localStorage.setItem(ideaID, JSON.stringify(idea));
  }
}

