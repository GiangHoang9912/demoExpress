//! import
import bodyParser from 'body-parser';
import Student from './student.js';
import express from 'express';
import * as dbContext from './dbContext.js';
import path from "path";
import cors from 'cors'

const __dirname = process.cwd();
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
})

app.get('/student/:id', (req, res) => {
  const id = req.params.id;
  dbContext.findStudentById(res, id);
})

app.delete('/student/:id', (req, res) => {
  const id = req.params.id;
  dbContext.deleteStudentById(res, id);
})


app.put('/student/:id', (req, res) => {
  const id = req.params.id;
  const studentJson = req.body;
  const student = new Student(studentJson.name, studentJson.subject, studentJson.average);
  dbContext.updateStudentById(res, id, student);
})



app.get('/student', (req, res) => {
  dbContext.getAllStudents(res);
})

app.post('/student', (req, res) => {
  try {
    const studentJson = req.body;
    const student = new Student(studentJson.name, studentJson.subject, studentJson.average);
    dbContext.insertStudent(res, student)
  } catch (error) {
    console.log(error)
  }
})

app.listen(process.env.PORT || PORT, () => {
  console.log("server is running...!")
})

