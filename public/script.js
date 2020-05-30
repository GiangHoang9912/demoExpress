let currentIdEdit = null;
//#region //* reset text box
function resetInput() {
  for (const input of arrInput) {
    input.value = '';
  }
}
//#endregion
//#region //* createTableStudent
async function editStudent(id, tr) {
  const fetchStudent = await fetch(`/student/:${id}`, { method: 'GET' })
  const studentJson = await fetchStudent.json();
  inputName.value = studentJson[0].name;
  inputMath.value = studentJson[0].subject[0];
  inputPhysical.value = studentJson[0].subject[1];
  inputChemistry.value = studentJson[0].subject[2];
}
async function deleteStudent(id, tr) {
  const fetchStudent = await fetch(`/student/:${id}`, { method: 'DELETE' });
  if (fetchStudent.ok && fetchStudent.status === 200) {
    tr.remove();
  }
}
function createBtn(tr, text, _id) {
  const td = document.createElement('td');
  const btn = document.createElement('button');
  btn.setAttribute('id', 'id' + _id);
  btn.classList = _id;
  btn.setAttribute('value', text);
  const node = document.createTextNode(text);
  btn.appendChild(node);

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (btn.value.trim().toLowerCase() === "edit") {
      btnSubmit.textContent = 'Save';
      currentIdEdit = btn.className;
      editStudent(btn.className, tr);
    }
    if (btn.value.trim().toLowerCase() === "delete") {
      deleteStudent(btn.className, tr);
    }
  })

  td.appendChild(btn);
  tr.appendChild(td);
}
function createTd(tr, text) {
  const td = document.createElement('td');
  const node = document.createTextNode(text);
  td.appendChild(node);
  tr.appendChild(td);
}
function createTrStudent(student) {
  const tr = document.createElement('tr')
  tr.setAttribute('id', 'id' + student._id);
  createTd(tr, student.name);
  createTd(tr, student.subject[0]);
  createTd(tr, student.subject[1]);
  createTd(tr, student.subject[2]);
  createTd(tr, student.average);
  createBtn(tr, 'Edit', student._id);
  createBtn(tr, 'Delete', student._id);
  createBtn(tr, 'Show', student._id);

  display.appendChild(tr);
}
async function getStudents() {
  const fetchAllStudent = await fetch('/student', { method: 'GET' });
  const studentJson = await fetchAllStudent.json();
  studentJson.forEach(element => {
    createTrStudent(element);
  });
}
getStudents();
//#endregion

function showAvg() {
  const allTr = document.querySelectorAll('table tr');
  for (let i = 1; i < allTr.length; i++) {
    const allTd = allTr[i].querySelectorAll('td');
    const avg = (
      Number(allTd[1].textContent) +
      Number(allTd[2].textContent) +
      Number(allTd[3].textContent)
    ) / 3;
    allTd[4].textContent = avg.toFixed(2);
  };
}

//#region //* addEvent
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("a")
  if (btnSubmit.textContent.trim().toLowerCase() === 'submit') {
    const student = {
      name: inputName.value,
      subject: [inputMath.value, inputPhysical.value, inputChemistry.value],
      average: '?'
    }
    fetch('/student',
      {
        method: 'POST',
        body: JSON.stringify(student),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then((res) => {
        return res.json();
      }).then((data) => {
        createTrStudent(data);
        resetInput();
      })
  }
})



btnSubmit.addEventListener('click', async (e) => {
  const arrTd = document.querySelectorAll(`#id${currentIdEdit} td`);

  if (btnSubmit.textContent.trim().toLowerCase() === 'save') {
    const student = {
      name: inputName.value,
      subject: [inputMath.value, inputPhysical.value, inputChemistry.value],
      average: arrTd[4].textContent
    }
    const fetchStudent = await fetch(`./student/:${currentIdEdit}`, {
      method: 'PUT',
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });

    if (fetchStudent.ok && fetchStudent.status === 200) {

      arrTd[0].textContent = inputName.value;
      arrTd[1].textContent = inputMath.value;
      arrTd[2].textContent = inputPhysical.value;
      arrTd[3].textContent = inputChemistry.value;
      if (arrTd[4].textContent !== '?') {
        const avg = (
          Number(arrTd[1].textContent) +
          Number(arrTd[2].textContent) +
          Number(arrTd[3].textContent)
        ) / 3;
        arrTd[4].textContent = avg.toFixed(2);
      }
      resetInput();
      btnSubmit.textContent = 'Submit';
    }
  }
})



btnShowAvg.addEventListener('click', (e) => {
  e.preventDefault();
  showAvg();
})

btnShowPro.addEventListener('click', (e) => {
  e.preventDefault();
  const allTr = document.querySelectorAll('table tr');
  for (let i = 1; i < allTr.length; i++) {
    const allTd = allTr[i].querySelectorAll('td');
    if (Number(allTd[4].textContent) >= 8) {
      allTr[i].setAttribute('class', 'hightLight');
    }
  };
})
//#endregion