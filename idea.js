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

  updateQuality(cardIdOfButton, newQualityStatus) {
    var cardToUpdateQuality = localStorage.getItem(cardIdOfButton);
    var parsedQuality = JSON.parse(cardToUpdateQuality);
    parsedQuality.quality = newQualityStatus;
    localStorage.setItem(cardIdOfButton, JSON.stringify(parsedQuality));
    // console.log('hi');
  }
}

// module.exports = Idea;
