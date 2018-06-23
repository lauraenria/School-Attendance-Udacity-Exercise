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
    view.checkMissedDay(model.attendance, model.numberOfDays);
    this.createDataForStudent(model.students, model.attendance);
  },

  createData: function() {
    if (!localStorage.attendance) {
      console.log("Creating attendance records...");
      function getRandom() {
        return Math.random() >= 0.5;
      }
    }
  },

  createDataForStudent: function(array, obj) {
    const defaultAttendance = array.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, obj);

    return defaultAttendance;
  }
};

// Student Application
view = {
  // This function create a tbody element and I attach to it each student's line (name, radio button, result missing days)
  // I pass as an argumets the numbers of days and the array of students's names.
  createBody: function(numberOfDays, students) {
    let tbody = document.createElement("tbody");
    // for each name's student in the array I create one line thanks the function createStudentLine()
    // that takes the numbers of days and one student name.
    students.forEach(student => {
      tbody.appendChild(this.createStudentLine(numberOfDays, student));
    });

    return tbody;
  },

  // this function create one student line and use createName(), createCheck() and createMissedDays();
  createStudentLine: function(numberOfDays, student) {
    let tr = document.createElement("tr");
    tr.classList.add("student");
    tr.appendChild(this.createName(student));
    for (let i = 1; i <= numberOfDays; i++) {
      const dayCheck = this.createCheck(i);
      tr.appendChild(dayCheck);
    }

    tr.appendChild(this.createMissedDays(numberOfDays));
    return tr;
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

  createField: function(element, classList, textName) {
    let field = document.createElement(element);
    field.classList.add(classList);
    field.innerText = textName;
    return field;
  },

  createName: function(textName) {
    return this.createField("td", "name-col", textName);
  },

  createMissedDays: function(number) {
    return this.createField("td", "missed-col", number);
  },

  checkMissedDay: function(attendance, numberOfDays) {
    let studentsNode = document.querySelectorAll(".student");

    studentsNode.forEach(student => {
      // // I turn the nodelist element in array and I take the first Element
      let studentName = Array.from(student.childNodes)[0];

      // I turn the nodelist element in array and I remove the nameStudend and missedDays colums
      let days = Array.from(student.childNodes).slice(1, -1);
      days.forEach(day => {
        day.addEventListener("click", function(e) {
          if (e.target.nodeName === "INPUT") {
            // fix double class selection
            let nameStudent = day.parentNode.firstChild.textContent;
            let missedDays = day.parentNode.lastChild;

            if (day.className === "attend-col false") {
              day.className = "attend-col true";
              attendance[nameStudent] += 1;
              number = numberOfDays - attendance[nameStudent];
              missedDays.innerText = number;
            } else if (day.className === "attend-col true") {
              day.className = "attend-col false";
              attendance[nameStudent] -= 1;
              number = numberOfDays - attendance[nameStudent];
              missedDays.innerText = number;
            }
          }
        });
      });
    });
  },

  createDataForStudent: function() {
    let students = document.querySelectorAll(".student");
    let studentName = Array.from(student.childNodes)[0];
  },

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
    return view.createField("th", "missed-col", "Days Missed-col");
  },

  createStudentName: function() {
    return view.createField("th","name-col", "Student Name");
  }
};

octopus.init();
