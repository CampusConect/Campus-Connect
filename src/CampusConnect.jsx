import { useState, useEffect } from "react";

/* ── STORAGE ──────────────────────────────────────────────────── */
const DB = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  getUsers: () => DB.get("cc_users") || [],
  saveUsers: (u) => DB.set("cc_users", u),
  getSession: () => DB.get("cc_session"),
  saveSession: (u) => DB.set("cc_session", u),
  clearSession: () => localStorage.removeItem("cc_session"),
  getData: (key) => DB.get("cc_" + key) || [],
  setData: (key, v) => DB.set("cc_" + key, v),
};

/* ── AUTH ─────────────────────────────────────────────────────── */
function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name:"", email:"", password:"", rollno:"", empId:"" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const set = (k) => (e) => { setErr(""); setForm(f => ({ ...f, [k]: e.target.value })); };

  const signup = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return setErr("All fields are required.");
    if (role === "student" && !form.rollno.trim()) return setErr("Roll number is required.");
    if (role === "teacher" && !form.empId.trim()) return setErr("Employee ID is required.");
    const users = DB.getUsers();
    if (users.find(u => u.email === form.email.trim().toLowerCase())) return setErr("Email already registered.");
    const user = {
      id: Date.now().toString(), name: form.name.trim(),
      email: form.email.trim().toLowerCase(), password: form.password, role,
      ...(role === "student" ? { rollno: form.rollno.trim(), program: "", semester: 1 } : {}),
      ...(role === "teacher" ? { empId: form.empId.trim(), dept: "" } : {}),
    };
    DB.saveUsers([...users, user]);
    DB.saveSession(user);
    setOk("Account created!");
    setTimeout(() => onLogin(user), 500);
  };

  const login = () => {
    if (!form.email.trim() || !form.password.trim()) return setErr("Enter email and password.");
    const users = DB.getUsers();
    const user = users.find(u => u.email === form.email.trim().toLowerCase() && u.password === form.password);
    if (!user) return setErr("Invalid email or password.");
    DB.saveSession(user);
    onLogin(user);
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Welcome to<br/>CampusConnect</h1>
          <p>The premium portal for FAST-NUCES students, faculty, and administration.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-logo">Campus<span>Connect</span></div>
          <div className="auth-sub">Manage your academic journey</div>
          
          {err && <div className="alert alert-error">{err}</div>}
          {ok  && <div className="alert alert-success">{ok}</div>}
          
          <div className="auth-tabs">
            {["student","teacher","admin"].map(r => (
              <button key={r} className={`auth-tab ${role===r?"active":""}`} onClick={() => setRole(r)}>
                {r==="student"?"👨‍🎓":r==="teacher"?"🧑‍🏫":"⚙️"} {r.charAt(0).toUpperCase()+r.slice(1)}
              </button>
            ))}
          </div>
          
          <div style={{ marginBottom: 24 }}>
            {mode==="signup" && (
              <div className="form-group">
                <label>Full Name</label>
                <input className="input-field" placeholder="Your full name" value={form.name} onChange={set("name")} />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input className="input-field" type="email" placeholder="your@nu.edu.pk" value={form.email} onChange={set("email")} />
            </div>
            {mode==="signup" && role==="student" && (
              <div className="form-group">
                <label>Roll Number</label>
                <input className="input-field" placeholder="24L-xxxx" value={form.rollno} onChange={set("rollno")} />
              </div>
            )}
            {mode==="signup" && role==="teacher" && (
              <div className="form-group">
                <label>Employee ID</label>
                <input className="input-field" placeholder="FAC-xxx" value={form.empId} onChange={set("empId")} />
              </div>
            )}
            <div className="form-group">
              <label>Password</label>
              <input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
            </div>
          </div>
          
          <button className="btn-primary" style={{ width: "100%" }} onClick={mode==="login"?login:signup}>
            {mode==="login"?"Sign In →":"Create Account →"}
          </button>
          
          <div className="auth-switch">
            {mode==="login"
              ? <>Don't have an account? <button onClick={()=>{setMode("signup");setErr("");}}>Sign Up</button></>
              : <>Already have an account? <button onClick={()=>{setMode("login");setErr("");}}>Sign In</button></>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD ────────────────────────────────────────────────── */
function Dashboard({ user }) {
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name} 👋</h1>
        <p className="page-subtitle">
          {user.role==="student" && `${user.rollno||"Roll not set"} · Semester ${user.semester||1}`}
          {user.role==="teacher" && `${user.dept||"Department not set"} · Faculty`}
          {user.role==="admin"   && "System Administrator"}
        </p>
      </div>
      
      <div className="card">
        <div className="card-title">Getting Started</div>
        <p style={{color:"var(--text-muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
          {user.role==="student" && "Use the sidebar to view attendance, marks, register for courses, pay fee, book courts, and more."}
          {user.role==="teacher" && "Use the sidebar to mark attendance, upload marks, generate transcripts, and post announcements."}
          {user.role==="admin"   && "Use the sidebar to add courses, generate fee challans, manage transcripts, and review complaints."}
        </p>
        <div style={{ height: 1, background: "var(--border-light)", margin: "20px 0" }} />
        <div style={{ fontSize: 14, color: "var(--text-main)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>📧</span> {user.email}
          </div>
          {user.role==="student" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🎓</span> {user.program||"Program not set"} · Semester {user.semester||1}
            </div>
          )}
          {user.role==="teacher" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>🏫</span> Emp ID: {user.empId||"—"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── PROFILE ──────────────────────────────────────────────────── */
function Profile({ user, onUpdate }) {
  const [form, setForm] = useState({ name:user.name, email:user.email, phone:user.phone||"", program:user.program||"", dept:user.dept||"", semester:user.semester||1, newPass:"" });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");
  const s = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const save = () => {
    if (!form.name.trim()||!form.email.trim()) return setErr("Name and email required.");
    const users = DB.getUsers();
    const idx = users.findIndex(u=>u.id===user.id);
    if (idx===-1) return setErr("User not found.");
    const updated = {...users[idx], name:form.name.trim(), email:form.email.trim().toLowerCase(), phone:form.phone.trim(), program:form.program.trim(), dept:form.dept.trim(), semester:Number(form.semester)};
    if (form.newPass.trim()) updated.password = form.newPass.trim();
    users[idx] = updated;
    DB.saveUsers(users); DB.saveSession(updated);
    setOk("Profile updated successfully!"); setErr(""); onUpdate(updated);
    setTimeout(()=>setOk(""),3000);
  };
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your personal information</p>
      </div>
      
      <div className="card" style={{ maxWidth: 600 }}>
        {err&&<div className="alert alert-error">{err}</div>}
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group"><label>Full Name</label><input className="input-field" value={form.name} onChange={s("name")} /></div>
          <div className="form-group"><label>Email Address</label><input className="input-field" type="email" value={form.email} onChange={s("email")} /></div>
        </div>
        
        <div className="form-grid">
          <div className="form-group"><label>Phone Number</label><input className="input-field" placeholder="03xx-xxxxxxx" value={form.phone} onChange={s("phone")} /></div>
          {user.role==="student"&&<div className="form-group"><label>Program</label><input className="input-field" placeholder="e.g. BS CS" value={form.program} onChange={s("program")} /></div>}
          {user.role==="teacher"&&<div className="form-group"><label>Department</label><input className="input-field" placeholder="e.g. Computer Science" value={form.dept} onChange={s("dept")} /></div>}
        </div>
        
        {user.role==="student"&&<div className="form-grid"><div className="form-group"><label>Current Semester</label><input className="input-field" type="number" min="1" max="8" value={form.semester} onChange={s("semester")} /></div></div>}
        
        <div style={{ height: 1, background: "var(--border-light)", margin: "24px 0" }} />
        
        <div className="form-group" style={{ marginBottom: 24, maxWidth: "50%" }}>
          <label>New Password <span style={{fontWeight:400, color:"var(--text-muted)"}}>(leave blank to keep current)</span></label>
          <input className="input-field" type="password" placeholder="••••••••" value={form.newPass} onChange={s("newPass")} />
        </div>
        
        <button className="btn-primary" onClick={save}>Save Changes</button>
      </div>
    </div>
  );
}

/* ── ATTENDANCE ───────────────────────────────────────────────── */
function Attendance({ user }) {
  const isTeacher = user.role==="teacher";
  const allAtt = DB.getData("att_all");
  const students = DB.getUsers().filter(u=>u.role==="student");
  const [course, setCourse] = useState(""); const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [status, setStatus] = useState("Present"); const [selStudent, setSelStudent] = useState(""); const [ok, setOk] = useState("");
  const [records, setRecords] = useState(allAtt);

  const markAtt = () => {
    if (!course.trim()||!selStudent) return;
    const entry = { id:Date.now().toString(), teacherId:user.id, teacherName:user.name, studentId:selStudent, course:course.trim(), date, status };
    const updated = [...records, entry];
    DB.setData("att_all", updated); setRecords(updated);
    setOk("Attendance saved!"); setTimeout(()=>setOk(""),2000);
  };

  if (!isTeacher) {
    const mine = records.filter(r=>r.studentId===user.id);
    return (
      <div className="fade-in">
        <div className="page-header">
          <h1 className="page-title">My Attendance</h1>
          <p className="page-subtitle">View records marked by your instructors</p>
        </div>
        {mine.length===0 ? 
          <div className="card empty-state">
            <div className="empty-icon">📅</div>
            <div className="empty-text">No attendance records found.</div>
          </div>
        : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Course</th><th>Date</th><th>Status</th><th>Teacher</th></tr></thead>
                <tbody>
                  {mine.map(r=>(
                    <tr key={r.id}>
                      <td style={{fontWeight:500}}>{r.course}</td>
                      <td>{r.date}</td>
                      <td>
                        <span className={`badge ${r.status==="Present"?"badge-success":r.status==="Absent"?"badge-danger":"badge-warning"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>{r.teacherName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    );
  }

  const myMarked = records.filter(r=>r.teacherId===user.id);
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Mark Attendance</h1>
        <p className="page-subtitle">Record daily attendance for your students</p>
      </div>
      
      <div className="card" style={{ maxWidth: 600 }}>
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group"><label>Course Name</label><input className="input-field" placeholder="e.g. Object Oriented Programming" value={course} onChange={e=>setCourse(e.target.value)} /></div>
          <div className="form-group"><label>Date</label><input className="input-field" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Student</label>
            <select className="input-field" value={selStudent} onChange={e=>setSelStudent(e.target.value)}>
              <option value="">Select a student...</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="input-field" value={status} onChange={e=>setStatus(e.target.value)}>
              <option>Present</option><option>Absent</option><option>Leave</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={markAtt}>Save Record</button>
      </div>
      
      {myMarked.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Recent Records</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Student</th><th>Course</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {[...myMarked].reverse().slice(0,15).map(r=>{
                  const stu=students.find(u=>u.id===r.studentId);
                  return (
                    <tr key={r.id}>
                      <td style={{fontWeight:500}}>{stu?.name||"—"}</td>
                      <td>{r.course}</td>
                      <td>{r.date}</td>
                      <td>
                        <span className={`badge ${r.status==="Present"?"badge-success":r.status==="Absent"?"badge-danger":"badge-warning"}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MARKS ────────────────────────────────────────────────────── */
function Marks({ user }) {
  const isTeacher = user.role==="teacher"||user.role==="admin";
  const students = DB.getUsers().filter(u=>u.role==="student");
  const [allMarks, setAllMarks] = useState(()=>DB.getData("marks_all"));
  const [form, setForm] = useState({studentId:"",course:"",quiz:"",assignment:"",mid:"",final:""});
  const [ok, setOk] = useState("");
  const s = k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const save = () => {
    if (!form.studentId||!form.course.trim()) return;
    const entry = { id:Date.now().toString(), teacherId:user.id, teacherName:user.name, studentId:form.studentId, course:form.course.trim(), quiz:form.quiz, assignment:form.assignment, mid:form.mid, final:form.final };
    const updated = [...allMarks, entry];
    DB.setData("marks_all", updated); setAllMarks(updated);
    setForm({studentId:"",course:"",quiz:"",assignment:"",mid:"",final:""});
    setOk("Marks successfully uploaded!"); setTimeout(()=>setOk(""),2000);
  };

  if (!isTeacher) {
    const mine = allMarks.filter(r=>r.studentId===user.id);
    return (
      <div className="fade-in">
        <div className="page-header">
          <h1 className="page-title">My Marks</h1>
          <p className="page-subtitle">Academic scores uploaded by your instructors</p>
        </div>
        {mine.length===0 ? 
          <div className="card empty-state">
            <div className="empty-icon">📊</div>
            <div className="empty-text">No marks uploaded yet.</div>
          </div>
        : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Course</th><th>Quiz</th><th>Assignment</th><th>Mid</th><th>Final</th><th>Instructor</th></tr></thead>
                <tbody>
                  {mine.map(r=>(
                    <tr key={r.id}>
                      <td style={{fontWeight:600, color:"var(--primary)"}}>{r.course}</td>
                      <td>{r.quiz||"—"}</td>
                      <td>{r.assignment||"—"}</td>
                      <td>{r.mid||"—"}</td>
                      <td>{r.final||"—"}</td>
                      <td>{r.teacherName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Upload Marks</h1>
        <p className="page-subtitle">Enter assessment scores for your students</p>
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Student</label>
            <select className="input-field" value={form.studentId} onChange={s("studentId")}>
              <option value="">Select student...</option>
              {students.map(st=><option key={st.id} value={st.id}>{st.name} ({st.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="form-group"><label>Course</label><input className="input-field" placeholder="e.g. Data Structures" value={form.course} onChange={s("course")} /></div>
        </div>
        
        <div className="form-grid">
          <div className="form-group"><label>Quiz Marks</label><input className="input-field" type="number" placeholder="Out of 10/20" value={form.quiz} onChange={s("quiz")} /></div>
          <div className="form-group"><label>Assignment Marks</label><input className="input-field" type="number" placeholder="Out of 10/20" value={form.assignment} onChange={s("assignment")} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group"><label>Midterm Marks</label><input className="input-field" type="number" placeholder="Out of 30/40" value={form.mid} onChange={s("mid")} /></div>
          <div className="form-group"><label>Final Exam Marks</label><input className="input-field" type="number" placeholder="Out of 40/50" value={form.final} onChange={s("final")} /></div>
        </div>
        <button className="btn-primary" onClick={save}>Upload Marks</button>
      </div>
    </div>
  );
}

/* ── COMPLAINTS ───────────────────────────────────────────────── */
function Complaints({ user }) {
  const isAdmin = user.role==="admin";
  const [all, setAll] = useState(()=>DB.getData("complaints"));
  const [form, setForm] = useState({category:"Academic",desc:""});
  const [ok, setOk] = useState("");

  const submit = () => {
    if (!form.desc.trim()) return;
    const c = { id:Date.now().toString(), studentId:user.id, studentName:user.name, category:form.category, desc:form.desc.trim(), date:new Date().toISOString().slice(0,10), status:"Pending" };
    const updated = [...all, c]; DB.setData("complaints", updated); setAll(updated);
    setForm({category:"Academic",desc:""}); setOk("Complaint submitted successfully."); setTimeout(()=>setOk(""),3000);
  };

  const resolve = id => { const u=all.map(c=>c.id===id?{...c,status:"Resolved"}:c); DB.setData("complaints",u); setAll(u); };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Complaints Dashboard</h1>
        <p className="page-subtitle">Review and resolve student issues</p>
      </div>
      {all.length===0 ? 
        <div className="card empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-text">No active complaints. Great job!</div>
        </div>
      : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Student</th><th>Category</th><th>Description</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {all.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:500}}>{c.studentName}</td>
                    <td>{c.category}</td>
                    <td style={{maxWidth:250, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}} title={c.desc}>{c.desc}</td>
                    <td>{c.date}</td>
                    <td><span className={`badge ${c.status==="Resolved"?"badge-success":"badge-warning"}`}>{c.status}</span></td>
                    <td>
                      {c.status!=="Resolved" ? (
                        <button className="btn-primary" style={{padding: "6px 12px", fontSize: 12}} onClick={()=>resolve(c.id)}>Resolve</button>
                      ) : (
                        <span style={{color: "var(--success)", fontSize: 18}}>✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );

  const mine = all.filter(c=>c.studentId===user.id);
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Submit Complaint</h1>
        <p className="page-subtitle">Report an issue to the administration</p>
      </div>
      
      <div className="card" style={{ maxWidth: 600 }}>
        {ok&&<div className="alert alert-success">{ok}</div>}
        <div className="form-group">
          <label>Category</label>
          <select className="input-field" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
            <option>Academic</option><option>Facility</option><option>Financial</option><option>Administrative</option><option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="input-field" rows={4} placeholder="Please provide detailed information about your issue..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} style={{resize: "vertical", minHeight: 120}} />
        </div>
        <button className="btn-primary" onClick={submit}>Submit Complaint</button>
      </div>
      
      {mine.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>My Recent Complaints</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Category</th><th>Description</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {mine.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:500}}>{c.category}</td>
                    <td>{c.desc}</td>
                    <td>{c.date}</td>
                    <td><span className={`badge ${c.status==="Resolved"?"badge-success":"badge-warning"}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── ANNOUNCEMENTS ────────────────────────────────────────────── */
function Announcements({ user }) {
  const canPost = user.role==="admin"||user.role==="teacher";
  const [all, setAll] = useState(()=>DB.getData("announcements"));
  const [form, setForm] = useState({title:"",content:"",audience:"All"});
  const [ok, setOk] = useState("");

  const post = () => {
    if (!form.title.trim()||!form.content.trim()) return;
    const a = { id:Date.now().toString(), title:form.title.trim(), content:form.content.trim(), audience:form.audience, author:user.name, date:new Date().toISOString().slice(0,10) };
    const updated = [a,...all]; DB.setData("announcements",updated); setAll(updated);
    setForm({title:"",content:"",audience:"All"}); setOk("Announcement published!"); setTimeout(()=>setOk(""),2000);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Campus Announcements</h1>
        <p className="page-subtitle">Stay updated with the latest news and notices</p>
      </div>
      
      {canPost && (
        <div className="card" style={{ maxWidth: 640 }}>
          <div className="card-title">Post New Announcement</div>
          {ok&&<div className="alert alert-success">{ok}</div>}
          <div className="form-group">
            <label>Title</label>
            <input className="input-field" placeholder="Enter announcement title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="input-field" rows={4} placeholder="Write the details here..." value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} style={{resize: "vertical", minHeight: 100}} />
          </div>
          <div className="form-group">
            <label>Target Audience</label>
            <select className="input-field" value={form.audience} onChange={e=>setForm(f=>({...f,audience:e.target.value}))} style={{maxWidth: 200}}>
              <option>All</option><option>Students</option><option>Teachers</option>
            </select>
          </div>
          <button className="btn-primary" onClick={post}>Publish Announcement</button>
        </div>
      )}
      
      {all.length===0 ? 
        <div className="card empty-state">
          <div className="empty-icon">📢</div>
          <div className="empty-text">No announcements at the moment.</div>
        </div>
      : <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {all.map(a=>(
            <div className="card" key={a.id} style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, margin: 0, color: "var(--primary)" }}>{a.title}</h3>
                <span className="badge badge-neutral">{a.audience}</span>
              </div>
              <p style={{ fontSize: 15, color: "var(--text-main)", lineHeight: 1.7, marginBottom: 16 }}>
                {a.content}
              </p>
              <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{display: "flex", alignItems: "center", gap: 4}}>👤 {a.author}</span>
                <span style={{display: "flex", alignItems: "center", gap: 4}}>🗓 {a.date}</span>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

/* ── COURT BOOKING ────────────────────────────────────────────── */
function Court({ user }) {
  const SLOTS = ["9:00 AM - 10:00 AM","10:00 AM - 11:00 AM","11:00 AM - 12:00 PM","12:00 PM - 1:00 PM","2:00 PM - 3:00 PM","3:00 PM - 4:00 PM","4:00 PM - 5:00 PM","5:00 PM - 6:00 PM"];
  const [bookings, setBookings] = useState(()=>DB.getData("court_bookings"));
  const [court, setCourt] = useState("Basketball");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [selected, setSelected] = useState(null); const [ok, setOk] = useState("");

  const takenSlots = bookings.filter(b=>b.court===court&&b.date===date).map(b=>b.slot);

  const book = () => {
    if (selected===null) return;
    const b = { id:Date.now().toString(), userId:user.id, userName:user.name, court, date, slot:SLOTS[selected] };
    const updated = [...bookings, b]; DB.setData("court_bookings",updated); setBookings(updated);
    setOk(`${court} Court booked successfully for ${SLOTS[selected]}!`); setSelected(null); setTimeout(()=>setOk(""),4000);
  };

  const mine = bookings.filter(b=>b.userId===user.id);
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Court Booking</h1>
        <p className="page-subtitle">Reserve campus sports facilities</p>
      </div>
      
      <div className="card" style={{ maxWidth: 700 }}>
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Select Facility</label>
            <select className="input-field" value={court} onChange={e=>{setCourt(e.target.value);setSelected(null);}}>
              <option>Basketball</option><option>Tennis</option><option>Badminton</option><option>Cricket Net</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select Date</label>
            <input className="input-field" type="date" value={date} onChange={e=>{setDate(e.target.value);setSelected(null);}} />
          </div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>Available Time Slots</label>
          <div className="slots-grid">
            {SLOTS.map((sl,i)=>{
              const taken = takenSlots.includes(sl); 
              const sel = selected===i;
              let slotClass = "slot-available";
              if (taken) slotClass = "slot-booked";
              else if (sel) slotClass = "slot-selected";
              
              return (
                <div key={i} className={`slot-item ${slotClass}`} onClick={()=>!taken&&setSelected(i)}>
                  {sl.split(" - ")[0]}<br/>
                  <span style={{ fontSize: 11, fontWeight: 400 }}>{taken?"Booked":sel?"Selected":"Available"}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
            {selected !== null ? <span>Selected: <strong>{SLOTS[selected]}</strong></span> : "Please select a slot"}
          </div>
          <button className="btn-primary" disabled={selected===null} onClick={book}>Confirm Reservation</button>
        </div>
      </div>
      
      {mine.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>My Upcoming Reservations</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Facility</th><th>Date</th><th>Time Slot</th><th>Status</th></tr></thead>
              <tbody>
                {mine.map(b=>(
                  <tr key={b.id}>
                    <td style={{fontWeight:600}}>{b.court}</td>
                    <td>{b.date}</td>
                    <td>{b.slot}</td>
                    <td><span className="badge badge-success">Confirmed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── COURSE REGISTRATION ──────────────────────────────────────── */
function CourseReg({ user }) {
  const isAdmin = user.role==="admin";
  const [courses, setCourses] = useState(()=>DB.getData("courses"));
  const [regs, setRegs] = useState(()=>DB.getData("registrations"));
  const [form, setForm] = useState({name:"",code:"",credits:"3",teacher:"",seats:"30"});
  const [ok, setOk] = useState("");

  const addCourse = () => {
    if (!form.name.trim()||!form.code.trim()) return;
    const c = { id:Date.now().toString(), name:form.name.trim(), code:form.code.trim(), credits:Number(form.credits), teacher:form.teacher.trim(), seats:Number(form.seats) };
    const updated = [...courses, c]; DB.setData("courses",updated); setCourses(updated);
    setForm({name:"",code:"",credits:"3",teacher:"",seats:"30"}); setOk("Course successfully added to catalog!"); setTimeout(()=>setOk(""),3000);
  };

  const register = course => {
    if (course.seats<=0) return;
    const reg = { id:Date.now().toString(), studentId:user.id, courseId:course.id, date:new Date().toISOString().slice(0,10) };
    const updatedRegs = [...regs, reg];
    const updatedCourses = courses.map(c=>c.id===course.id?{...c,seats:c.seats-1}:c);
    DB.setData("registrations",updatedRegs); DB.setData("courses",updatedCourses);
    setRegs(updatedRegs); setCourses(updatedCourses);
    setOk(`Successfully enrolled in ${course.name}!`); setTimeout(()=>setOk(""),3000);
  };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Course Management</h1>
        <p className="page-subtitle">Add and manage courses for student registration</p>
      </div>
      
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-title">Add New Course</div>
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group"><label>Course Title</label><input className="input-field" placeholder="e.g. Data Structures & Algorithms" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div className="form-group"><label>Course Code</label><input className="input-field" placeholder="e.g. CS-202" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} /></div>
        </div>
        <div className="form-grid" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
          <div className="form-group"><label>Instructor</label><input className="input-field" placeholder="e.g. Dr. Ahmed" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} /></div>
          <div className="form-group"><label>Credit Hours</label><input className="input-field" type="number" value={form.credits} onChange={e=>setForm(f=>({...f,credits:e.target.value}))} /></div>
          <div className="form-group"><label>Available Seats</label><input className="input-field" type="number" value={form.seats} onChange={e=>setForm(f=>({...f,seats:e.target.value}))} /></div>
        </div>
        <button className="btn-primary" onClick={addCourse}>Add Course to Catalog</button>
      </div>
      
      {courses.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Course Catalog</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Code</th><th>Course Name</th><th>Instructor</th><th>Credits</th><th>Available Seats</th></tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:600}}>{c.code}</td>
                    <td>{c.name}</td>
                    <td>{c.teacher||"—"}</td>
                    <td>{c.credits}</td>
                    <td><span className={`badge ${c.seats>0?"badge-success":"badge-danger"}`}>{c.seats}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const regIds = regs.filter(r=>r.studentId===user.id).map(r=>r.courseId);
  const myRegs = regs.filter(r=>r.studentId===user.id);
  
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Course Registration</h1>
        <p className="page-subtitle">Enroll in available courses for the upcoming semester</p>
      </div>
      
      {ok&&<div className="alert alert-success" style={{maxWidth: 1200}}>{ok}</div>}
      
      {courses.length===0 ? 
        <div className="card empty-state">
          <div className="empty-icon">📚</div>
          <div className="empty-text">Registration is currently closed. No courses available.</div>
        </div>
      : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Available Courses</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Code</th><th>Course</th><th>Instructor</th><th>Credits</th><th>Seats</th><th>Action</th></tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:600}}>{c.code}</td>
                    <td>{c.name}</td>
                    <td>{c.teacher||"—"}</td>
                    <td>{c.credits}</td>
                    <td>
                      <span className={`badge ${c.seats>0?"badge-success":"badge-danger"}`}>
                        {c.seats>0?c.seats+" available":"Full"}
                      </span>
                    </td>
                    <td>
                      {regIds.includes(c.id) ? (
                        <span className="badge badge-info" style={{padding: "6px 12px"}}>Enrolled ✓</span>
                      ) : (
                        <button className="btn-primary" style={{padding: "6px 16px", fontSize: 13}} disabled={c.seats<=0} onClick={()=>register(c)}>Enroll</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      
      {myRegs.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>My Enrolled Courses</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Course Name</th><th>Course Code</th><th>Registration Date</th></tr></thead>
              <tbody>
                {myRegs.map(r=>{
                  const c=courses.find(x=>x.id===r.courseId); 
                  return c ? (
                    <tr key={r.id}>
                      <td style={{fontWeight:500, color:"var(--primary)"}}>{c.name}</td>
                      <td>{c.code}</td>
                      <td>{r.date}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── FEE CHALLAN ──────────────────────────────────────────────── */
function Fee({ user }) {
  const isAdmin = user.role==="admin";
  const students = DB.getUsers().filter(u=>u.role==="student");
  const [challans, setChallans] = useState(()=>DB.getData("challans"));
  const [form, setForm] = useState({studentId:"",amount:"",dueDate:"",semester:""});
  const [ok, setOk] = useState("");

  const generate = () => {
    if (!form.studentId||!form.amount||!form.dueDate) return;
    const c = { id:Date.now().toString(), studentId:form.studentId, amount:form.amount, dueDate:form.dueDate, semester:form.semester, status:"Pending", generatedDate:new Date().toISOString().slice(0,10) };
    const updated = [...challans, c]; DB.setData("challans",updated); setChallans(updated);
    setForm({studentId:"",amount:"",dueDate:"",semester:""}); setOk("Challan successfully generated!"); setTimeout(()=>setOk(""),3000);
  };

  const pay = id => { const u=challans.map(c=>c.id===id?{...c,status:"Paid",paidDate:new Date().toISOString().slice(0,10)}:c); DB.setData("challans",u); setChallans(u); };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Fee Management</h1>
        <p className="page-subtitle">Generate and track student fee challans</p>
      </div>
      
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="card-title">Generate New Challan</div>
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-group">
          <label>Student</label>
          <select className="input-field" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
            <option value="">Select a student...</option>
            {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
          </select>
        </div>
        
        <div className="form-grid">
          <div className="form-group"><label>Amount (PKR)</label><input className="input-field" type="number" placeholder="e.g. 150000" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></div>
          <div className="form-group"><label>Due Date</label><input className="input-field" type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))} /></div>
        </div>
        
        <div className="form-group" style={{ maxWidth: "50%" }}>
          <label>Semester</label>
          <input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} />
        </div>
        
        <button className="btn-primary" onClick={generate} style={{ marginTop: 8 }}>Generate Challan</button>
      </div>
      
      {challans.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>All Issued Challans</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Student</th><th>Amount</th><th>Due Date</th><th>Semester</th><th>Status</th></tr></thead>
              <tbody>
                {challans.map(c=>{
                  const s=students.find(x=>x.id===c.studentId); 
                  return (
                    <tr key={c.id}>
                      <td style={{fontWeight:500}}>{s?.name||"—"}</td>
                      <td style={{fontWeight:600, color:"var(--primary)"}}>PKR {Number(c.amount).toLocaleString()}</td>
                      <td>{c.dueDate}</td>
                      <td>{c.semester||"—"}</td>
                      <td><span className={`badge ${c.status==="Paid"?"badge-success":"badge-warning"}`}>{c.status}</span></td>
                    </tr>
                  ); 
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const mine = challans.filter(c=>c.studentId===user.id);
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Fee Challan</h1>
        <p className="page-subtitle">View and securely pay your outstanding dues</p>
      </div>
      
      {mine.length===0 ? 
        <div className="card empty-state">
          <div className="empty-icon">💳</div>
          <div className="empty-text">You have no outstanding fee challans.</div>
        </div>
      : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 24 }}>
          {mine.map(c=>(
            <div className="card" key={c.id} style={{ display: "flex", flexDirection: "column", marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span className={`badge ${c.status==="Paid"?"badge-success":"badge-warning"}`}>{c.status}</span>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Issued: {c.generatedDate}</span>
              </div>
              
              <div style={{ background: "var(--bg-app)", padding: 20, borderRadius: "var(--radius-sm)", marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Total Amount Due</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>PKR {Number(c.amount).toLocaleString()}</div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24, flex: 1 }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>Due Date</div>
                  <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{c.dueDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>Semester</div>
                  <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{c.semester||"—"}</div>
                </div>
              </div>
              
              {c.status==="Pending" ? (
                <button className="btn-primary" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }} onClick={()=>pay(c.id)}>
                  <span>💳</span> Pay Now securely
                </button>
              ) : (
                <div style={{ padding: "12px", background: "var(--success-bg)", color: "var(--success)", borderRadius: "var(--radius-sm)", textAlign: "center", fontWeight: 600, fontSize: 14 }}>
                  ✓ Payment Confirmed on {c.paidDate}
                </div>
              )}
            </div>
          ))}
        </div>
      }
    </div>
  );
}

/* ── TRANSCRIPT ───────────────────────────────────────────────── */
function Transcript({ user }) {
  const isAdmin = user.role==="admin"||user.role==="teacher";
  const students = DB.getUsers().filter(u=>u.role==="student");
  const [transcripts, setTranscripts] = useState(()=>DB.getData("transcripts"));
  const [form, setForm] = useState({studentId:"",semester:"",courses:"",gpa:""});
  const [ok, setOk] = useState("");

  const generate = () => {
    if (!form.studentId||!form.semester) return;
    const t = { id:Date.now().toString(), studentId:form.studentId, semester:form.semester, gpa:form.gpa, courses:form.courses, generatedDate:new Date().toISOString().slice(0,10), generatedBy:user.name };
    const updated = [...transcripts, t]; DB.setData("transcripts",updated); setTranscripts(updated);
    setForm({studentId:"",semester:"",courses:"",gpa:""}); setOk("Transcript generated successfully!"); setTimeout(()=>setOk(""),3000);
  };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Generate Transcripts</h1>
        <p className="page-subtitle">Publish official semester records for students</p>
      </div>
      
      <div className="card" style={{ maxWidth: 640 }}>
        {ok&&<div className="alert alert-success">{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Student</label>
            <select className="input-field" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
              <option value="">Select a student...</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="form-group"><label>Semester</label><input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
        </div>
        
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label>Courses Completed (Comma separated)</label>
          <input className="input-field" placeholder="e.g. Object Oriented Programming, Data Structures, Calculus" value={form.courses} onChange={e=>setForm(f=>({...f,courses:e.target.value}))} />
        </div>
        
        <div className="form-group" style={{ maxWidth: "30%", marginBottom: 24 }}>
          <label>Semester GPA</label>
          <input className="input-field" type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.75" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} style={{ fontSize: 18, fontWeight: 600, color: "var(--primary)" }} />
        </div>
        
        <button className="btn-primary" onClick={generate}>Generate Official Transcript</button>
      </div>
    </div>
  );

  const mine = transcripts.filter(t=>t.studentId===user.id);
  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">My Transcripts</h1>
        <p className="page-subtitle">Your official academic records by semester</p>
      </div>
      
      {mine.length===0 ? 
        <div className="card empty-state">
          <div className="empty-icon">📄</div>
          <div className="empty-text">No transcripts are available at this time.</div>
        </div>
      : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 24 }}>
          {mine.map(t=>(
            <div className="card" key={t.id} style={{ marginBottom: 0, borderTop: "4px solid var(--primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{t.semester}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>Issued: {t.generatedDate}</div>
                </div>
                {t.gpa && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" }}>SGPA</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)", lineHeight: 1, marginTop: 2 }}>{t.gpa}</div>
                  </div>
                )}
              </div>
              
              <div style={{ background: "var(--bg-app)", padding: "16px", borderRadius: "var(--radius-sm)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", marginBottom: 8 }}>Courses</div>
                <div style={{ fontSize: 14, color: "var(--text-main)", lineHeight: 1.6 }}>
                  {t.courses ? t.courses.split(",").map((course, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: "var(--primary)", fontSize: 10 }}>■</span> {course.trim()}
                    </div>
                  )) : "—"}
                </div>
              </div>
              
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 20, textAlign: "right", borderTop: "1px dashed var(--border-light)", paddingTop: 12 }}>
                Verified by {t.generatedBy}
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

/* ── HONOR LIST ───────────────────────────────────────────────── */
function HonorList({ user }) {
  const canManage = user.role==="admin"||user.role==="teacher";
  const students = DB.getUsers().filter(u=>u.role==="student");
  const [list, setList] = useState(()=>DB.getData("honor_list"));
  const [form, setForm] = useState({studentId:"",title:"",semester:"",gpa:"",description:""});
  const [ok, setOk] = useState("");

  const add = () => {
    if (!form.studentId||!form.title.trim()) return;
    const s = students.find(x=>x.id===form.studentId);
    const entry = { id:Date.now().toString(), studentId:form.studentId, studentName:s?.name||"—", rollno:s?.rollno||"—", title:form.title.trim(), semester:form.semester, gpa:form.gpa, description:form.description.trim(), date:new Date().toISOString().slice(0,10) };
    const updated = [...list, entry]; DB.setData("honor_list",updated); setList(updated);
    setForm({studentId:"",title:"",semester:"",gpa:"",description:""}); setOk("Achievement added to the Honor List!"); setTimeout(()=>setOk(""),3000);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">University Honor List</h1>
        <p className="page-subtitle">Celebrating academic excellence and achievements</p>
      </div>
      
      {canManage && (
        <div className="card" style={{ maxWidth: 640 }}>
          <div className="card-title">Award New Achievement</div>
          {ok&&<div className="alert alert-success">{ok}</div>}
          
          <div className="form-grid">
            <div className="form-group">
              <label>Student</label>
              <select className="input-field" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
                <option value="">Select an exceptional student...</option>
                {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Award Title</label><input className="input-field" placeholder="e.g. Dean's List, Gold Medalist" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
          </div>
          
          <div className="form-grid">
            <div className="form-group"><label>Semester</label><input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
            <div className="form-group"><label>GPA Achieved</label><input className="input-field" type="number" step="0.01" placeholder="e.g. 3.9" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
          </div>
          
          <div className="form-group" style={{ marginBottom: 24 }}>
            <label>Special Note <span style={{fontWeight:400, color:"var(--text-muted)"}}>(Optional)</span></label>
            <input className="input-field" placeholder="Brief description of the achievement..." value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </div>
          
          <button className="btn-primary" onClick={add}>Publish to Honor List</button>
        </div>
      )}
      
      {list.length===0 ? 
        <div className="card empty-state">
          <div className="empty-icon">🏆</div>
          <div className="empty-text">The Honor List is currently empty. Excellence awaits!</div>
        </div>
      : <div style={{ display: "grid", gap: 16 }}>
          {list.map((h,i)=> (
            <div className="card" key={h.id} style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 24px", marginBottom: 0, transition: "transform 0.2s" }} onMouseOver={e=>e.currentTarget.style.transform="scale(1.01)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
              <div style={{ 
                  width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: i===0?"linear-gradient(135deg, #fef08a 0%, #eab308 100%)" : i===1?"linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)" : i===2?"linear-gradient(135deg, #fed7aa 0%, #ea580c 100%)" : "var(--primary-light)",
                  color: i<3 ? "#fff" : "var(--primary)", fontSize: 24, fontWeight: 800,
                  boxShadow: "var(--shadow-md)"
                }}>
                {i===0?"🏆":i===1?"🥈":i===2?"🥉":`#${i+1}`}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text-main)" }}>{h.studentName}</span>
                  <span className="badge badge-neutral">{h.rollno}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--primary)", marginBottom: 4 }}>{h.title}</div>
                {h.description && <div style={{ fontSize: 14, color: "var(--text-main)", marginBottom: 8 }}>"{h.description}"</div>}
                {h.semester && <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", gap: 16 }}>
                  <span>🗓 {h.semester}</span>
                  {h.gpa && <span>✨ GPA: <strong style={{color:"var(--text-main)"}}>{h.gpa}</strong></span>}
                </div>}
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

/* ── NAV ──────────────────────────────────────────────────────── */
function getNav(role) {
  const s = [
    {id:"dashboard",label:"Dashboard",icon:"🏠",sec:"Overview"},
    {id:"profile",label:"My Profile",icon:"👤",sec:"Overview"},
    {id:"attendance",label:"Attendance",icon:"📅",sec:"Academics"},
    {id:"marks",label:"My Marks",icon:"📊",sec:"Academics"},
    {id:"transcript",label:"Transcript",icon:"📄",sec:"Academics"},
    {id:"courses",label:"Course Registration",icon:"📚",sec:"Academics"},
    {id:"fee",label:"Fee Challan",icon:"💳",sec:"Finance"},
    {id:"court",label:"Court Booking",icon:"🎾",sec:"Campus Life"},
    {id:"complaints",label:"Complaints",icon:"📋",sec:"Campus Life"},
    {id:"announcements",label:"Announcements",icon:"📢",sec:"Campus Life"},
    {id:"honor",label:"Honor List",icon:"🏆",sec:"Campus Life"},
  ];
  const t = [
    {id:"dashboard",label:"Dashboard",icon:"🏠",sec:"Overview"},
    {id:"profile",label:"My Profile",icon:"👤",sec:"Overview"},
    {id:"attendance",label:"Mark Attendance",icon:"✅",sec:"Faculty Portal"},
    {id:"marks",label:"Upload Marks",icon:"📝",sec:"Faculty Portal"},
    {id:"transcript",label:"Transcripts",icon:"📄",sec:"Faculty Portal"},
    {id:"honor",label:"Honor List",icon:"🏆",sec:"Faculty Portal"},
    {id:"announcements",label:"Announcements",icon:"📢",sec:"Campus"},
  ];
  const a = [
    {id:"dashboard",label:"Dashboard",icon:"🏠",sec:"Overview"},
    {id:"profile",label:"My Profile",icon:"👤",sec:"Overview"},
    {id:"courses",label:"Manage Courses",icon:"📚",sec:"Administration"},
    {id:"fee",label:"Fee Challans",icon:"💳",sec:"Administration"},
    {id:"transcript",label:"Transcripts",icon:"📄",sec:"Administration"},
    {id:"honor",label:"Honor List",icon:"🏆",sec:"Administration"},
    {id:"complaints",label:"Complaints",icon:"📋",sec:"Administration"},
    {id:"announcements",label:"Announcements",icon:"📢",sec:"Campus"},
  ];
  return {student:s,teacher:t,admin:a}[role]||s;
}

/* ── ROOT ─────────────────────────────────────────────────────── */
export default function CampusConnect() {
  const [user, setUser] = useState(() => DB.getSession());
  const [page, setPage] = useState("dashboard");

  // On mount, log to console for debugging
  useEffect(() => {
    console.log("App Loaded. User:", user);
  }, []);

  const logout = () => { DB.clearSession(); setUser(null); setPage("dashboard"); };
  const updateUser = u => setUser(u);

  if (!user) return <Auth onLogin={u=>{setUser(u);setPage("dashboard");}}/>;

  const nav = getNav(user.role);
  const sections = [...new Set(nav.map(n=>n.sec))];

  const renderPage = () => {
    switch(page) {
      case "dashboard":    return <Dashboard user={user} />;
      case "profile":      return <Profile user={user} onUpdate={updateUser} />;
      case "attendance":   return <Attendance user={user} />;
      case "marks":        return <Marks user={user} />;
      case "transcript":   return <Transcript user={user} />;
      case "courses":      return <CourseReg user={user} />;
      case "fee":          return <Fee user={user} />;
      case "court":        return <Court user={user} />;
      case "complaints":   return <Complaints user={user} />;
      case "announcements":return <Announcements user={user} />;
      case "honor":        return <HonorList user={user} />;
      default:             return <Dashboard user={user} />;
    }
  };

  return (
    <div className="app-container fade-in">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">Campus<span>Connect</span></div>
        </div>
        
        <div style={{ flex: 1, padding: "12px 0" }}>
          {sections.map(sec=>(
            <div key={sec} className="nav-section">
              <div className="nav-label">{sec}</div>
              {nav.filter(n=>n.sec===sec).map(n=>(
                <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
                  <span style={{ fontSize: 18 }}>{n.icon}</span>
                  {n.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div className="role">{user.role}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            <span style={{ marginRight: 8 }}>🚪</span> Sign Out
          </button>
        </div>
      </aside>
      
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
