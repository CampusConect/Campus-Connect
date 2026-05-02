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

/* ── API ──────────────────────────────────────────────────────── */
const API = "http://localhost:5000/api";
const api = {
  post: async (url, data) => { const res = await fetch(`${API}${url}`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) }); return res.json(); },
  get:  async (url)       => { const res = await fetch(`${API}${url}`); return res.json(); },
  put:  async (url, data) => { const res = await fetch(`${API}${url}`, { method:"PUT",  headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) }); return res.json(); },
  del:  async (url)       => { const res = await fetch(`${API}${url}`, { method:"DELETE" }); return res.json(); },
};

/* ── AUTH ─────────────────────────────────────────────────────── */
function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name:"", email:"", password:"", rollno:"", empId:"" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const set = (k) => (e) => { setErr(""); setForm(f => ({ ...f, [k]: e.target.value })); };

  const signup = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return setErr("All fields are required.");
    if (role === "student" && !form.rollno.trim()) return setErr("Roll number is required.");
    if (role === "teacher" && !form.empId.trim()) return setErr("Department is required.");
    try {
      let result;
      if (role === "student") result = await api.post("/auth/signup/student", { name:form.name.trim(), email:form.email.trim(), password:form.password, rollnum:form.rollno.trim(), program:"BS CS", semester:1 });
      else if (role === "teacher") result = await api.post("/auth/signup/teacher", { name:form.name.trim(), email:form.email.trim(), password:form.password, department:form.empId.trim() });
      if (result.error) return setErr(result.error);
      setOk("Account created! Please log in.");
      setTimeout(() => { setMode("login"); setOk(""); }, 1200);
    } catch(e) { setErr("Server error. Is the backend running?"); }
  };

  const login = async () => {
    if (!form.email.trim() || !form.password.trim()) return setErr("Enter email and password.");
    try {
      let result;
      if (role === "student")      result = await api.post("/auth/login/student", { email:form.email.trim(), password:form.password });
      else if (role === "teacher") result = await api.post("/auth/login/teacher", { email:form.email.trim(), password:form.password });
      else                         result = await api.post("/auth/login/admin",   { email:form.email.trim(), password:form.password });
      if (result.error) return setErr(result.error);
      const u = { ...result.user, ...result.student, ...result.teacher, role: result.user?.role1 || role };
      onLogin(u);
    } catch(e) { setErr("Server error. Is the backend running?"); }
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
        {mode==="signup" && role==="teacher" && <div className="field"><label>Department</label><input className="inp" placeholder="e.g. Computer Science" value={form.empId} onChange={set("empId")} /></div>}
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
          {user.role==="student" && `${user.rollnum||"Roll not set"} · Semester ${user.semester||1}`}
          {user.role==="teacher" && `${user.department||"Department not set"} · Faculty`}
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
          {user.role==="teacher" && <div style={{marginTop:6}}>🏫 Dept: {user.department||"—"}</div>}
        </div>
      </div>
    </div>
  );
}

