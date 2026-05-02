import { useState, useEffect } from "react";

/* ── STYLES ───────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #f1f5f9; }

  .auth { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:#0f172a; }
  .auth-box { width:100%; max-width:420px; background:#1e293b; border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:36px; }
  .auth-logo { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; margin-bottom:4px; }
  .auth-logo span { color:#38bdf8; }
  .auth-sub { color:#64748b; font-size:14px; margin-bottom:28px; }
  .tabs { display:flex; gap:6px; margin-bottom:24px; }
  .tab { flex:1; padding:9px; border-radius:8px; border:1.5px solid transparent; background:rgba(255,255,255,0.04); color:#64748b; font-size:13px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .15s; }
  .tab.active { background:rgba(56,189,248,0.1); border-color:#38bdf8; color:#38bdf8; }
  .field { margin-bottom:14px; }
  .field label { display:block; font-size:13px; font-weight:500; color:#94a3b8; margin-bottom:5px; }
  .inp { width:100%; padding:10px 13px; background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.09); border-radius:9px; color:#f1f5f9; font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color .15s; }
  .inp:focus { border-color:#38bdf8; }
  .inp::placeholder { color:#334155; }
  .btn { width:100%; padding:12px; background:#2563eb; border:none; border-radius:9px; color:#fff; font-size:15px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:background .15s; margin-top:4px; }
  .btn:hover { background:#1d4ed8; }
  .btn:disabled { opacity:0.5; cursor:not-allowed; }
  .err { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); border-radius:8px; padding:10px 13px; color:#fca5a5; font-size:13px; margin-bottom:14px; }
  .ok  { background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:10px 13px; color:#6ee7b7; font-size:13px; margin-bottom:14px; }
  .switch { text-align:center; font-size:13px; color:#64748b; margin-top:16px; }
  .switch button { background:none; border:none; color:#38bdf8; cursor:pointer; font-size:13px; font-weight:500; font-family:'DM Sans',sans-serif; }

  .app { display:flex; min-height:100vh; }
  .sidebar { width:230px; flex-shrink:0; background:#1e293b; border-right:1px solid rgba(255,255,255,0.06); display:flex; flex-direction:column; padding:20px 0; position:fixed; top:0; left:0; height:100vh; overflow-y:auto; }
  .s-logo { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; padding:0 18px 24px; }
  .s-logo span { color:#38bdf8; }
  .s-label { font-size:10px; font-weight:600; letter-spacing:1.2px; text-transform:uppercase; color:#334155; padding:0 18px; margin:10px 0 4px; }
  .nav { display:flex; align-items:center; gap:9px; padding:9px 18px; cursor:pointer; color:#475569; font-size:14px; font-weight:500; border-left:3px solid transparent; transition:all .12s; }
  .nav:hover { color:#f1f5f9; background:rgba(255,255,255,0.03); }
  .nav.on { color:#38bdf8; background:rgba(56,189,248,0.08); border-left-color:#38bdf8; }
  .s-bottom { margin-top:auto; padding:14px 18px; border-top:1px solid rgba(255,255,255,0.06); }
  .u-chip { display:flex; align-items:center; gap:9px; }
  .u-av { width:34px; height:34px; border-radius:50%; background:#2563eb; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; flex-shrink:0; }
  .u-name { font-size:13px; font-weight:600; }
  .u-role { font-size:11px; color:#64748b; text-transform:capitalize; }
  .logout { background:none; border:none; color:#475569; font-size:13px; cursor:pointer; padding:7px 0; font-family:'DM Sans',sans-serif; margin-top:8px; width:100%; text-align:left; transition:color .12s; }
  .logout:hover { color:#ef4444; }

  .main { margin-left:230px; flex:1; padding:30px 34px; }
  .ph { margin-bottom:26px; }
  .ph h1 { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; letter-spacing:-.5px; margin-bottom:3px; }
  .ph p { color:#64748b; font-size:14px; }

  .card { background:#1e293b; border:1px solid rgba(255,255,255,0.07); border-radius:13px; padding:22px; margin-bottom:18px; }
  .ct { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; margin-bottom:14px; }

  .tw { overflow-x:auto; }
  table { width:100%; border-collapse:collapse; }
  th { text-align:left; padding:10px 12px; font-size:11px; font-weight:600; letter-spacing:.5px; text-transform:uppercase; color:#334155; border-bottom:1px solid rgba(255,255,255,0.06); }
  td { padding:12px 12px; font-size:14px; border-bottom:1px solid rgba(255,255,255,0.03); color:#cbd5e1; }
  tr:last-child td { border-bottom:none; }

  .b { display:inline-block; padding:2px 9px; border-radius:20px; font-size:12px; font-weight:600; }
  .bg { background:rgba(16,185,129,.12); color:#6ee7b7; }
  .br { background:rgba(239,68,68,.12); color:#fca5a5; }
  .bb { background:rgba(56,189,248,.12); color:#7dd3fc; }
  .by { background:rgba(245,158,11,.12); color:#fcd34d; }
  .bx { background:rgba(100,116,139,.12); color:#94a3b8; }

  .fl { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
  .f1 label { display:block; font-size:13px; font-weight:500; color:#94a3b8; margin-bottom:5px; }
  select.inp { cursor:pointer; }
  textarea.inp { resize:vertical; min-height:90px; }
  .bs { padding:8px 16px; background:#2563eb; border:none; border-radius:8px; color:#fff; font-size:13px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:background .12s; }
  .bs:hover { background:#1d4ed8; }
  .bs:disabled { opacity:0.4; cursor:not-allowed; }
  .bo { padding:8px 16px; background:transparent; border:1.5px solid rgba(255,255,255,0.12); border-radius:8px; color:#64748b; font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; }

  .slots { display:grid; grid-template-columns:repeat(4,1fr); gap:9px; margin:14px 0; }
  .slot { padding:11px; border-radius:9px; text-align:center; font-size:13px; font-weight:500; cursor:pointer; border:1.5px solid transparent; transition:all .12s; }
  .sa { background:rgba(16,185,129,.08); border-color:rgba(16,185,129,.2); color:#6ee7b7; }
  .sa:hover { background:rgba(16,185,129,.16); }
  .st { background:rgba(239,68,68,.06); border-color:rgba(239,68,68,.12); color:#fca5a5; cursor:default; opacity:.5; }
  .ss2 { background:rgba(56,189,248,.15); border-color:#38bdf8; color:#7dd3fc; }

  .div { height:1px; background:rgba(255,255,255,0.06); margin:18px 0; }
  .empty { text-align:center; padding:40px 20px; color:#475569; font-size:14px; }
`;

/* ── STORAGE ──────────────────────────────────────────────────── */
/* ── API ─────────────────────────────────────────────────────── */
const API = "http://localhost:5000/api";

