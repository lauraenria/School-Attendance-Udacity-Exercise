// model
model = {
  studends: [
    "Slappy the Frog",
    "Lilly the Lizard",
    "Paulrus the Walrus",
    "Gregory the Goat",
    "Adam the Anaconda"
  ],

  attendance: {},

  numberOfDays: 12
};

octopus = {
  init: function() {
    view.render(model.numberOfDays);
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
  createBody: function(numberOfDays) {
    let tbody = document.createElement("tbody");
    tbody.appendChild(this.createStudentLine(numberOfDays));
    return tbody;
  },

  createStudentLine: function(numberOfDays) {
    let tr = document.createElement("tr");
    tr.classList.add("student");
    tr.appendChild(this.createName("bobby"));
    for (let i = 1; i <= numberOfDays; i++) {
      const dayCheck = this.createCheck(i);
      tr.appendChild(dayCheck);
    }
    return tr;
  },

  createName: function(textName) {
    let td = document.createElement("td");
    td.classList.add("name-col");
    td.innerText = textName;
    return td;
  },

  createCheck: function() {
    let td = document.createElement("td");
    td.classList.add("attend-col");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    td.appendChild(input);
    return td;
  },

  render: function(numberOfDays) {
    if (model.studends) {
      let table = document.createElement("table");
      let tableHeader = viewHeader.createHeader(numberOfDays);
      table.appendChild(tableHeader);

      let mainDiv = document.querySelector("#attendance-data");
      mainDiv.appendChild(table);
      table.appendChild(this.createBody(numberOfDays));
    }
  }
};

viewHeader = {
  createHeader: function(numberOfDays) {
    let theader = document.createElement("thead");
    let tr = document.createElement("tr");
    let studentName = this.createStudentName();
    theader.appendChild(tr);
    tr.appendChild(studentName);
    for (let i = 1; i <= numberOfDays; i++) {
      const dayHeader = this.createDayHeader(i);
      tr.appendChild(dayHeader);
    }

    let missedCol = this.createMissedCol();
    tr.appendChild(missedCol);

    return theader;
  },

  createDayHeader: function(text) {
    let th = document.createElement("th");
    th.innerText = text;
    return th;
  },

  createMissedCol: function() {
    return this.createSpecialHeader("missed-col", "Days Missed-col");
  },

  createSpecialHeader: function(className, content) {
    let element = document.createElement("th");
    element.classList.add(className);
    element.innerText = content;
    return element;
  },

  createStudentName: function() {
    return this.createSpecialHeader("name-col", "Student Name");
  }
};

octopus.init();
