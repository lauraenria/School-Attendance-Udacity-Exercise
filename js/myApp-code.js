// model
model = {
  studends: [
    "Slappy the Frog",
    "Lilly the Lizard",
    "Paulrus the Walrus",
    "Gregory the Goat",
    "Adam the Anaconda"
  ],

  attendance: {}
};

octopus = {
  init: function() {
    view.init();
    // createData();
  },

  createData: function() {
    if (!localStorage.attendance) {
      console.log("Creating attendance records...");
      function getRandom() {
        return Math.random() >= 0.5;
      }
    }
  }
};

// Student Application
view = {
  init: function() {},

  createHeader: function() {
    let theader = document.createElement("thead");
    let tr = document.createElement("tr");
    let studentName = this.createStudentName();
    theader.appendChild(tr);
    tr.appendChild(studentName);
    for (let i = 1; i <= 12; i++) {
      const dayHeader = this.createDayHeader(i);
      tr.appendChild(dayHeader);
    }

    let missedCol = this.createMissedCol();
    tr.appendChild(missedCol);

    return theader;
  },

  createSpecialHeader: function(className, content) {
    let element = document.createElement("th");
    element.classList.add(className);
    element.innerText = content;
    return element;
  },

  createStudentName: function() {
    return this.createSpecialHeader("name-col", "Student Name");
  },

  createMissedCol: function() {
    return this.createSpecialHeader("missed-col", "Days Missed-col");
  },

  createDayHeader: function(text) {
    let th = document.createElement("th");
    th.innerText = text;
    return th;
  },

  render: function() {
    if (model.studends) {
      let table = document.createElement("table");
      let tableHeader = this.createHeader();
      table.appendChild(tableHeader);

      let mainDiv = document.querySelector("#attendance-data");
      mainDiv.appendChild(table);
    }
  }
};

view.render();
octopus.init();