/* ── PROFILE ──────────────────────────────────────────────────── */
function Profile({ user, onUpdate }) {
  const [form, setForm] = useState({ name:user.name, email:user.email, program:user.program||"", dept:user.department||"", semester:user.semester||1, newPass:"" });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");
  const s = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const save = async () => {
    if (!form.name.trim()||!form.email.trim()) return setErr("Name and email required.");
    try {
      const result = await api.put("/profile/update", { userid:user.userid, name:form.name.trim(), email:form.email.trim(), password:form.newPass.trim()||user.password });
      if (result.error) return setErr(result.error);
      setOk("Saved!"); setErr("");
      onUpdate({ ...user, name:form.name.trim(), email:form.email.trim() });
      setTimeout(()=>setOk(""),3000);
    } catch(e) { setErr("Server error."); }
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
  const [course, setCourse] = useState(""); const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [status, setStatus] = useState("present"); const [selStudent, setSelStudent] = useState(""); const [ok, setOk] = useState("");
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (isTeacher) {
      api.get("/course/view").then(r => {});
    } else {
      // student: we don't know courseid upfront, show all by fetching per course if needed
      // for now show empty until a courseid approach is wired with registration
    }
  }, []);

  const markAtt = async () => {
    if (!course.trim()||!selStudent) return;
    try {
      const result = await api.post("/attendance/update", { teacherid:user.teacherid, studentid:parseInt(selStudent), courseid:parseInt(course), attenddate:date, attendstatus:status });
      if (result.error) return alert(result.error);
      setOk("Saved!"); setTimeout(()=>setOk(""),2000);
    } catch(e) { alert("Server error."); }
  };

  const loadStudentAtt = async () => {
    if (!course.trim()) return;
    try {
      const r = await api.get(`/attendance/view/${user.studentid}/${course}`);
      setRecords(r.data||[]);
    } catch(e) {}
  };

  if (!isTeacher) {
    return (
      <div>
        <div className="ph"><h1>My Attendance</h1><p>Enter a Course ID to view your records</p></div>
        <div className="card" style={{maxWidth:400}}>
          <div className="fl">
            <div className="f1"><label>Course ID</label><input className="inp" placeholder="e.g. 1" value={course} onChange={e=>setCourse(e.target.value)} /></div>
          </div>
          <button className="bs" onClick={loadStudentAtt}>Load</button>
        </div>
        {records.length===0 ? <div className="card"><div className="empty">No attendance records.</div></div>
        : <div className="card"><div className="tw"><table>
            <thead><tr><th>Course</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>{records.map((r,i)=><tr key={i}><td>{r.coursename}</td><td>{r.attenddate?.slice(0,10)}</td><td><span className={`b ${r.attendstatus==="present"?"bg":r.attendstatus==="absent"?"br":"by"}`}>{r.attendstatus}</span></td></tr>)}</tbody>
          </table></div></div>}
      </div>
    );
  }

  return (
    <div>
      <div className="ph"><h1>Mark Attendance</h1><p>Record attendance for your students</p></div>
      <div className="card" style={{maxWidth:520}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Course ID</label><input className="inp" placeholder="e.g. 1" value={course} onChange={e=>setCourse(e.target.value)} /></div>
          <div className="f1"><label>Date</label><input className="inp" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Student ID</label><input className="inp" placeholder="e.g. 1" value={selStudent} onChange={e=>setSelStudent(e.target.value)} /></div>
          <div className="f1"><label>Status</label>
            <select className="inp" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="present">Present</option><option value="absent">Absent</option><option value="late">Late</option>
            </select>
          </div>
        </div>
        <button className="bs" onClick={markAtt}>Save</button>
      </div>
    </div>
  );
}

