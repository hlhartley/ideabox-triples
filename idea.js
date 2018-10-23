class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    console.log(this.body);
    console.log(this.title);
  }

  saveToStorage() {
    // save info to local storage
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