const api = {
  post: async (url, data) => {
    const res = await fetch(`${API}${url}`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    return res.json();
  },
  get: async (url) => {
    const res = await fetch(`${API}${url}`);
    return res.json();
  },
  put: async (url, data) => {
    const res = await fetch(`${API}${url}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    return res.json();
  },
  del: async (url) => {
    const res = await fetch(`${API}${url}`, { method:"DELETE" });
    return res.json();
  }
};

let SESSION = null;

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
    <div className="auth">
      <div className="auth-box">
        <div className="auth-logo">Campus<span>Connect</span></div>
        <div className="auth-sub">FAST-NUCES Student Portal</div>
        {err && <div className="err">{err}</div>}
        {ok  && <div className="ok">{ok}</div>}
        <div className="tabs">
          {["student","teacher","admin"].map(r => (
            <button key={r} className={`tab ${role===r?"active":""}`} onClick={() => setRole(r)}>
              {r==="student"?"👨‍🎓":r==="teacher"?"🧑‍🏫":"⚙️"} {r.charAt(0).toUpperCase()+r.slice(1)}
            </button>
          ))}
        </div>
        {mode==="signup" && <div className="field"><label>Full Name</label><input className="inp" placeholder="Your full name" value={form.name} onChange={set("name")} /></div>}
        <div className="field"><label>Email</label><input className="inp" type="email" placeholder="your@nu.edu.pk" value={form.email} onChange={set("email")} /></div>
        {mode==="signup" && role==="student" && <div className="field"><label>Roll Number</label><input className="inp" placeholder="24L-xxxx" value={form.rollno} onChange={set("rollno")} /></div>}
        {mode==="signup" && role==="teacher" && <div className="field"><label>Employee ID</label><input className="inp" placeholder="FAC-xxx" value={form.empId} onChange={set("empId")} /></div>}
        <div className="field"><label>Password</label><input className="inp" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} /></div>
        <button className="btn" onClick={mode==="login"?login:signup}>{mode==="login"?"Sign In →":"Create Account →"}</button>
        <div className="switch">
          {mode==="login"
            ? <>No account? <button onClick={()=>{setMode("signup");setErr("");}}>Sign Up</button></>
            : <>Have an account? <button onClick={()=>{setMode("login");setErr("");}}>Sign In</button></>}
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD ────────────────────────────────────────────────── */
function Dashboard({ user }) {
  return (
    <div>
      <div className="ph">
        <h1>Welcome, {user.name} 👋</h1>
        <p>
          {user.role==="student" && `${user.rollno||"Roll not set"} · Semester ${user.semester||1}`}
          {user.role==="teacher" && `${user.dept||"Department not set"} · Faculty`}
          {user.role==="admin"   && "System Administrator"}
        </p>
      </div>
      <div className="card">
        <div className="ct">Getting Started</div>
        <p style={{color:"#64748b",fontSize:14,lineHeight:1.7}}>
          {user.role==="student" && "Use the sidebar to view attendance, marks, register for courses, pay fee, book courts, and more."}
          {user.role==="teacher" && "Use the sidebar to mark attendance, upload marks, generate transcripts, and post announcements."}
          {user.role==="admin"   && "Use the sidebar to add courses, generate fee challans, manage transcripts, and review complaints."}
        </p>
        <div className="div" />
        <div style={{fontSize:13,color:"#475569"}}>
          <div>📧 {user.email}</div>
          {user.role==="student" && <div style={{marginTop:6}}>🎓 {user.program||"Program not set"} · Semester {user.semester||1}</div>}
          {user.role==="teacher" && <div style={{marginTop:6}}>🏫 Emp ID: {user.empId||"—"}</div>}
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
    setOk("Saved!"); setErr(""); onUpdate(updated);
    setTimeout(()=>setOk(""),3000);
  };
  return (
    <div>
      <div className="ph"><h1>My Profile</h1><p>Update your information</p></div>
      <div className="card" style={{maxWidth:500}}>
        {err&&<div className="err">{err}</div>}
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Full Name</label><input className="inp" value={form.name} onChange={s("name")} /></div>
          <div className="f1"><label>Email</label><input className="inp" type="email" value={form.email} onChange={s("email")} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Phone</label><input className="inp" placeholder="03xx-xxxxxxx" value={form.phone} onChange={s("phone")} /></div>
          {user.role==="student"&&<div className="f1"><label>Program</label><input className="inp" placeholder="e.g. BS CS" value={form.program} onChange={s("program")} /></div>}
          {user.role==="teacher"&&<div className="f1"><label>Department</label><input className="inp" placeholder="e.g. Computer Science" value={form.dept} onChange={s("dept")} /></div>}
        </div>
        {user.role==="student"&&<div className="fl"><div className="f1"><label>Semester</label><input className="inp" type="number" min="1" max="8" value={form.semester} onChange={s("semester")} /></div></div>}
        <div className="div" />
        <div className="f1" style={{marginBottom:14}}><label>New Password (blank = keep current)</label><input className="inp" type="password" placeholder="••••••••" value={form.newPass} onChange={s("newPass")} /></div>
        <button className="bs" onClick={save}>Save Changes</button>
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
    setOk("Saved!"); setTimeout(()=>setOk(""),2000);
  };

  if (!isTeacher) {
    const mine = records.filter(r=>r.studentId===user.id);
    return (
      <div>
        <div className="ph"><h1>My Attendance</h1><p>Records marked by your teachers</p></div>
        {mine.length===0 ? <div className="card"><div className="empty">No attendance records yet.</div></div>
        : <div className="card"><div className="tw"><table>
            <thead><tr><th>Course</th><th>Date</th><th>Status</th><th>Teacher</th></tr></thead>
            <tbody>{mine.map(r=><tr key={r.id}><td>{r.course}</td><td>{r.date}</td><td><span className={`b ${r.status==="Present"?"bg":r.status==="Absent"?"br":"by"}`}>{r.status}</span></td><td>{r.teacherName}</td></tr>)}</tbody>
          </table></div></div>}
      </div>
    );
  }

  const myMarked = records.filter(r=>r.teacherId===user.id);
  return (
    <div>
      <div className="ph"><h1>Mark Attendance</h1><p>Record attendance for your students</p></div>
      <div className="card" style={{maxWidth:520}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Course Name</label><input className="inp" placeholder="e.g. OOP" value={course} onChange={e=>setCourse(e.target.value)} /></div>
          <div className="f1"><label>Date</label><input className="inp" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Student</label>
            <select className="inp" value={selStudent} onChange={e=>setSelStudent(e.target.value)}>
              <option value="">Select student</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="f1"><label>Status</label>
            <select className="inp" value={status} onChange={e=>setStatus(e.target.value)}>
              <option>Present</option><option>Absent</option><option>Leave</option>
            </select>
          </div>
        </div>
        <button className="bs" onClick={markAtt}>Save</button>
      </div>
      {myMarked.length>0&&<div className="card">
        <div className="ct">Your Recent Records</div>
        <div className="tw"><table>
          <thead><tr><th>Student</th><th>Course</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>{[...myMarked].reverse().slice(0,15).map(r=>{
            const stu=students.find(u=>u.id===r.studentId);
            return <tr key={r.id}><td>{stu?.name||"—"}</td><td>{r.course}</td><td>{r.date}</td><td><span className={`b ${r.status==="Present"?"bg":r.status==="Absent"?"br":"by"}`}>{r.status}</span></td></tr>;
          })}</tbody>
        </table></div>
      </div>}
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
    setOk("Marks saved!"); setTimeout(()=>setOk(""),2000);
  };

  if (!isTeacher) {
    const mine = allMarks.filter(r=>r.studentId===user.id);
    return (
      <div>
        <div className="ph"><h1>My Marks</h1><p>Marks uploaded by your teachers</p></div>
        {mine.length===0 ? <div className="card"><div className="empty">No marks uploaded yet.</div></div>
        : <div className="card"><div className="tw"><table>
            <thead><tr><th>Course</th><th>Quiz</th><th>Assignment</th><th>Mid</th><th>Final</th><th>By</th></tr></thead>
            <tbody>{mine.map(r=><tr key={r.id}><td>{r.course}</td><td>{r.quiz||"—"}</td><td>{r.assignment||"—"}</td><td>{r.mid||"—"}</td><td>{r.final||"—"}</td><td>{r.teacherName}</td></tr>)}</tbody>
          </table></div></div>}
      </div>
    );
  }

  return (
    <div>
      <div className="ph"><h1>Upload Marks</h1><p>Enter marks for your students</p></div>
      <div className="card" style={{maxWidth:540}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Student</label>
            <select className="inp" value={form.studentId} onChange={s("studentId")}>
              <option value="">Select student</option>
              {students.map(st=><option key={st.id} value={st.id}>{st.name} ({st.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="f1"><label>Course</label><input className="inp" placeholder="Course name" value={form.course} onChange={s("course")} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Quiz</label><input className="inp" type="number" placeholder="e.g. 18" value={form.quiz} onChange={s("quiz")} /></div>
          <div className="f1"><label>Assignment</label><input className="inp" type="number" value={form.assignment} onChange={s("assignment")} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Mid</label><input className="inp" type="number" value={form.mid} onChange={s("mid")} /></div>
          <div className="f1"><label>Final</label><input className="inp" type="number" value={form.final} onChange={s("final")} /></div>
        </div>
        <button className="bs" onClick={save}>Save Marks</button>
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
    setForm({category:"Academic",desc:""}); setOk("Submitted!"); setTimeout(()=>setOk(""),3000);
  };

  const resolve = id => { const u=all.map(c=>c.id===id?{...c,status:"Resolved"}:c); DB.setData("complaints",u); setAll(u); };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Complaints</h1><p>Review and resolve</p></div>
      {all.length===0 ? <div className="card"><div className="empty">No complaints yet.</div></div>
      : <div className="card"><div className="tw"><table>
          <thead><tr><th>Student</th><th>Category</th><th>Description</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>{all.map(c=><tr key={c.id}><td>{c.studentName}</td><td>{c.category}</td><td style={{maxWidth:200}}>{c.desc}</td><td>{c.date}</td><td><span className={`b ${c.status==="Resolved"?"bg":"by"}`}>{c.status}</span></td><td>{c.status!=="Resolved"&&<button className="bs" style={{fontSize:12,padding:"5px 12px"}} onClick={()=>resolve(c.id)}>Resolve</button>}</td></tr>)}</tbody>
        </table></div></div>}
    </div>
  );

  const mine = all.filter(c=>c.studentId===user.id);
  return (
    <div>
      <div className="ph"><h1>Submit Complaint</h1><p>Report an issue</p></div>
      <div className="card" style={{maxWidth:500}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="f1" style={{marginBottom:14}}><label>Category</label>
          <select className="inp" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
            <option>Academic</option><option>Facility</option><option>Financial</option><option>Administrative</option><option>Other</option>
          </select>
        </div>
        <div className="f1" style={{marginBottom:14}}><label>Description</label>
          <textarea className="inp" placeholder="Describe your issue..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} />
        </div>
        <button className="bs" onClick={submit}>Submit</button>
      </div>
      {mine.length>0&&<div className="card"><div className="ct">Your Complaints</div><div className="tw"><table>
        <thead><tr><th>Category</th><th>Description</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>{mine.map(c=><tr key={c.id}><td>{c.category}</td><td>{c.desc}</td><td>{c.date}</td><td><span className={`b ${c.status==="Resolved"?"bg":"by"}`}>{c.status}</span></td></tr>)}</tbody>
      </table></div></div>}
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
    setForm({title:"",content:"",audience:"All"}); setOk("Posted!"); setTimeout(()=>setOk(""),2000);
  };

  return (
    <div>
      <div className="ph"><h1>Announcements</h1><p>Campus news</p></div>
      {canPost&&<div className="card" style={{maxWidth:540,marginBottom:18}}>
        <div className="ct">Post Announcement</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="f1" style={{marginBottom:14}}><label>Title</label><input className="inp" placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        <div className="f1" style={{marginBottom:14}}><label>Content</label><textarea className="inp" placeholder="Write announcement..." value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} /></div>
        <div className="f1" style={{marginBottom:14}}><label>Audience</label>
          <select className="inp" value={form.audience} onChange={e=>setForm(f=>({...f,audience:e.target.value}))}>
            <option>All</option><option>Students</option><option>Teachers</option>
          </select>
        </div>
        <button className="bs" onClick={post}>Publish</button>
      </div>}
      {all.length===0 ? <div className="card"><div className="empty">No announcements yet.</div></div>
      : all.map(a=><div className="card" key={a.id}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,marginBottom:6}}>{a.title}</div>
          <div style={{fontSize:14,color:"#94a3b8",lineHeight:1.6,marginBottom:10}}>{a.content}</div>
          <div style={{fontSize:12,color:"#475569"}}>👤 {a.author} · 🗓 {a.date} · <span className="b bx">{a.audience}</span></div>
        </div>)}
    </div>
  );
}

/* ── COURT BOOKING ────────────────────────────────────────────── */
function Court({ user }) {
  const SLOTS = ["9:00-10:00","10:00-11:00","11:00-12:00","12:00-1:00","2:00-3:00","3:00-4:00","4:00-5:00","5:00-6:00"];
  const [bookings, setBookings] = useState(()=>DB.getData("court_bookings"));
  const [court, setCourt] = useState("Basketball");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [selected, setSelected] = useState(null); const [ok, setOk] = useState("");

  const takenSlots = bookings.filter(b=>b.court===court&&b.date===date).map(b=>b.slot);

  const book = () => {
    if (selected===null) return;
    const b = { id:Date.now().toString(), userId:user.id, userName:user.name, court, date, slot:SLOTS[selected] };
    const updated = [...bookings, b]; DB.setData("court_bookings",updated); setBookings(updated);
    setOk(`${court} booked for ${SLOTS[selected]}!`); setSelected(null); setTimeout(()=>setOk(""),3000);
  };

  const mine = bookings.filter(b=>b.userId===user.id);
  return (
    <div>
      <div className="ph"><h1>Court Booking</h1><p>Book a sports court</p></div>
      <div className="card" style={{maxWidth:580}}>
        {ok&&<div className="ok">✅ {ok}</div>}
        <div className="fl">
          <div className="f1"><label>Court</label>
            <select className="inp" value={court} onChange={e=>{setCourt(e.target.value);setSelected(null);}}>
              <option>Basketball</option><option>Tennis</option><option>Badminton</option><option>Cricket Net</option>
            </select>
          </div>
          <div className="f1"><label>Date</label><input className="inp" type="date" value={date} onChange={e=>{setDate(e.target.value);setSelected(null);}} /></div>
        </div>
        <div style={{fontSize:13,color:"#64748b",marginBottom:8}}>Select a time slot:</div>
        <div className="slots">
          {SLOTS.map((sl,i)=>{
            const taken=takenSlots.includes(sl); const sel=selected===i;
            return <div key={i} className={`slot ${taken?"st":sel?"ss2":"sa"}`} onClick={()=>!taken&&setSelected(i)}>{sl}<br/><span style={{fontSize:11}}>{taken?"Booked":sel?"Selected":"Free"}</span></div>;
          })}
        </div>
        <button className="bs" disabled={selected===null} onClick={book}>Confirm Booking</button>
      </div>
      {mine.length>0&&<div className="card"><div className="ct">Your Bookings</div><div className="tw"><table>
        <thead><tr><th>Court</th><th>Date</th><th>Time</th></tr></thead>
        <tbody>{mine.map(b=><tr key={b.id}><td>{b.court}</td><td>{b.date}</td><td>{b.slot}</td></tr>)}</tbody>
      </table></div></div>}
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
    setForm({name:"",code:"",credits:"3",teacher:"",seats:"30"}); setOk("Course added!"); setTimeout(()=>setOk(""),2000);
  };

  const register = course => {
    if (course.seats<=0) return;
    const reg = { id:Date.now().toString(), studentId:user.id, courseId:course.id, date:new Date().toISOString().slice(0,10) };
    const updatedRegs = [...regs, reg];
    const updatedCourses = courses.map(c=>c.id===course.id?{...c,seats:c.seats-1}:c);
    DB.setData("registrations",updatedRegs); DB.setData("courses",updatedCourses);
    setRegs(updatedRegs); setCourses(updatedCourses);
    setOk(`Registered for ${course.name}!`); setTimeout(()=>setOk(""),2000);
  };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Manage Courses</h1><p>Add courses for students to register</p></div>
      <div className="card" style={{maxWidth:540}}>
        <div className="ct">Add Course</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Course Name</label><input className="inp" placeholder="e.g. Data Structures" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div className="f1"><label>Code</label><input className="inp" placeholder="e.g. CS-202" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Teacher</label><input className="inp" placeholder="e.g. Dr. Ahmed" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} /></div>
          <div className="f1"><label>Credits</label><input className="inp" type="number" value={form.credits} onChange={e=>setForm(f=>({...f,credits:e.target.value}))} /></div>
          <div className="f1"><label>Seats</label><input className="inp" type="number" value={form.seats} onChange={e=>setForm(f=>({...f,seats:e.target.value}))} /></div>
        </div>
        <button className="bs" onClick={addCourse}>Add Course</button>
      </div>
      {courses.length>0&&<div className="card"><div className="ct">All Courses</div><div className="tw"><table>
        <thead><tr><th>Code</th><th>Name</th><th>Teacher</th><th>Credits</th><th>Seats</th></tr></thead>
        <tbody>{courses.map(c=><tr key={c.id}><td>{c.code}</td><td>{c.name}</td><td>{c.teacher||"—"}</td><td>{c.credits}</td><td>{c.seats}</td></tr>)}</tbody>
      </table></div></div>}
    </div>
  );

  const regIds = regs.filter(r=>r.studentId===user.id).map(r=>r.courseId);
  const myRegs = regs.filter(r=>r.studentId===user.id);
  return (
    <div>
      <div className="ph"><h1>Course Registration</h1><p>Register for available courses</p></div>
      {ok&&<div className="ok" style={{marginBottom:14}}>{ok}</div>}
      {courses.length===0 ? <div className="card"><div className="empty">No courses available. Admin needs to add courses first.</div></div>
      : <div className="card"><div className="tw"><table>
          <thead><tr><th>Code</th><th>Course</th><th>Teacher</th><th>Credits</th><th>Seats</th><th></th></tr></thead>
          <tbody>{courses.map(c=><tr key={c.id}><td>{c.code}</td><td>{c.name}</td><td>{c.teacher||"—"}</td><td>{c.credits}</td>
            <td><span className={`b ${c.seats>0?"bg":"br"}`}>{c.seats>0?c.seats+" left":"Full"}</span></td>
            <td>{regIds.includes(c.id)?<span className="b bb">Enrolled</span>:<button className="bs" style={{fontSize:12,padding:"5px 12px"}} disabled={c.seats<=0} onClick={()=>register(c)}>Register</button>}</td>
          </tr>)}</tbody>
        </table></div></div>}
      {myRegs.length>0&&<div className="card"><div className="ct">My Courses</div><div className="tw"><table>
        <thead><tr><th>Course</th><th>Code</th><th>Date Registered</th></tr></thead>
        <tbody>{myRegs.map(r=>{const c=courses.find(x=>x.id===r.courseId); return c?<tr key={r.id}><td>{c.name}</td><td>{c.code}</td><td>{r.date}</td></tr>:null;})}</tbody>
      </table></div></div>}
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
    setForm({studentId:"",amount:"",dueDate:"",semester:""}); setOk("Generated!"); setTimeout(()=>setOk(""),2000);
  };

  const pay = id => { const u=challans.map(c=>c.id===id?{...c,status:"Paid",paidDate:new Date().toISOString().slice(0,10)}:c); DB.setData("challans",u); setChallans(u); };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Fee Challans</h1><p>Generate student fee challans</p></div>
      <div className="card" style={{maxWidth:500}}>
        <div className="ct">Generate Challan</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="f1" style={{marginBottom:14}}><label>Student</label>
          <select className="inp" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
            <option value="">Select student</option>
            {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
          </select>
        </div>
        <div className="fl">
          <div className="f1"><label>Amount (PKR)</label><input className="inp" type="number" placeholder="e.g. 75000" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></div>
          <div className="f1"><label>Due Date</label><input className="inp" type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))} /></div>
        </div>
        <div className="f1" style={{marginBottom:14}}><label>Semester</label><input className="inp" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
        <button className="bs" onClick={generate}>Generate</button>
      </div>
      {challans.length>0&&<div className="card"><div className="ct">All Challans</div><div className="tw"><table>
        <thead><tr><th>Student</th><th>Amount</th><th>Due</th><th>Semester</th><th>Status</th></tr></thead>
        <tbody>{challans.map(c=>{const s=students.find(x=>x.id===c.studentId); return <tr key={c.id}><td>{s?.name||"—"}</td><td>PKR {c.amount}</td><td>{c.dueDate}</td><td>{c.semester||"—"}</td><td><span className={`b ${c.status==="Paid"?"bg":"by"}`}>{c.status}</span></td></tr>; })}</tbody>
      </table></div></div>}
    </div>
  );

  const mine = challans.filter(c=>c.studentId===user.id);
  return (
    <div>
      <div className="ph"><h1>Fee Challan</h1><p>View and pay your fee</p></div>
      {mine.length===0 ? <div className="card"><div className="empty">No challan generated for you yet.</div></div>
      : mine.map(c=><div className="card" key={c.id} style={{maxWidth:440}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            {[["Amount","PKR "+c.amount],["Due Date",c.dueDate],["Semester",c.semester||"—"],["Status",c.status]].map(([l,v])=>(
              <div key={l}><div style={{fontSize:12,color:"#64748b"}}>{l}</div><div style={{fontWeight:600,marginTop:2}}>{v}</div></div>
            ))}
          </div>
          {c.status==="Pending"&&<button className="bs" onClick={()=>pay(c.id)}>Mark as Paid</button>}
          {c.status==="Paid"&&<div className="ok">✅ Paid on {c.paidDate}</div>}
        </div>)}
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
    setForm({studentId:"",semester:"",courses:"",gpa:""}); setOk("Generated!"); setTimeout(()=>setOk(""),2000);
  };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Generate Transcripts</h1><p>Create semester transcripts</p></div>
      <div className="card" style={{maxWidth:500}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Student</label>
            <select className="inp" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
              <option value="">Select student</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="f1"><label>Semester</label><input className="inp" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
        </div>
        <div className="f1" style={{marginBottom:14}}><label>Courses (comma separated)</label><input className="inp" placeholder="OOP, DS, DB Systems" value={form.courses} onChange={e=>setForm(f=>({...f,courses:e.target.value}))} /></div>
        <div className="f1" style={{marginBottom:14}}><label>GPA</label><input className="inp" type="number" step="0.01" placeholder="e.g. 3.75" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
        <button className="bs" onClick={generate}>Generate</button>
      </div>
    </div>
  );

  const mine = transcripts.filter(t=>t.studentId===user.id);
  return (
    <div>
      <div className="ph"><h1>My Transcripts</h1><p>Semester academic records</p></div>
      {mine.length===0 ? <div className="card"><div className="empty">No transcripts generated yet.</div></div>
      : mine.map(t=><div className="card" key={t.id}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16}}>{t.semester}</div>
            {t.gpa&&<div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"#38bdf8"}}>GPA {t.gpa}</div>}
          </div>
          {t.courses&&<div style={{fontSize:13,color:"#94a3b8"}}>Courses: {t.courses}</div>}
          <div style={{fontSize:12,color:"#475569",marginTop:8}}>By {t.generatedBy} · {t.generatedDate}</div>
        </div>)}
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
    setForm({studentId:"",title:"",semester:"",gpa:"",description:""}); setOk("Added!"); setTimeout(()=>setOk(""),2000);
  };

  return (
    <div>
      <div className="ph"><h1>Honor List</h1><p>Academic achievements</p></div>
      {canManage&&<div className="card" style={{maxWidth:500,marginBottom:18}}>
        <div className="ct">Add Achievement</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Student</label>
            <select className="inp" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
              <option value="">Select student</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="f1"><label>Achievement</label><input className="inp" placeholder="e.g. Dean's List" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Semester</label><input className="inp" placeholder="Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
          <div className="f1"><label>GPA</label><input className="inp" type="number" step="0.01" placeholder="3.9" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
        </div>
        <div className="f1" style={{marginBottom:14}}><label>Note</label><input className="inp" placeholder="Optional" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} /></div>
        <button className="bs" onClick={add}>Add</button>
      </div>}
      {list.length===0 ? <div className="card"><div className="empty">No achievements yet.</div></div>
      : list.map((h,i)=><div className="card" key={h.id} style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,color:i===0?"#f59e0b":i===1?"#cbd5e1":i===2?"#d97706":"#475569",minWidth:40,textAlign:"center"}}>
            {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:15}}>{h.studentName} <span style={{fontSize:12,color:"#64748b"}}>({h.rollno})</span></div>
            <div style={{fontSize:13,color:"#38bdf8",marginTop:2}}>{h.title}</div>
            {h.semester&&<div style={{fontSize:12,color:"#64748b",marginTop:2}}>{h.semester}{h.gpa?` · GPA ${h.gpa}`:""}</div>}
          </div>
        </div>)}
    </div>
  );
}

/* ── NAV ──────────────────────────────────────────────────────── */
function getNav(role) {
  const s = [
    {id:"dashboard",label:"Dashboard",icon:"🏠",sec:"Main"},
    {id:"profile",label:"My Profile",icon:"👤",sec:"Main"},
    {id:"attendance",label:"Attendance",icon:"📅",sec:"Academics"},
    {id:"marks",label:"My Marks",icon:"📊",sec:"Academics"},
    {id:"transcript",label:"Transcript",icon:"📄",sec:"Academics"},
    {id:"courses",label:"Course Registration",icon:"📚",sec:"Academics"},
    {id:"fee",label:"Fee Challan",icon:"💳",sec:"Finance"},
    {id:"court",label:"Court Booking",icon:"🎾",sec:"Campus"},
    {id:"complaints",label:"Complaints",icon:"📋",sec:"Campus"},
    {id:"announcements",label:"Announcements",icon:"📢",sec:"Campus"},
    {id:"honor",label:"Honor List",icon:"🏆",sec:"Campus"},
  ];
  const t = [
    {id:"dashboard",label:"Dashboard",icon:"🏠",sec:"Main"},
    {id:"profile",label:"My Profile",icon:"👤",sec:"Main"},
    {id:"attendance",label:"Mark Attendance",icon:"✅",sec:"Teaching"},
    {id:"marks",label:"Upload Marks",icon:"📝",sec:"Teaching"},
    {id:"transcript",label:"Transcripts",icon:"📄",sec:"Teaching"},
    {id:"honor",label:"Honor List",icon:"🏆",sec:"Teaching"},
    {id:"announcements",label:"Announcements",icon:"📢",sec:"Campus"},
  ];
  const a = [
    {id:"dashboard",label:"Dashboard",icon:"🏠",sec:"Main"},
    {id:"profile",label:"My Profile",icon:"👤",sec:"Main"},
    {id:"courses",label:"Manage Courses",icon:"📚",sec:"Management"},
    {id:"fee",label:"Fee Challans",icon:"💳",sec:"Management"},
    {id:"transcript",label:"Transcripts",icon:"📄",sec:"Management"},
    {id:"honor",label:"Honor List",icon:"🏆",sec:"Management"},
    {id:"complaints",label:"Complaints",icon:"📋",sec:"Management"},
    {id:"announcements",label:"Announcements",icon:"📢",sec:"Campus"},
  ];
  return {student:s,teacher:t,admin:a}[role]||s;
}

/* ── ROOT ─────────────────────────────────────────────────────── */
export default function CampusConnect() {
  const [user, setUser] = useState(() => DB.getSession());
  const [page, setPage] = useState("dashboard");

  const logout = () => { DB.clearSession(); setUser(null); setPage("dashboard"); };
  const updateUser = u => setUser(u);

  if (!user) return (<><style>{css}</style><Auth onLogin={u=>{setUser(u);setPage("dashboard");}}/></>);

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
    <>
      <style>{css}</style>
      <div className="app">
        <div className="sidebar">
          <div className="s-logo">Campus<span>Connect</span></div>
          {sections.map(sec=>(
            <div key={sec}>
              <div className="s-label">{sec}</div>
              {nav.filter(n=>n.sec===sec).map(n=>(
                <div key={n.id} className={`nav ${page===n.id?"on":""}`} onClick={()=>setPage(n.id)}>
                  <span>{n.icon}</span>{n.label}
                </div>
              ))}
            </div>
          ))}
          <div className="s-bottom">
            <div className="u-chip">
              <div className="u-av">{user.name.charAt(0)}</div>
              <div><div className="u-name">{user.name}</div><div className="u-role">{user.role}</div></div>
            </div>
            <button className="logout" onClick={logout}>⬅ Log Out</button>
          </div>
        </div>
        <div className="main">{renderPage()}</div>
      </div>
    </>
  );
}
