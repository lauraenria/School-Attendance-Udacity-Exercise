// model
model = {
  students: [
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
    view.render(model.numberOfDays, model.students);
    this.createDataForStudent(model.students);
    this.addStudent(model.students);
  },

  createData: function() {
    if (!localStorage.attendance) {
      console.log("Creating attendance records...");
      function getRandom() {
        return Math.random() >= 0.5;
      }
    }
  },

  createDataForStudent: function() {
    let attendance = new Map();

    model.students.forEach(student => {
      attendance.set(student, 0);
    });

    model.attendance = attendance;
  },

  addStudent: function(data) {
    return data;
  }
};

// Student Application
view = {
  createBody: function(numberOfDays, students) {
    console.log(numberOfDays, students);
    let tbody = document.createElement("tbody");

    students.forEach(student => {
      tbody.appendChild(this.createStudentLine(numberOfDays, student));
    });

    return tbody;
  },

  createStudentLine: function(numberOfDays, student) {
    let tr = document.createElement("tr");
    tr.classList.add("student");
    tr.appendChild(this.createName(student));
    for (let i = 1; i <= numberOfDays; i++) {
      const dayCheck = this.createCheck(i);
      tr.appendChild(dayCheck);
    }

    tr.appendChild(this.createMissedDays());
    return tr;
  },

  // to refactoring?
  createName: function(textName) {
    let td = document.createElement("td");
    td.classList.add("name-col");
    td.innerText = textName;
    return td;
  },

  createCheck: function() {
    let td = document.createElement("td");
    td.classList.add("attend-col");
    td.classList.add("false");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    td.appendChild(input);
    return td;
  },

  // to refactoring?
  createMissedDays: function(number) {
    let td = document.createElement("td");
    td.classList.add("missed-col");
    td.innerText = number || 0;
    return td;
  },

  checkMissedDay: function(attendance) {
    let student = document.querySelector(".student");

    // // I turn the nodelist element in array and I take the first Element
    let studentName = Array.from(student.childNodes)[0];
    // console.log(studentName);

    // I turn the nodelist element in array and I remove the nameStudend and missedDays colums
    let days = Array.from(student.childNodes).slice(1, -1);
    days.forEach(day => {
      day.addEventListener("click", function() {
        // fix double class selection

        if (day.className === "attend-col false") {
          console.log(day, day.className);
          day.className = "attend-col true";
        } else if (day.className === "attend-col true") {
          day.className = "attend-col false";
          console.log(day, day.className);
        }
      });
    });
  },

  createDataForStudent: function() {
    let students = document.querySelectorAll(".student");
    let studentName = Array.from(student.childNodes)[0];
  },

  countMissedDays: function() {},

  render: function(numberOfDays, students) {
    if (model.students) {
      let table = document.createElement("table");
      let tableHeader = viewHeader.createHeader(numberOfDays);
      table.appendChild(tableHeader);

      let mainDiv = document.querySelector("#attendance-data");
      mainDiv.appendChild(table);
      table.appendChild(this.createBody(numberOfDays, students));
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
view.checkMissedDay(model.attendance);