/* ── MARKS ────────────────────────────────────────────────────── */
function Marks({ user }) {
  const isTeacher = user.role==="teacher"||user.role==="admin";
  const [allMarks, setAllMarks] = useState([]);
  const [form, setForm] = useState({studentId:"",courseId:"",assignment:"",exam:"",total:""});
  const [ok, setOk] = useState("");
  const [courseInput, setCourseInput] = useState("");
  const s = k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const loadMarks = async () => {
    if (!courseInput.trim()) return;
    try {
      const r = await api.get(`/marks/view/${user.studentid}/${courseInput}`);
      setAllMarks(r.data||[]);
    } catch(e) {}
  };

  const save = async () => {
    if (!form.studentId||!form.courseId) return;
    try {
      const result = await api.post("/marks/update", { teacherid:user.teacherid, studentid:parseInt(form.studentId), courseid:parseInt(form.courseId), assignmentmarks:Number(form.assignment), exammarks:Number(form.exam), totalmarks:Number(form.total) });
      if (result.error) return alert(result.error);
      setForm({studentId:"",courseId:"",assignment:"",exam:"",total:""});
      setOk("Marks saved!"); setTimeout(()=>setOk(""),2000);
    } catch(e) { alert("Server error."); }
  };

  if (!isTeacher) {
    return (
      <div>
        <div className="ph"><h1>My Marks</h1><p>Enter a Course ID to view your marks</p></div>
        <div className="card" style={{maxWidth:400}}>
          <div className="f1" style={{marginBottom:14}}><label>Course ID</label><input className="inp" placeholder="e.g. 1" value={courseInput} onChange={e=>setCourseInput(e.target.value)} /></div>
          <button className="bs" onClick={loadMarks}>Load</button>
        </div>
        {allMarks.length===0 ? <div className="card"><div className="empty">No marks yet.</div></div>
        : <div className="card"><div className="tw"><table>
            <thead><tr><th>Course</th><th>Assignment</th><th>Exam</th><th>Total</th></tr></thead>
            <tbody>{allMarks.map((r,i)=><tr key={i}><td>{r.coursename}</td><td>{r.assignmentmarks??"—"}</td><td>{r.exammarks??"—"}</td><td>{r.totalmarks??"—"}</td></tr>)}</tbody>
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
          <div className="f1"><label>Student ID</label><input className="inp" placeholder="e.g. 1" value={form.studentId} onChange={s("studentId")} /></div>
          <div className="f1"><label>Course ID</label><input className="inp" placeholder="e.g. 1" value={form.courseId} onChange={s("courseId")} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Assignment Marks</label><input className="inp" type="number" value={form.assignment} onChange={s("assignment")} /></div>
          <div className="f1"><label>Exam Marks</label><input className="inp" type="number" value={form.exam} onChange={s("exam")} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Total Marks</label><input className="inp" type="number" value={form.total} onChange={s("total")} /></div>
        </div>
        <button className="bs" onClick={save}>Save Marks</button>
      </div>
    </div>
  );
}

/* ── COMPLAINTS ───────────────────────────────────────────────── */
function Complaints({ user }) {
  const isAdmin = user.role==="admin";
  const [all, setAll] = useState([]);
  const [form, setForm] = useState({desc:""});
  const [ok, setOk] = useState("");

  const load = async () => {
    try {
      if (isAdmin) { const r = await api.get("/complaint/view"); setAll(r.data||[]); }
      else { const r = await api.get(`/complaint/view/${user.studentid}`); setAll(r.data||[]); }
    } catch(e) {}
  };
  useEffect(()=>{ load(); },[]);

  const submit = async () => {
    if (!form.desc.trim()) return;
    try {
      const result = await api.post("/complaint/submit", { studentid:user.studentid, description:form.desc.trim() });
      if (result.error) return alert(result.error);
      setForm({desc:""}); setOk("Submitted!"); setTimeout(()=>setOk(""),3000);
      load();
    } catch(e) { alert("Server error."); }
  };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Complaints</h1><p>Review and resolve</p></div>
      {all.length===0 ? <div className="card"><div className="empty">No complaints yet.</div></div>
      : <div className="card"><div className="tw"><table>
          <thead><tr><th>Student</th><th>Description</th><th>Date</th></tr></thead>
          <tbody>{all.map((c,i)=><tr key={i}><td>{c.name||"—"}</td><td style={{maxWidth:200}}>{c.description1}</td><td>{c.datesubmitted?.slice(0,10)}</td></tr>)}</tbody>
        </table></div></div>}
    </div>
  );

  return (
    <div>
      <div className="ph"><h1>Submit Complaint</h1><p>Report an issue</p></div>
      <div className="card" style={{maxWidth:500}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="f1" style={{marginBottom:14}}><label>Description</label>
          <textarea className="inp" placeholder="Describe your issue..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} />
        </div>
        <button className="bs" onClick={submit}>Submit</button>
      </div>
      {all.length>0&&<div className="card"><div className="ct">Your Complaints</div><div className="tw"><table>
        <thead><tr><th>Description</th><th>Date</th></tr></thead>
        <tbody>{all.map((c,i)=><tr key={i}><td>{c.description1}</td><td>{c.datesubmitted?.slice(0,10)}</td></tr>)}</tbody>
      </table></div></div>}
    </div>
  );
}

/* ── ANNOUNCEMENTS ────────────────────────────────────────────── */
function Announcements({ user }) {
  const canPost = user.role==="admin"||user.role==="teacher";
  const [all, setAll] = useState([]);
  const [form, setForm] = useState({title:"",content:""});
  const [ok, setOk] = useState("");

  const load = async () => { try { const r = await api.get("/announcement/view"); setAll(r.data||[]); } catch(e) {} };
  useEffect(()=>{ load(); },[]);

  const post = async () => {
    if (!form.title.trim()||!form.content.trim()) return;
    try {
      const result = await api.post("/announcement/add", { postedbyid:user.userid, title:form.title.trim(), text1:form.content.trim() });
      if (result.error) return alert(result.error);
      setForm({title:"",content:""}); setOk("Posted!"); setTimeout(()=>setOk(""),2000);
      load();
    } catch(e) { alert("Server error."); }
  };

  return (
    <div>
      <div className="ph"><h1>Announcements</h1><p>Campus news</p></div>
      {canPost&&<div className="card" style={{maxWidth:540,marginBottom:18}}>
        <div className="ct">Post Announcement</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="f1" style={{marginBottom:14}}><label>Title</label><input className="inp" placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        <div className="f1" style={{marginBottom:14}}><label>Content</label><textarea className="inp" placeholder="Write announcement..." value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} /></div>
        <button className="bs" onClick={post}>Publish</button>
      </div>}
      {all.length===0 ? <div className="card"><div className="empty">No announcements yet.</div></div>
      : all.map((a,i)=><div className="card" key={i}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,marginBottom:6}}>{a.title}</div>
          <div style={{fontSize:14,color:"#94a3b8",lineHeight:1.6,marginBottom:10}}>{a.text1}</div>
          <div style={{fontSize:12,color:"#475569"}}>👤 {a.postedby} · 🗓 {a.dateposted?.slice(0,10)}</div>
        </div>)}
    </div>
  );
}

