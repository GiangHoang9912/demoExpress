import Datastore from 'nedb';
import * as validate from './validateInput.js';

const db = new Datastore({ filename: './data.db' });
db.loadDatabase();

function findStudentById(res, id) {
  id = id.replace(":", '')
  db.find({ _id: id }, (err, data) => {
    res.json(data);
    res.end();
  });
}

function deleteStudentById(res, id) {
  id = id.replace(":", '')
  db.remove({ _id: id }, {}, function (err, numRemoved) {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`delete ${numRemoved} line.`);
    res.end();
  });
}


function updateStudentById(res, id, student) {
  id = id.replace(":", '')
  if (student.average !== '?') {
    student.average = student.avg();
  }
  db.update({ _id: id }, {
    name: student.name,
    subject: student.subject,
    average: student.average
  }, {}, function (err, numReplaced) {
    if (err) {
      console.log(err)
      return;
    }
    res.send(`update ${numReplaced} line.`);
    res.end();
  })
}

function getAllStudents(res) {
  let arrStudentJson = [];
  db.find({}, (err, data) => {
    if (err) {
      console.log(err)
      return;
    }
    for (const student of data) {
      arrStudentJson.push(student);
    }
    res.json(arrStudentJson);
    res.end();
  })
}



function insertStudent(res, student) {
  if (student && validate.validateName(student.name)
    && validate.validateScore(student.subject[0])
    && validate.validateScore(student.subject[1])
    && validate.validateScore(student.subject[2])) {
    db.insert(student, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(data)
      res.end();
    })

  } else {
    throw new Error(`can't insert ${student.name} to database..!`)
  }
}

export { insertStudent, getAllStudents, findStudentById, deleteStudentById, updateStudentById }