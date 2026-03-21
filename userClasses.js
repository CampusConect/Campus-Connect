// ════════════════════════════════════════════════════
//  BASE CLASS: User
// ════════════════════════════════════════════════════
class User {
  constructor(userid, name, email, password, role) {
    this.userid   = userid;
    this.name     = name;
    this.email    = email;
    this.password = password;
    this.role     = role;
  }

  getName()  { return this.name; }
  getEmail() { return this.email; }
  getRole()  { return this.role; }
  getId()    { return this.userid; }

  setName(n)     { this.name = n; }
  setEmail(e)    { this.email = e; }
  setPassword(p) { this.password = p; }

  login(email, password) {
    return this.email === email && this.password === password;
  }

  showDashboard() {
    console.log(`Welcome ${this.name} (${this.role})`);
  }
}

// ════════════════════════════════════════════════════
//  DERIVED CLASS: Student  (inherits User)
//  UC-01, UC-02, UC-05, UC-07, UC-09, UC-12,
//  UC-13, UC-14, UC-15, UC-16
// ════════════════════════════════════════════════════
class Student extends User {
  constructor(userid, studentid, name, email, password, rollnum, program, semester) {
    super(userid, name, email, password, "student");
    this.studentid  = studentid;
    this.rollnum    = rollnum;
    this.program    = program;
    this.semester   = semester;

    this.attendanceList  = [];
    this.marksList       = [];
    this.transcripts     = [];
    this.challans        = [];
    this.registrations   = [];
    this.bookings        = [];
    this.complaints      = [];
    this.achievements    = [];
  }

  getStudentId() { return this.studentid; }
  getRollNum()   { return this.rollnum; }
  getProgram()   { return this.program; }
  getSemester()  { return this.semester; }

  showDashboard() {
    console.log(`=== Student Dashboard ===`);
    console.log(`Name: ${this.name} | Roll: ${this.rollnum} | Sem: ${this.semester}`);
  }

  // UC-05: view attendance
  viewAttendance() {
    console.log("--- Attendance ---");
    this.attendanceList.forEach(a => a.display());
  }

  // UC-07: view marks
  viewMarks() {
    console.log("--- Marks ---");
    this.marksList.forEach(m => m.display());
  }

  // UC-09: view transcript
  viewTranscript() {
    console.log("--- Transcript ---");
    this.transcripts.forEach(t => t.display());
  }

  // UC-12: view fee challan
  viewChallan() {
    console.log("--- Fee Challan ---");
    this.challans.forEach(f => f.display());
  }

  // UC-14: view registered courses
  viewRegistrations() {
    console.log("--- Registered Courses ---");
    this.registrations.forEach(r => r.display());
  }

  // UC-13: view court bookings
  viewBookings() {
    console.log("--- Court Bookings ---");
    this.bookings.forEach(b => b.display());
  }

  addAttendance(a)   { this.attendanceList.push(a); }
  addMarks(m)        { this.marksList.push(m); }
  addTranscript(t)   { this.transcripts.push(t); }
  addChallan(f)      { this.challans.push(f); }
  addRegistration(r) { this.registrations.push(r); }
  addBooking(b)      { this.bookings.push(b); }
  addComplaint(c)    { this.complaints.push(c); }
  addAchievement(a)  { this.achievements.push(a); }
}

// ════════════════════════════════════════════════════
//  DERIVED CLASS: Teacher  (inherits User)
//  UC-03, UC-04, UC-06, UC-08, UC-10, UC-17
// ════════════════════════════════════════════════════
class Teacher extends User {
  constructor(userid, teacherid, name, email, password, department) {
    super(userid, name, email, password, "teacher");
    this.teacherid  = teacherid;
    this.department = department;
    this.courses    = [];
  }

  getTeacherId()  { return this.teacherid; }
  getDepartment() { return this.department; }

  showDashboard() {
    console.log(`=== Teacher Dashboard ===`);
    console.log(`Name: ${this.name} | Dept: ${this.department}`);
  }

  updateAttendance(studentid, courseid, date, status) {
    // Returns a new Attendance object — import Attendance from classes.js if needed
    return { studentid, courseid, date, status };
  }

  updateMarks(studentid, courseid, asgn, exam, total) {
    // Returns a new Marks object — import Marks from classes.js if needed
    return { studentid, courseid, asgn, exam, total };
  }

  makeAnnouncement(title, text, date) {
    // Returns a new Announcement object — import Announcement from classes.js if needed
    return { postedbyid: this.userid, title, text, date };
  }

  addCourse(c) { this.courses.push(c); }

  viewCourses() {
    console.log("--- Courses Taught ---");
    this.courses.forEach(c => console.log(c));
  }
}

// ════════════════════════════════════════════════════
//  DERIVED CLASS: Admin  (inherits User)
//  UC-10, UC-11, UC-15, UC-17, UC-18
// ════════════════════════════════════════════════════
class Admin extends User {
  constructor(userid, adminid, name, email, password) {
    super(userid, name, email, password, "admin");
    this.adminid = adminid;
  }

  getAdminId() { return this.adminid; }

  showDashboard() {
    console.log(`=== Admin Dashboard ===`);
    console.log(`Name: ${this.name} | AdminID: ${this.adminid}`);
  }

  generateFeeChallan(studentid, fees, total, due) {
    // Returns a new FeeChallan object — import FeeChallan from classes.js if needed
    return { studentid, fees, total, due, payment: null, status: "due" };
  }

  generateTranscript(studentid, sem, gpa, date) {
    // Returns a new Transcript object — import Transcript from classes.js if needed
    return { studentid, sem, gpa, date };
  }

  addAchievement(studentid, title, desc, sem, gpa, date) {
    // Returns a new Achievement object — import Achievement from classes.js if needed
    return { studentid, title, desc, sem, gpa, date };
  }

  postAnnouncement(title, text, date) {
    // Returns a new Announcement object — import Announcement from classes.js if needed
    return { postedbyid: this.userid, title, text, date };
  }
}
class Course {
  constructor(courseid, coursecode, coursename, credithours, teacherid) {
    this.courseid    = courseid;
    this.coursecode  = coursecode;
    this.coursename  = coursename;
    this.credithours = credithours;
    this.teacherid   = teacherid;
  }

  getId()          { return this.courseid; }
  getCode()        { return this.coursecode; }
  getName()        { return this.coursename; }
  getCreditHours() { return this.credithours; }

  display() {
    console.log(`${this.coursecode} - ${this.coursename} (${this.credithours} cr hrs)`);
  }
}

module.exports = { User, Student, Teacher, Admin, Course };