/* ── COURT BOOKING ────────────────────────────────────────────── */
function Court({ user }) {
  const SLOTS = [
    {label:"9:00-10:00",  start:"09:00:00", end:"10:00:00"},
    {label:"10:00-11:00", start:"10:00:00", end:"11:00:00"},
    {label:"11:00-12:00", start:"11:00:00", end:"12:00:00"},
    {label:"12:00-13:00", start:"12:00:00", end:"13:00:00"},
    {label:"14:00-15:00", start:"14:00:00", end:"15:00:00"},
    {label:"15:00-16:00", start:"15:00:00", end:"16:00:00"},
    {label:"16:00-17:00", start:"16:00:00", end:"17:00:00"},
    {label:"17:00-18:00", start:"17:00:00", end:"18:00:00"},
  ];
  const [bookings, setBookings] = useState([]);
  const [court, setCourt] = useState("Basketball");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [selected, setSelected] = useState(null); const [ok, setOk] = useState("");

  const load = async () => { try { const r = await api.get(`/court/view/${user.studentid}`); setBookings(r.data||[]); } catch(e) {} };
  useEffect(()=>{ load(); },[]);

  const book = async () => {
    if (selected===null) return;
    try {
      const sl = SLOTS[selected];
      const result = await api.post("/court/book", { studentid:user.studentid, sport:court, bookingdate:date, starttime:sl.start, endtime:sl.end });
      if (result.error) return alert(result.error);
      setOk(`${court} booked for ${sl.label}!`); setSelected(null); setTimeout(()=>setOk(""),3000);
      load();
    } catch(e) { alert("Server error."); }
  };

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
            const sel=selected===i;
            return <div key={i} className={`slot ${sel?"ss2":"sa"}`} onClick={()=>setSelected(i)}>{sl.label}<br/><span style={{fontSize:11}}>{sel?"Selected":"Free"}</span></div>;
          })}
        </div>
        <button className="bs" disabled={selected===null} onClick={book}>Confirm Booking</button>
      </div>
      {bookings.length>0&&<div className="card"><div className="ct">Your Bookings</div><div className="tw"><table>
        <thead><tr><th>Court</th><th>Date</th><th>Start</th><th>End</th></tr></thead>
        <tbody>{bookings.map((b,i)=><tr key={i}><td>{b.sport}</td><td>{b.bookingdate?.slice(0,10)}</td><td>{b.starttime}</td><td>{b.endtime}</td></tr>)}</tbody>
      </table></div></div>}
    </div>
  );
}

