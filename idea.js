class Idea {
  constructor(title, body) {
    this.id = Math.floor(Date.now() / 1000); 
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }

  saveToStorage() {
    localStorage.setItem(JSON.stringify(this.id),JSON.stringify(this));
  }


  deleteFromStorage(cardToDeleteId) {
    localStorage.removeItem(cardToDeleteId);
  }

  updateSelf() {
    // after modifying card it will save to local storage
  }

  updateQuality(ideaID, newQuality) {
    // var cardToUpdateQuality = localStorage.getItem(cardIdOfButton);
    // var parsedQuality = JSON.parse(cardToUpdateQuality);
    // parsedQuality.quality = newQualityStatus;
    // localStorage.setItem(cardIdOfButton, JSON.stringify(parsedQuality));
    var idea = JSON.parse(localStorage.getItem(ideaID));
    idea.quality = newQuality;
    localStorage.setItem(ideaID, JSON.stringify(idea));
  }
}

