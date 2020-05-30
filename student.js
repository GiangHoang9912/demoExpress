class Student {
  constructor(name, subject, average) {
    this.name = name;
    this.subject = subject;
    this.average = average;
  }
  avg() {
    let sum = 0;
    for (const sub of this.subject) {
      sum += Number(sub);
    }

    const avg = sum / this.subject.length;
    return Number(avg.toFixed(2));
  }
}




export default Student;