/* ── COURSE REGISTRATION ──────────────────────────────────────── */
function CourseReg({ user }) {
  const isAdmin = user.role==="admin";
  const [courses, setCourses] = useState([]);
  const [regs, setRegs] = useState([]);
  const [form, setForm] = useState({name:"",code:"",credits:"3",teacher:"",seats:"30"});
  const [ok, setOk] = useState("");

  const loadCourses = async () => { try { const r = await api.get("/course/view"); setCourses(r.data||[]); } catch(e) {} };
  const loadRegs    = async () => { try { const r = await api.get(`/course/registrations/${user.studentid}`); setRegs(r.data||[]); } catch(e) {} };

  useEffect(()=>{ loadCourses(); if (!isAdmin) loadRegs(); },[]);

  const addCourse = async () => {
    if (!form.name.trim()||!form.code.trim()) return;
    try {
      const result = await api.post("/course/create", { coursecode:form.code.trim(), coursename:form.name.trim(), credithours:Number(form.credits), teacherid:null });
      if (result.error) return alert(result.error);
      setForm({name:"",code:"",credits:"3",teacher:"",seats:"30"}); setOk("Course added!"); setTimeout(()=>setOk(""),2000);
      loadCourses();
    } catch(e) { alert("Server error."); }
  };

  const register = async (course) => {
    try {
      const result = await api.post("/course/register", { studentid:user.studentid, courseid:course.courseid, semester:"Semester "+user.semester });
      if (result.error) return alert(result.error);
      setOk(`Registered for ${course.coursename}!`); setTimeout(()=>setOk(""),2000);
      loadRegs();
    } catch(e) { alert("Server error."); }
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
          <div className="f1"><label>Credits</label><input className="inp" type="number" value={form.credits} onChange={e=>setForm(f=>({...f,credits:e.target.value}))} /></div>
        </div>
        <button className="bs" onClick={addCourse}>Add Course</button>
      </div>
      {courses.length>0&&<div className="card"><div className="ct">All Courses</div><div className="tw"><table>
        <thead><tr><th>Code</th><th>Name</th><th>Credits</th></tr></thead>
        <tbody>{courses.map((c,i)=><tr key={i}><td>{c.coursecode}</td><td>{c.coursename}</td><td>{c.credithours}</td></tr>)}</tbody>
      </table></div></div>}
    </div>
  );

  const regCourseIds = regs.map(r=>r.courseid);
  return (
    <div>
      <div className="ph"><h1>Course Registration</h1><p>Register for available courses</p></div>
      {ok&&<div className="ok" style={{marginBottom:14}}>{ok}</div>}
      {courses.length===0 ? <div className="card"><div className="empty">No courses available. Admin needs to add courses first.</div></div>
      : <div className="card"><div className="tw"><table>
          <thead><tr><th>Code</th><th>Course</th><th>Credits</th><th></th></tr></thead>
          <tbody>{courses.map((c,i)=><tr key={i}><td>{c.coursecode}</td><td>{c.coursename}</td><td>{c.credithours}</td>
            <td>{regCourseIds.includes(c.courseid)?<span className="b bb">Enrolled</span>:<button className="bs" style={{fontSize:12,padding:"5px 12px"}} onClick={()=>register(c)}>Register</button>}</td>
          </tr>)}</tbody>
        </table></div></div>}
      {regs.length>0&&<div className="card"><div className="ct">My Courses</div><div className="tw"><table>
        <thead><tr><th>Course</th><th>Code</th><th>Credits</th><th>Semester</th></tr></thead>
        <tbody>{regs.map((r,i)=><tr key={i}><td>{r.coursename}</td><td>{r.coursecode}</td><td>{r.credithours}</td><td>{r.semester}</td></tr>)}</tbody>
      </table></div></div>}
    </div>
  );
}

