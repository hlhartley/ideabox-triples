class Idea {
  constructor(title, body) {
    this.id = Math.floor(Date.now() / 1000); 
    this.title = title;
    this.body = body;
    this.quality = 'swill';
    console.log(this.body);
    console.log(this.title);
  }

 saveToStorage() {
    console.log(this);
  }


  deleteFromStorage() {
    // delete from local storage
  }

  updateSelf() {
    // after modifying card it will save to local storage
  }

  updateQuality() {
    // clicking up/down vote buttons will update quality
  }
}

// module.exports = Idea;