/* ── FEE CHALLAN ──────────────────────────────────────────────── */
function Fee({ user }) {
  const isAdmin = user.role==="admin";
  const [challans, setChallans] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [form, setForm] = useState({studentId:"",dueDate:""});
  const [ok, setOk] = useState("");

  const loadChallans = async () => {
    try {
      if (isAdmin) {
        // admin sees all — not a current API endpoint, leave empty for now
      } else {
        const r = await api.get(`/fee/view/${user.studentid}`); setChallans(r.data||[]);
      }
    } catch(e) {}
  };
  useEffect(()=>{ loadChallans(); },[]);

  const generate = async () => {
    if (!form.studentId||!form.dueDate) return;
    try {
      const result = await api.post("/fee/generate", { adminid:user.adminid, studentid:parseInt(form.studentId), duedate:form.dueDate });
      if (result.error) return alert(result.error);
      setForm({studentId:"",dueDate:""}); setOk("Generated!"); setTimeout(()=>setOk(""),2000);
    } catch(e) { alert("Server error."); }
  };

  const pay = async (challanid) => {
    try {
      const result = await api.post("/fee/pay", { studentid:user.studentid, challanid });
      if (result.error) return alert(result.error);
      loadChallans();
    } catch(e) { alert("Server error."); }
  };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Fee Challans</h1><p>Generate student fee challans</p></div>
      <div className="card" style={{maxWidth:500}}>
        <div className="ct">Generate Challan</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Student ID</label><input className="inp" placeholder="e.g. 1" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))} /></div>
          <div className="f1"><label>Due Date</label><input className="inp" type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))} /></div>
        </div>
        <button className="bs" onClick={generate}>Generate</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="ph"><h1>Fee Challan</h1><p>View and pay your fee</p></div>
      {challans.length===0 ? <div className="card"><div className="empty">No challan generated for you yet.</div></div>
      : challans.map((c,i)=><div className="card" key={i} style={{maxWidth:440}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            {[["Amount","PKR "+(c.totalamount||"—")],["Due Date",c.duedate?.slice(0,10)],["Status",c.challanstatus]].map(([l,v])=>(
              <div key={l}><div style={{fontSize:12,color:"#64748b"}}>{l}</div><div style={{fontWeight:600,marginTop:2}}>{v}</div></div>
            ))}
          </div>
          {c.challanstatus==="due"&&<button className="bs" onClick={()=>pay(c.challanid)}>Pay Now</button>}
          {c.challanstatus==="paid"&&<div className="ok">✅ Paid on {c.payment?.slice(0,10)}</div>}
        </div>)}
    </div>
  );
}

/* ── TRANSCRIPT ───────────────────────────────────────────────── */
function Transcript({ user }) {
  const isAdmin = user.role==="admin"||user.role==="teacher";
  const [transcripts, setTranscripts] = useState([]);
  const [form, setForm] = useState({studentId:"",semester:"",gpa:""});
  const [ok, setOk] = useState("");

  useEffect(()=>{
    if (!isAdmin && user.studentid) {
      api.get(`/transcript/get/${user.studentid}`).then(r=>setTranscripts(r.data||[])).catch(()=>{});
    }
  },[]);

  const generate = async () => {
    if (!form.studentId||!form.semester) return;
    try {
      const result = await api.post("/transcript/generate", { teacherid:user.teacherid||1, adminid:user.adminid||1, studentid:parseInt(form.studentId), semester:parseInt(form.semester), totalgpa:parseFloat(form.gpa)||0 });
      if (result.error) return alert(result.error);
      setForm({studentId:"",semester:"",gpa:""}); setOk("Generated!"); setTimeout(()=>setOk(""),2000);
    } catch(e) { alert("Server error."); }
  };

  if (isAdmin) return (
    <div>
      <div className="ph"><h1>Generate Transcripts</h1><p>Create semester transcripts</p></div>
      <div className="card" style={{maxWidth:500}}>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Student ID</label><input className="inp" placeholder="e.g. 1" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))} /></div>
          <div className="f1"><label>Semester (number)</label><input className="inp" type="number" placeholder="e.g. 4" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
        </div>
        <div className="f1" style={{marginBottom:14}}><label>GPA</label><input className="inp" type="number" step="0.01" placeholder="e.g. 3.75" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
        <button className="bs" onClick={generate}>Generate</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="ph"><h1>My Transcripts</h1><p>Semester academic records</p></div>
      {transcripts.length===0 ? <div className="card"><div className="empty">No transcripts generated yet.</div></div>
      : transcripts.map((t,i)=><div className="card" key={i}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16}}>Semester {t.semester}</div>
            {t.totalgpa&&<div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"#38bdf8"}}>GPA {t.totalgpa}</div>}
          </div>
          <div style={{fontSize:12,color:"#475569",marginTop:8}}>Generated {t.generateddate?.slice(0,10)}</div>
        </div>)}
    </div>
  );
}

/* ── HONOR LIST ───────────────────────────────────────────────── */
function HonorList({ user }) {
  const canManage = user.role==="admin"||user.role==="teacher";
  const [list, setList] = useState([]);
  const [form, setForm] = useState({studentId:"",title:"",semester:"",gpa:"",description:""});
  const [ok, setOk] = useState("");

  const load = async () => { try { const r = await api.get("/honor/view"); setList(r.data||[]); } catch(e) {} };
  useEffect(()=>{ load(); },[]);

  const add = async () => {
    if (!form.studentId||!form.title.trim()) return;
    try {
      const result = await api.post("/achievement/add", { studentid:parseInt(form.studentId), title1:form.title.trim(), desc1:form.description.trim(), semester:parseInt(form.semester)||1, gpa:parseFloat(form.gpa)||0 });
      if (result.error) return alert(result.error);
      setForm({studentId:"",title:"",semester:"",gpa:"",description:""}); setOk("Added!"); setTimeout(()=>setOk(""),2000);
      load();
    } catch(e) { alert("Server error."); }
  };

  return (
    <div>
      <div className="ph"><h1>Honor List</h1><p>Academic achievements</p></div>
      {canManage&&<div className="card" style={{maxWidth:500,marginBottom:18}}>
        <div className="ct">Add Achievement</div>
        {ok&&<div className="ok">{ok}</div>}
        <div className="fl">
          <div className="f1"><label>Student ID</label><input className="inp" placeholder="e.g. 1" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))} /></div>
          <div className="f1"><label>Achievement</label><input className="inp" placeholder="e.g. Dean's List" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
        </div>
        <div className="fl">
          <div className="f1"><label>Semester</label><input className="inp" type="number" placeholder="e.g. 4" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
          <div className="f1"><label>GPA</label><input className="inp" type="number" step="0.01" placeholder="3.9" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
        </div>
        <div className="f1" style={{marginBottom:14}}><label>Note</label><input className="inp" placeholder="Optional" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} /></div>
        <button className="bs" onClick={add}>Add</button>
      </div>}
      {list.length===0 ? <div className="card"><div className="empty">No achievements yet.</div></div>
      : list.map((h,i)=><div className="card" key={i} style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,color:i===0?"#f59e0b":i===1?"#cbd5e1":i===2?"#d97706":"#475569",minWidth:40,textAlign:"center"}}>
            {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:15}}>{h.studentname}</div>
            <div style={{fontSize:13,color:"#38bdf8",marginTop:2}}>{h.title1}</div>
            {h.semester&&<div style={{fontSize:12,color:"#64748b",marginTop:2}}>Semester {h.semester}{h.gpa?` · GPA ${h.gpa}`:""}</div>}
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
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  const logout = () => { setUser(null); setPage("dashboard"); };
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