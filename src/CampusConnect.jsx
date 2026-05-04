import { useState, useEffect } from "react";

/* ── ICONS (Heroicons) ────────────────────────────────────────── */
const Icons = {
  Home: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  User: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
  Calendar: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
  Chart: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  Document: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
  Book: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>,
  CreditCard: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>,
  Trophy: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" /></svg>,
  ClipboardList: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V8.25H8.25Zm0 0h.008v.008H8.25V8.25Z" /></svg>,
  Speakerphone: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" /></svg>,
  CheckCircle: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  AcademicCap: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
  BuildingOffice: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>,
  Mail: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
  Cog: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.79l.867-1.23M15.631 5.44l.867-1.23M10.142 20.841l.49-1.42m2.736-7.923.49-1.42M13.25 21.465l.135-1.492m-2.77-15.946.135-1.492m-3.805 16.536-1.492-.135m15.946-2.77-1.492-.135M5.44 15.631l-1.23-.867m16.35-11.49-1.23-.867M3.159 10.142l-1.42.49m17.923-2.736-1.42.49m-17.41 3.805-.513-1.41m16.536-3.805-.513-1.41M1.5 12h21" /></svg>,
  Logout: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>,
  ArrowRight: () => <svg className="icon" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
};

/* ── STORAGE ──────────────────────────────────────────────────── */
/* ── API CLIENT ───────────────────────────────────────────────── */
const API_URL = "https://campus-connect-production-971b.up.railway.app/api";

async function apiCall(path, method = "GET", body) {
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  let res;
  try { res = await fetch(`${API_URL}${path}`, opts); }
  catch { throw new Error("Cannot reach server. Make sure backend is running on port 5000."); }
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

const Session = {
  get: () => { try { return JSON.parse(localStorage.getItem("cc_session")); } catch { return null; } },
  save: (u) => localStorage.setItem("cc_session", JSON.stringify(u)),
  clear: () => localStorage.removeItem("cc_session"),
};

const api = {
  signupStudent: (b) => apiCall("/auth/signup/student", "POST", b),
  loginStudent:  (b) => apiCall("/auth/login/student",  "POST", b),
  signupTeacher: (b) => apiCall("/auth/signup/teacher", "POST", b),
  loginTeacher:  (b) => apiCall("/auth/login/teacher",  "POST", b),
  loginAdmin:    (b) => apiCall("/auth/login/admin",    "POST", b),
  updateProfile: (b) => apiCall("/profile/update",      "PUT",  b),

  viewAttendance:   (sid, cid) => apiCall(`/attendance/view/${sid}/${cid}`),
  updateAttendance: (b) => apiCall("/attendance/update", "POST", b),

  viewMarks:   (sid, cid) => apiCall(`/marks/view/${sid}/${cid}`),
  updateMarks: (b) => apiCall("/marks/update", "POST", b),

  getTranscript:      (sid) => apiCall(`/transcript/get/${sid}`),
  generateTranscript: (b)   => apiCall("/transcript/generate", "POST", b),

  generateFee: (b)   => apiCall("/fee/generate", "POST", b),
  payFee:      (b)   => apiCall("/fee/pay",      "POST", b),
  viewFee:     (sid) => apiCall(`/fee/view/${sid}`),

  createCourse:     (b)   => apiCall("/course/create", "POST", b),
  getAllCourses:    ()    => apiCall("/course/view"),
  registerCourse:   (b)   => apiCall("/course/register", "POST", b),
  getRegistrations: (sid) => apiCall(`/course/registrations/${sid}`),

  bookCourt:         (b)   => apiCall("/court/book", "POST", b),
  viewCourtBookings: (sid) => apiCall(`/court/view/${sid}`),
  cancelBooking:     (bid) => apiCall(`/court/cancel/${bid}`, "DELETE"),

  submitComplaint:  (b)   => apiCall("/complaint/submit", "POST", b),
  getAllComplaints: ()    => apiCall("/complaint/view"),
  getMyComplaints:  (sid) => apiCall(`/complaint/view/${sid}`),

  addAnnouncement:  (b) => apiCall("/announcement/add", "POST", b),
  getAnnouncements: ()  => apiCall("/announcement/view"),

  addAchievement:  (b)   => apiCall("/achievement/add", "POST", b),
  getAchievements: (sid) => apiCall(`/achievement/view/${sid}`),
  getAllAchievements: () => apiCall("/achievement/all"),
  getHonorList:    ()    => apiCall("/honor/view"),
};

/* ── AUTH ─────────────────────────────────────────────────────── */
function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name:"", email:"", password:"", rollno:"", empId:"" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const set = (k) => (e) => { setErr(""); setForm(f => ({ ...f, [k]: e.target.value })); };

  const buildUser = (res, r) => {
    const u = res.user || {};
    const base = { userid: u.userid, name: u.name, email: u.email, role: r };
    if (r === "student" && res.student) {
      return { ...base, studentid: res.student.studentid, rollno: res.student.rollnum, program: res.student.program, semester: res.student.semester };
    }
    if (r === "teacher" && res.teacher) {
      return { ...base, teacherid: res.teacher.teacherid, dept: res.teacher.department };
    }
    if (r === "admin" && res.admin) {
      return { ...base, adminid: res.admin.adminid };
    }
    return base;
  };

  const signup = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return setErr("All fields are required.");
    if (role === "student" && !form.rollno.trim()) return setErr("Roll number is required.");
    if (role === "teacher" && !form.empId.trim()) return setErr("Department is required.");
    if (role === "admin") return setErr("Admin accounts must be created in the database.");
    try {
      if (role === "student") {
        await api.signupStudent({ name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password, rollnum: form.rollno.trim(), program: "Not set", semester: 1 });
      } else {
        await api.signupTeacher({ name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password, department: form.empId.trim() });
      }
      setOk("Account created. Logging you in...");
      const loginRes = role === "student"
        ? await api.loginStudent({ email: form.email.trim().toLowerCase(), password: form.password })
        : await api.loginTeacher({ email: form.email.trim().toLowerCase(), password: form.password });
      const user = buildUser(loginRes, role);
      Session.save(user);
      setTimeout(() => onLogin(user), 400);
    } catch (e) { setErr(e.message); }
  };

  const login = async () => {
    if (!form.email.trim() || !form.password.trim()) return setErr("Enter email and password.");
    try {
      const payload = { email: form.email.trim().toLowerCase(), password: form.password };
      const res = role === "student" ? await api.loginStudent(payload)
                : role === "teacher" ? await api.loginTeacher(payload)
                : await api.loginAdmin(payload);
      const user = buildUser(res, role);
      Session.save(user);
      onLogin(user);
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-left">
        <img className="auth-image" src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" alt="University Campus" />
        <div className="auth-left-content">
          <h1>CampusConnect</h1>
          <p>The unified academic portal for students, faculty, and administration.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-logo">
            <Icons.AcademicCap />
            Campus<span>Connect</span>
          </div>
          <div className="auth-sub">Sign in to your academic account</div>
          
          {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
          {ok  && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
          
          <div className="auth-tabs">
            {["student","teacher","admin"].map(r => (
              <button key={r} className={`auth-tab ${role===r?"active":""}`} onClick={() => setRole(r)}>
                {r==="student" ? <Icons.AcademicCap /> : r==="teacher" ? <Icons.User /> : <Icons.Cog />}
                {r.charAt(0).toUpperCase()+r.slice(1)}
              </button>
            ))}
          </div>
          
          <div style={{ marginBottom: 24 }}>
            {mode==="signup" && (
              <div className="form-group">
                <label>Full Name</label>
                <input className="input-field" placeholder="John Doe" value={form.name} onChange={set("name")} />
              </div>
            )}
            <div className="form-group">
              <label>Institutional Email</label>
              <input className="input-field" type="email" placeholder="user@institution.edu" value={form.email} onChange={set("email")} />
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
            {mode==="login" ? "Sign In" : "Create Account"} <Icons.ArrowRight />
          </button>
          
          <div className="auth-switch">
            {mode==="login"
              ? <>Don't have an account? <button onClick={()=>{setMode("signup");setErr("");}}>Sign up</button></>
              : <>Already have an account? <button onClick={()=>{setMode("login");setErr("");}}>Sign in</button></>}
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
        <img className="banner-img" src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80" alt="Dashboard Banner" />
        <div className="header-content">
          <h1 className="page-title">Welcome back, {user.name}</h1>
          <p className="page-subtitle">
            {user.role==="student" && `${user.rollno||"Roll not set"} · Semester ${user.semester||1}`}
            {user.role==="teacher" && `${user.dept||"Department not set"} · Faculty`}
            {user.role==="admin"   && "System Administrator"}
          </p>
        </div>
      </div>
      
      <div className="card">
        <div className="card-title"><Icons.Document /> Getting Started</div>
        <p style={{color:"var(--text-muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
          {user.role==="student" && "Navigate the sidebar to view attendance, academic scores, register for upcoming courses, manage fee challans, and book campus courts."}
          {user.role==="teacher" && "Navigate the sidebar to record student attendance, upload examination marks, generate official transcripts, and publish campus announcements."}
          {user.role==="admin"   && "Navigate the sidebar to manage the course catalog, generate financial fee challans, oversee transcripts, and resolve submitted complaints."}
        </p>
        <div style={{ height: 1, background: "var(--border-light)", margin: "20px 0" }} />
        <div style={{ fontSize: 14, color: "var(--text-main)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.Mail /> {user.email}
          </div>
          {user.role==="student" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icons.AcademicCap /> {user.program||"Program not set"} · Semester {user.semester||1}
            </div>
          )}
          {user.role==="teacher" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icons.BuildingOffice /> Emp ID: {user.empId||"—"}
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
  const save = async () => {
    if (!form.name.trim()||!form.email.trim()) return setErr("Name and email are required fields.");
    try {
      await api.updateProfile({
        userid: user.userid,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.newPass.trim() || undefined,
      });
      const updated = { ...user, name: form.name.trim(), email: form.email.trim().toLowerCase() };
      Session.save(updated);
      onUpdate(updated);
      setOk("Profile updated successfully."); setErr("");
      setTimeout(()=>setOk(""),4000);
    } catch (e) { setErr(e.message); }
  };
  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your personal and academic information</p>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: 640 }}>
        {err&&<div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group"><label>Full Name</label><input className="input-field" value={form.name} onChange={s("name")} /></div>
          <div className="form-group"><label>Institutional Email</label><input className="input-field" type="email" value={form.email} onChange={s("email")} /></div>
        </div>
        
        <div className="form-grid">
          <div className="form-group"><label>Contact Number</label><input className="input-field" placeholder="03xx-xxxxxxx" value={form.phone} onChange={s("phone")} /></div>
          {user.role==="student"&&<div className="form-group"><label>Degree Program</label><input className="input-field" placeholder="e.g. BS Computer Science" value={form.program} onChange={s("program")} /></div>}
          {user.role==="teacher"&&<div className="form-group"><label>Department</label><input className="input-field" placeholder="e.g. Computer Science" value={form.dept} onChange={s("dept")} /></div>}
        </div>
        
        {user.role==="student"&&<div className="form-grid"><div className="form-group"><label>Current Semester</label><input className="input-field" type="number" min="1" max="8" value={form.semester} onChange={s("semester")} /></div></div>}
        
        <div style={{ height: 1, background: "var(--border-light)", margin: "24px 0" }} />
        
        <div className="form-group" style={{ marginBottom: 24, maxWidth: "50%" }}>
          <label>New Password <span style={{fontWeight:400, color:"var(--text-muted)"}}>(leave blank to retain)</span></label>
          <input className="input-field" type="password" placeholder="••••••••" value={form.newPass} onChange={s("newPass")} />
        </div>
        
        <button className="btn-primary" onClick={save}>Save Configuration</button>
      </div>
    </div>
  );
}

/* ── ATTENDANCE ───────────────────────────────────────────────── */
function Attendance({ user }) {
  const isTeacher = user.role==="teacher";
  const [courseId, setCourseId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(""); const [ok, setOk] = useState("");
  const [form, setForm] = useState({ studentid:"", courseid:"", date:new Date().toISOString().slice(0,10), status:"Present" });
  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const loadAttendance = async () => {
    if (!courseId) return setErr("Enter a course ID first.");
    setLoading(true); setErr("");
    try {
      const res = await api.viewAttendance(user.studentid, courseId);
      setRecords(res.data || []);
    } catch (e) { setErr(e.message); setRecords([]); }
    finally { setLoading(false); }
  };

  const markAtt = async () => {
    if (!form.studentid || !form.courseid) return setErr("Student ID and Course ID required.");
    setErr("");
    try {
      await api.updateAttendance({
        teacherid: user.teacherid,
        studentid: Number(form.studentid),
        courseid: Number(form.courseid),
        attenddate: form.date,
        attendstatus: form.status,
      });
      setOk("Attendance recorded."); setTimeout(()=>setOk(""),3000);
    } catch (e) { setErr(e.message); }
  };

  if (!isTeacher) {
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
            <h1 className="page-title">Attendance Records</h1>
            <p className="page-subtitle">Review your daily class attendance</p>
          </div>
        </div>
        <div className="card" style={{ maxWidth: 640 }}>
          {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
          <div className="form-grid">
            <div className="form-group">
              <label>Course ID</label>
              <input className="input-field" type="number" placeholder="e.g. 1" value={courseId} onChange={e=>setCourseId(e.target.value)} />
            </div>
            <div className="form-group" style={{ display:"flex", alignItems:"flex-end" }}>
              <button className="btn-primary" onClick={loadAttendance} disabled={loading}>{loading ? "Loading..." : "View Records"}</button>
            </div>
          </div>
        </div>
        {records.length===0 ? 
          <div className="card empty-state">
            <Icons.Calendar className="icon-xl" />
            <div className="empty-text">No attendance records found.</div>
          </div>
        : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Course ID</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {records.map((r,i)=>(
                    <tr key={i}>
                      <td style={{fontWeight:500}}>{r.courseid}</td>
                      <td>{r.attenddate ? new Date(r.attenddate).toLocaleDateString() : "—"}</td>
                      <td>
                        <span className={`badge ${r.attendstatus==="Present"?"badge-success":r.attendstatus==="Absent"?"badge-danger":"badge-warning"}`}>
                          {r.attendstatus}
                        </span>
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
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Record Attendance</h1>
          <p className="page-subtitle">Submit daily attendance for enrolled students</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        <div className="form-grid">
          <div className="form-group"><label>Student ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.studentid} onChange={s("studentid")} /></div>
          <div className="form-group"><label>Course ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.courseid} onChange={s("courseid")} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group"><label>Date</label><input className="input-field" type="date" value={form.date} onChange={s("date")} /></div>
          <div className="form-group">
            <label>Status</label>
            <select className="input-field" value={form.status} onChange={s("status")}>
              <option>Present</option><option>Absent</option><option>Leave</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={markAtt}>Submit Record</button>
      </div>
    </div>
  );
}

/* ── MARKS ────────────────────────────────────────────────────── */
function Marks({ user }) {
  const isTeacher = user.role==="teacher";
  const [courseId, setCourseId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(""); const [ok, setOk] = useState("");
  const [form, setForm] = useState({ studentid:"", courseid:"", assignmentmarks:"", exammarks:"", totalmarks:"" });
  const s = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const loadMarks = async () => {
    if (!courseId) return setErr("Enter a course ID first.");
    setLoading(true); setErr("");
    try {
      const res = await api.viewMarks(user.studentid, courseId);
      setRecords(res.data || []);
    } catch (e) { setErr(e.message); setRecords([]); }
    finally { setLoading(false); }
  };

  const save = async () => {
    if (!form.studentid || !form.courseid) return setErr("Student ID and Course ID required.");
    setErr("");
    try {
      await api.updateMarks({
        teacherid: user.teacherid,
        studentid: Number(form.studentid),
        courseid: Number(form.courseid),
        assignmentmarks: Number(form.assignmentmarks) || 0,
        exammarks: Number(form.exammarks) || 0,
        totalmarks: Number(form.totalmarks) || 0,
      });
      setForm({ studentid:"", courseid:"", assignmentmarks:"", exammarks:"", totalmarks:"" });
      setOk("Marks updated successfully."); setTimeout(()=>setOk(""),3000);
    } catch (e) { setErr(e.message); }
  };

  if (!isTeacher) {
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
            <h1 className="page-title">Academic Marks</h1>
            <p className="page-subtitle">Review assessment scores distributed by faculty</p>
          </div>
        </div>
        <div className="card" style={{ maxWidth: 640 }}>
          {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
          <div className="form-grid">
            <div className="form-group">
              <label>Course ID</label>
              <input className="input-field" type="number" placeholder="e.g. 1" value={courseId} onChange={e=>setCourseId(e.target.value)} />
            </div>
            <div className="form-group" style={{ display:"flex", alignItems:"flex-end" }}>
              <button className="btn-primary" onClick={loadMarks} disabled={loading}>{loading ? "Loading..." : "View Marks"}</button>
            </div>
          </div>
        </div>
        {records.length===0 ? 
          <div className="card empty-state">
            <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Chart /></div>
            <div className="empty-text">No marks data available.</div>
          </div>
        : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Course ID</th><th>Assignment</th><th>Exam</th><th>Total</th></tr></thead>
                <tbody>
                  {records.map((r,i)=>(
                    <tr key={i}>
                      <td style={{fontWeight:600, color:"var(--primary)"}}>{r.courseid}</td>
                      <td>{r.assignmentmarks ?? "—"}</td>
                      <td>{r.exammarks ?? "—"}</td>
                      <td style={{fontWeight:700}}>{r.totalmarks ?? "—"}</td>
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
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Publish Marks</h1>
          <p className="page-subtitle">Submit official assessment scores for enrolled students</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        <div className="form-grid">
          <div className="form-group"><label>Student ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.studentid} onChange={s("studentid")} /></div>
          <div className="form-group"><label>Course ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.courseid} onChange={s("courseid")} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group"><label>Assignment Marks</label><input className="input-field" type="number" value={form.assignmentmarks} onChange={s("assignmentmarks")} /></div>
          <div className="form-group"><label>Exam Marks</label><input className="input-field" type="number" value={form.exammarks} onChange={s("exammarks")} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group"><label>Total Marks</label><input className="input-field" type="number" value={form.totalmarks} onChange={s("totalmarks")} /></div>
        </div>
        <button className="btn-primary" onClick={save}>Publish Data</button>
      </div>
    </div>
  );
}
/* ── COMPLAINTS ───────────────────────────────────────────────── */
function Complaints({ user }) {
  const isAdmin = user.role==="admin";
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true); setErr("");
    try {
      const res = isAdmin ? await api.getAllComplaints() : await api.getMyComplaints(user.studentid);
      setAll(res.data || []);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const submit = async () => {
    if (!desc.trim()) return setErr("Description required.");
    setErr("");
    try {
      await api.submitComplaint({ studentid: user.studentid, description: desc.trim() });
      setDesc(""); setOk("Complaint submitted."); setTimeout(()=>setOk(""),4000);
      load();
    } catch (e) { setErr(e.message); }
  };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Complaint Resolution Center</h1>
          <p className="page-subtitle">Review and manage institutional issues reported by students</p>
        </div>
      </div>
      {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
      {loading ? <div className="card empty-state"><div className="empty-text">Loading...</div></div>
      : all.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.ClipboardList /></div>
          <div className="empty-text">No pending complaints.</div>
        </div>
      : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>ID</th><th>Student ID</th><th>Description</th><th>Date</th></tr></thead>
              <tbody>
                {all.map(c=>(
                  <tr key={c.complaintid}>
                    <td style={{fontWeight:500}}>#{c.complaintid}</td>
                    <td>{c.studentid}</td>
                    <td style={{maxWidth:400}}>{c.description1}</td>
                    <td>{c.complaintdate ? new Date(c.datesubmitted).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">File a Grievance</h1>
          <p className="page-subtitle">Submit formal concerns to university administration</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        <div className="form-group">
          <label>Description</label>
          <textarea className="input-field" rows={5} placeholder="Provide a detailed and objective account of the issue..." value={desc} onChange={e=>setDesc(e.target.value)} style={{resize: "vertical", minHeight: 120}} />
        </div>
        <button className="btn-primary" onClick={submit}>Submit Complaint</button>
      </div>
      {all.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}><Icons.Document /> My Submissions</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>ID</th><th>Description</th><th>Date</th></tr></thead>
              <tbody>
                {all.map(c=>(
                  <tr key={c.complaintid}>
                    <td style={{fontWeight:500}}>#{c.complaintid}</td>
                    <td style={{maxWidth:400}}>{c.description1}</td>
                    <td>{c.complaintdate ? new Date(c.datesubmitted).toLocaleDateString() : "—"}</td>
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
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({title:"",content:""});
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true); setErr("");
    try { const res = await api.getAnnouncements(); setAll(res.data || []); }
    catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const post = async () => {
    if (!form.title.trim() || !form.content.trim()) return setErr("Title and content required.");
    setErr("");
    try {
      await api.addAnnouncement({ postedbyid: user.userid, title: form.title.trim(), text1: form.content.trim() });
      setForm({title:"",content:""}); setOk("Announcement posted."); setTimeout(()=>setOk(""),3000);
      load();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Institutional Announcements</h1>
          <p className="page-subtitle">Official communications and notices from the university</p>
        </div>
      </div>
      
      {canPost && (
        <div className="card" style={{ maxWidth: 700 }}>
          <div className="card-title"><Icons.Speakerphone /> Broadcast Circular</div>
          {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
          {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
          <div className="form-group">
            <label>Title</label>
            <input className="input-field" placeholder="Subject line" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="input-field" rows={5} placeholder="Draft the communication..." value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} style={{resize: "vertical", minHeight: 120}} />
          </div>
          <button className="btn-primary" onClick={post}>Post Announcement</button>
        </div>
      )}
      
      {loading ? <div className="card empty-state"><div className="empty-text">Loading...</div></div>
      : all.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Speakerphone /></div>
          <div className="empty-text">No active university announcements.</div>
        </div>
      : <div style={{ display: "grid", gap: 20 }}>
          {all.map(a=>(
            <div className="card" key={a.announcementid} style={{ marginBottom: 0, paddingLeft: 30, borderLeft: "4px solid var(--primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <h3 style={{ fontSize: 20, margin: 0, color: "var(--text-main)", fontWeight: 700 }}>{a.title}</h3>
              </div>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20, whiteSpace: "pre-wrap" }}>
                {a.text1}
              </p>
              <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 16, borderTop: "1px solid var(--border-light)", paddingTop: 16 }}>
                <span style={{display: "flex", alignItems: "center", gap: 6}}><Icons.User /> Poster ID: {a.postedbyid}</span>
                <span style={{display: "flex", alignItems: "center", gap: 6}}><Icons.Calendar /> {a.posteddate ? new Date(a.posteddate).toLocaleDateString() : "—"}</span>
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
  // backend uses TIME type (HH:MM:SS) - we map slot label to start/end times
  const SLOTS = [
    { label: "09:00 - 10:00", start: "09:00:00", end: "10:00:00" },
    { label: "10:00 - 11:00", start: "10:00:00", end: "11:00:00" },
    { label: "11:00 - 12:00", start: "11:00:00", end: "12:00:00" },
    { label: "12:00 - 13:00", start: "12:00:00", end: "13:00:00" },
    { label: "14:00 - 15:00", start: "14:00:00", end: "15:00:00" },
    { label: "15:00 - 16:00", start: "15:00:00", end: "16:00:00" },
    { label: "16:00 - 17:00", start: "16:00:00", end: "17:00:00" },
    { label: "17:00 - 18:00", start: "17:00:00", end: "18:00:00" },
  ];
  const [bookings, setBookings] = useState([]);
  const [court, setCourt] = useState("Basketball");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [selected, setSelected] = useState(null);
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const loadBookings = async () => {
    try {
      const res = await api.viewCourtBookings(user.studentid);
      setBookings(res.data || []);
    } catch (e) { setErr(e.message); }
  };

  useEffect(() => { loadBookings(); /* eslint-disable-next-line */ }, []);

  // slots taken by THIS user for the selected court+date
  // (backend will reject overlaps with other users automatically via slotAvailable check)
  const takenSlots = bookings
    .filter(b => b.sport === court && (b.bookingdate || "").slice(0,10) === date)
    .map(b => (b.starttime || "").slice(0,5));

  const book = async () => {
    if (selected === null) return;
    setBusy(true); setErr("");
    try {
      await api.bookCourt({
        studentid: user.studentid,
        sport: court,
        bookingdate: date,
        starttime: `1970-01-01T${SLOTS[selected].start}Z`,
        endtime: `1970-01-01T${SLOTS[selected].end}Z`,
      });
      setOk(`${court} booked for ${SLOTS[selected].label}.`);
      setSelected(null);
      setTimeout(()=>setOk(""), 4000);
      loadBookings();
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  const cancel = async (bookingid) => {
    try {
      await api.cancelBooking(bookingid);
      setOk("Booking cancelled."); setTimeout(()=>setOk(""), 3000);
      loadBookings();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <img className="banner-img" src="https://images.unsplash.com/photo-1544015759-22cb1897c5ae?auto=format&fit=crop&w=1600&q=80" alt="Sports Facility" style={{ height: 120 }} />
        <div className="header-content">
          <h1 className="page-title">Facility Reservations</h1>
          <p className="page-subtitle">Schedule the use of university athletic resources</p>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: 700 }}>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Sport</label>
            <select className="input-field" value={court} onChange={e=>{setCourt(e.target.value);setSelected(null);}}>
              <option>Basketball</option><option>Tennis</option><option>Badminton</option><option>Athletics</option>
            </select>
          </div>
          <div className="form-group">
            <label>Reservation Date</label>
            <input className="input-field" type="date" value={date} onChange={e=>{setDate(e.target.value);setSelected(null);}} />
          </div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>Available Slots</label>
          <div className="slots-grid">
            {SLOTS.map((sl,i)=>{
              const taken = takenSlots.includes(sl.start.slice(0,5)); 
              const sel = selected===i;
              let slotClass = "slot-available";
              if (taken) slotClass = "slot-booked";
              else if (sel) slotClass = "slot-selected";
              
              return (
                <div key={i} className={`slot-item ${slotClass}`} onClick={()=>!taken&&setSelected(i)}>
                  {sl.label}<br/>
                  <span style={{ fontSize: 11, fontWeight: 400 }}>{taken?"You booked":sel?"Selected":"Open"}</span>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
            Note: If a slot is taken by another student, the server will reject the booking.
          </p>
        </div>
        
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
            {selected !== null ? <span>Selected Time: <strong>{SLOTS[selected].label}</strong></span> : "Select a slot to continue"}
          </div>
          <button className="btn-primary" disabled={selected===null || busy} onClick={book}>{busy ? "Booking..." : "Authorize Booking"}</button>
        </div>
      </div>
      
      {bookings.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}><Icons.Calendar /> My Bookings</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Sport</th><th>Date</th><th>Start</th><th>End</th><th>Action</th></tr></thead>
              <tbody>
                {bookings.map(b=>(
                  <tr key={b.bookingid}>
                    <td style={{fontWeight:600}}>{b.sport}</td>
                    <td>{b.bookingdate ? new Date(b.bookingdate).toLocaleDateString() : "—"}</td>
                    <td>{(b.starttime || "").slice(0,5)}</td>
                    <td>{(b.endtime || "").slice(0,5)}</td>
                    <td><button className="btn-secondary" style={{padding:"6px 12px",fontSize:12}} onClick={()=>cancel(b.bookingid)}>Cancel</button></td>
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
  const [courses, setCourses] = useState([]);
  const [myRegs, setMyRegs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ coursecode:"", coursename:"", credithours:"3", teacherid:"" });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true); setErr("");
    try {
      const c = await api.getAllCourses();
      setCourses(c.data || []);
      if (user.role === "student" && user.studentid) {
        const r = await api.getRegistrations(user.studentid);
        setMyRegs(r.data || []);
      }
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const addCourse = async () => {
    if (!form.coursecode.trim() || !form.coursename.trim() || !form.teacherid) return setErr("Code, name, and teacher ID required.");
    setErr("");
    try {
      await api.createCourse({
        coursecode: form.coursecode.trim(),
        coursename: form.coursename.trim(),
        credithours: Number(form.credithours),
        teacherid: Number(form.teacherid),
      });
      setForm({ coursecode:"", coursename:"", credithours:"3", teacherid:"" });
      setOk("Course added."); setTimeout(()=>setOk(""),3000);
      load();
    } catch (e) { setErr(e.message); }
  };

  const register = async (course) => {
    setErr("");
    try {
      await api.registerCourse({
        studentid: user.studentid,
        courseid: course.courseid,
        semester: String(user.semester || 1),
      });
      setOk(`Enrolled in ${course.coursecode}.`); setTimeout(()=>setOk(""), 4000);
      load();
    } catch (e) { setErr(e.message); }
  };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Curriculum Administration</h1>
          <p className="page-subtitle">Configure academic offerings for the upcoming term</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 740 }}>
        <div className="card-title"><Icons.Book /> Add a Course</div>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        <div className="form-grid">
          <div className="form-group"><label>Course Code</label><input className="input-field" placeholder="e.g. CS-401" value={form.coursecode} onChange={e=>setForm(f=>({...f,coursecode:e.target.value}))} /></div>
          <div className="form-group"><label>Course Name</label><input className="input-field" placeholder="e.g. Operating Systems" value={form.coursename} onChange={e=>setForm(f=>({...f,coursename:e.target.value}))} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group"><label>Teacher ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.teacherid} onChange={e=>setForm(f=>({...f,teacherid:e.target.value}))} /></div>
          <div className="form-group"><label>Credit Hours</label><input className="input-field" type="number" value={form.credithours} onChange={e=>setForm(f=>({...f,credithours:e.target.value}))} /></div>
        </div>
        <button className="btn-primary" onClick={addCourse}>Add Course</button>
      </div>
      {courses.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Active Courses</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>ID</th><th>Code</th><th>Name</th><th>Credits</th><th>Teacher ID</th></tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.courseid}>
                    <td>#{c.courseid}</td>
                    <td style={{fontWeight:600}}>{c.coursecode}</td>
                    <td>{c.coursename}</td>
                    <td>{c.credithours}</td>
                    <td>{c.teacherid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const regCourseIds = myRegs.map(r => r.courseid);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Course Registration Portal</h1>
          <p className="page-subtitle">Enroll in available courses for the current term</p>
        </div>
      </div>
      {ok && <div className="alert alert-success" style={{maxWidth: 1200}}><Icons.CheckCircle />{ok}</div>}
      {err && <div className="alert alert-error" style={{maxWidth: 1200}}><Icons.CheckCircle />{err}</div>}
      {loading ? <div className="card empty-state"><div className="empty-text">Loading courses...</div></div>
      : courses.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Book /></div>
          <div className="empty-text">No courses available.</div>
        </div>
      : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Available Courses</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Code</th><th>Name</th><th>Credits</th><th>Action</th></tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.courseid}>
                    <td style={{fontWeight:600}}>{c.coursecode}</td>
                    <td>{c.coursename}</td>
                    <td>{c.credithours}</td>
                    <td>
                      {regCourseIds.includes(c.courseid) ? (
                        <span className="badge badge-info" style={{padding: "6px 12px"}}><Icons.CheckCircle /> Registered</span>
                      ) : (
                        <button className="btn-primary" style={{padding: "6px 16px", fontSize: 12}} onClick={()=>register(c)}>Enroll</button>
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
            <div className="card-title" style={{ margin: 0 }}><Icons.Document /> My Registrations</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Course ID</th><th>Semester</th><th>Date</th></tr></thead>
              <tbody>
                {myRegs.map(r=>(
                  <tr key={r.registrationid}>
                    <td style={{fontWeight:500, color:"var(--primary)"}}>{r.courseid}</td>
                    <td>{r.semester}</td>
                    <td>{r.registrationdate ? new Date(r.registrationdate).toLocaleDateString() : "—"}</td>
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

/* ── FEE CHALLAN ──────────────────────────────────────────────── */
function Fee({ user }) {
  const isAdmin = user.role==="admin";
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ studentid:"", duedate:"" });
  const [adminLookupId, setAdminLookupId] = useState("");
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const loadStudentChallans = async () => {
    if (!user.studentid) return;
    setLoading(true); setErr("");
    try {
      const res = await api.viewFee(user.studentid);
      setChallans(res.data || []);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const adminLookup = async () => {
    if (!adminLookupId) return setErr("Enter a student ID.");
    setLoading(true); setErr("");
    try {
      const res = await api.viewFee(Number(adminLookupId));
      setChallans(res.data || []);
    } catch (e) { setErr(e.message); setChallans([]); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!isAdmin) loadStudentChallans();
    /* eslint-disable-next-line */
  }, []);

  const generate = async () => {
    if (!form.studentid || !form.duedate) return setErr("Student ID and due date required.");
    setErr("");
    try {
      await api.generateFee({
        adminid: user.adminid,
        studentid: Number(form.studentid),
        duedate: form.duedate,
      });
      setForm({ studentid:"", duedate:"" });
      setOk("Challan generated."); setTimeout(()=>setOk(""),4000);
    } catch (e) { setErr(e.message); }
  };

  const pay = async (challanid) => {
    setErr("");
    try {
      await api.payFee({ studentid: user.studentid, challanid });
      setOk("Payment processed."); setTimeout(()=>setOk(""),3000);
      loadStudentChallans();
    } catch (e) { setErr(e.message); }
  };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Financial Ledger</h1>
          <p className="page-subtitle">Issue and monitor structural fee assessments</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 660 }}>
        <div className="card-title"><Icons.CreditCard /> Generate Challan</div>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        <div className="form-grid">
          <div className="form-group"><label>Student ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.studentid} onChange={e=>setForm(f=>({...f,studentid:e.target.value}))} /></div>
          <div className="form-group"><label>Due Date</label><input className="input-field" type="date" value={form.duedate} onChange={e=>setForm(f=>({...f,duedate:e.target.value}))} /></div>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
          Amount is calculated automatically from registered courses.
        </p>
        <button className="btn-primary" onClick={generate}>Generate Challan</button>
      </div>
      <div className="card" style={{ maxWidth: 660 }}>
        <div className="card-title">Lookup Student Challans</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Student ID</label>
            <input className="input-field" type="number" value={adminLookupId} onChange={e=>setAdminLookupId(e.target.value)} />
          </div>
          <div className="form-group" style={{ display:"flex", alignItems:"flex-end" }}>
            <button className="btn-primary" onClick={adminLookup} disabled={loading}>{loading ? "Loading..." : "View"}</button>
          </div>
        </div>
      </div>
      {challans.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Challans</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>ID</th><th>Total</th><th>Remaining</th><th>Due Date</th><th>Status</th></tr></thead>
              <tbody>
                {challans.map(c=>(
                  <tr key={c.challanid}>
                    <td>#{c.challanid}</td>
                    <td style={{fontWeight:600, color:"var(--primary)"}}>PKR {Number(c.totalamount||0).toLocaleString()}</td>
                    <td>PKR {Number(c.remainingamount||0).toLocaleString()}</td>
                    <td>{c.duedate ? new Date(c.duedate).toLocaleDateString() : "—"}</td>
                    <td><span className={`badge ${(c.status||"").toLowerCase()==="paid"?"badge-success":"badge-warning"}`}>{c.status||"Pending"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Accounts Payable</h1>
          <p className="page-subtitle">Consult and reconcile outstanding institutional dues</p>
        </div>
      </div>
      {ok && <div className="alert alert-success" style={{maxWidth: 1200}}><Icons.CheckCircle />{ok}</div>}
      {err && <div className="alert alert-error" style={{maxWidth: 1200}}><Icons.CheckCircle />{err}</div>}
      {loading ? <div className="card empty-state"><div className="empty-text">Loading...</div></div>
      : challans.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.CreditCard /></div>
          <div className="empty-text">No financial obligations currently exist.</div>
        </div>
      : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 24 }}>
          {challans.map(c=>{
            const isPaid = (c.status||"").toLowerCase()==="paid";
            return (
              <div className="card" key={c.challanid} style={{ display: "flex", flexDirection: "column", marginBottom: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span className={`badge ${isPaid?"badge-success":"badge-warning"}`}>{c.status||"Pending"}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>Challan #{c.challanid}</span>
                </div>
                <div style={{ background: "var(--bg-app)", padding: 24, borderRadius: "var(--radius-md)", marginBottom: 24, border: "1px solid var(--border-light)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Total Liability</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>PKR {Number(c.totalamount||0).toLocaleString()}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24, flex: 1 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Due Date</div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: 15 }}>{c.duedate ? new Date(c.duedate).toLocaleDateString() : "—"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Remaining</div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: 15 }}>PKR {Number(c.remainingamount||0).toLocaleString()}</div>
                  </div>
                </div>
                {!isPaid ? (
                  <button className="btn-primary" style={{ width: "100%", padding: 14 }} onClick={()=>pay(c.challanid)}>
                    Process Payment
                  </button>
                ) : (
                  <div style={{ padding: "14px", background: "var(--bg-app)", color: "var(--success)", border: "1px solid var(--success-bg)", borderRadius: "var(--radius-sm)", textAlign: "center", fontWeight: 600, fontSize: 14, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                    <Icons.CheckCircle /> Paid
                  </div>
                )}
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

/* ── TRANSCRIPT ───────────────────────────────────────────────── */
function Transcript({ user }) {
  const isStaff = user.role==="admin" || user.role==="teacher";
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ studentid:"", semester:"", totalgpa:"" });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const loadStudent = async () => {
    if (!user.studentid) return;
    setLoading(true); setErr("");
    try {
      const res = await api.getTranscript(user.studentid);
      setTranscripts(res.data || []);
    } catch (e) { setErr(e.message); setTranscripts([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (!isStaff) loadStudent(); /* eslint-disable-next-line */ }, []);

  const generate = async () => {
    if (!form.studentid || !form.semester || !form.totalgpa) return setErr("All fields required.");
    setErr("");
    try {
      await api.generateTranscript({
        teacherid: user.teacherid || user.userid,
        adminid: user.adminid,
        studentid: Number(form.studentid),
        semester: Number(form.semester) || 1,
        totalgpa: Number(form.totalgpa),
      });
      setForm({ studentid:"", semester:"", totalgpa:"" });
      setOk("Transcript generated."); setTimeout(()=>setOk(""),4000);
    } catch (e) { setErr(e.message); }
  };

  if (isStaff) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Transcript Registry</h1>
          <p className="page-subtitle">Publish certified academic progression records</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 660 }}>
        {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
        <div className="form-grid">
          <div className="form-group"><label>Student ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.studentid} onChange={e=>setForm(f=>({...f,studentid:e.target.value}))} /></div>
          <div className="form-group"><label>Semester</label><input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
        </div>
        <div className="form-group" style={{ maxWidth: "35%", marginBottom: 24 }}>
          <label>Total GPA</label>
          <input className="input-field" type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.75" value={form.totalgpa} onChange={e=>setForm(f=>({...f,totalgpa:e.target.value}))} style={{ fontSize: 16, fontWeight: 600, color: "var(--primary)" }} />
        </div>
        <button className="btn-primary" onClick={generate}>Generate Transcript</button>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Transcript</h1>
          <p className="page-subtitle">Certified transcript of institutional progress</p>
        </div>
      </div>
      {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
      {loading ? <div className="card empty-state"><div className="empty-text">Loading...</div></div>
      : transcripts.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Document /></div>
          <div className="empty-text">No transcripts have been generated yet.</div>
        </div>
      : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 24 }}>
          {transcripts.map(t=>(
            <div className="card" key={t.transcriptid} style={{ marginBottom: 0, borderTop: "4px solid var(--text-main)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{t.semester}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>Transcript #{t.transcriptid}</div>
                </div>
                {t.totalgpa && (
                  <div style={{ textAlign: "right", background: "var(--bg-app)", padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em" }}>GPA</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-main)", lineHeight: 1, marginTop: 4 }}>{t.totalgpa}</div>
                  </div>
                )}
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
  const canManage = user.role==="admin" || user.role==="teacher";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ studentid:"", title1:"", desc1:"", semester:"", gpa:"" });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true); setErr("");
    try {
      const res = canManage ? await api.getAllAchievements() : await api.getHonorList();
      setList(res.data || []);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.studentid || !form.title1.trim()) return setErr("Student ID and title required.");
    setErr("");
    try {
      await api.addAchievement({
        studentid: Number(form.studentid),
        title1: form.title1.trim(),
        desc1: form.desc1.trim(),
        semester: Number(form.semester) || 1,
        gpa: Number(form.gpa) || 0,
      });
      setForm({ studentid:"", title1:"", desc1:"", semester:"", gpa:"" });
      setOk("Achievement recorded."); setTimeout(()=>setOk(""),4000);
      load();
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Merit & Distinction Registry</h1>
          <p className="page-subtitle">Formal recognition of institutional excellence</p>
        </div>
      </div>

      {canManage && (
        <div className="card" style={{ maxWidth: 660 }}>
          <div className="card-title"><Icons.Trophy /> Add Achievement</div>
          {ok && <div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
          {err && <div className="alert alert-error"><Icons.CheckCircle />{err}</div>}
          <div className="form-grid">
            <div className="form-group"><label>Student ID</label><input className="input-field" type="number" placeholder="e.g. 1" value={form.studentid} onChange={e=>setForm(f=>({...f,studentid:e.target.value}))} /></div>
            <div className="form-group"><label>Title</label><input className="input-field" placeholder="e.g. Dean's List" value={form.title1} onChange={e=>setForm(f=>({...f,title1:e.target.value}))} /></div>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Semester</label><input className="input-field" type="number" placeholder="e.g. 5" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
            <div className="form-group"><label>Qualifying GPA</label><input className="input-field" type="number" step="0.01" placeholder="e.g. 3.9" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
          </div>
          <div className="form-group" style={{ marginBottom: 24 }}>
            <label>Description <span style={{fontWeight:400, color:"var(--text-muted)"}}>(Optional)</span></label>
            <input className="input-field" placeholder="Brief description..." value={form.desc1} onChange={e=>setForm(f=>({...f,desc1:e.target.value}))} />
          </div>
          <button className="btn-primary" onClick={add}>Publish Distinction</button>
        </div>
      )}

      {loading ? <div className="card empty-state"><div className="empty-text">Loading...</div></div>
      : list.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Trophy /></div>
          <div className="empty-text">No distinctions have been recorded yet.</div>
        </div>
      : <div style={{ display: "grid", gap: 16 }}>
          {list.map((h,i)=> (
            <div className="card" key={h.achievementid || i} style={{ display: "flex", alignItems: "center", gap: 24, padding: "24px 32px", marginBottom: 0, borderLeft: i < 3 ? "4px solid var(--primary)" : "1px solid var(--border-light)" }}>
              <div style={{ 
                  width: 56, height: 56, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: "var(--bg-app)",
                  border: "1px solid var(--border-light)",
                  color: "var(--text-main)", fontSize: 20, fontWeight: 700
                }}>
                {i===0?"I":i===1?"II":i===2?"III":`#${i+1}`}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{h.studentname || `Student #${h.studentid}`}</span>
                  {h.rollnum && <span className="badge badge-neutral" style={{ letterSpacing: "0.1em" }}>{h.rollnum}</span>}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--primary)", marginBottom: 8 }}>{h.title1}</div>
                {h.desc1 && <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12, fontStyle: "italic" }}>"{h.desc1}"</div>}
                {h.semester && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 20, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <span>Period: {h.semester}</span>
                    {h.gpa && <span>GPA: <strong style={{color:"var(--text-main)"}}>{h.gpa}</strong></span>}
                  </div>
                )}
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
    {id:"dashboard",label:"Dashboard",icon:<Icons.Home />,sec:"Overview"},
    {id:"profile",label:"Profile Configuration",icon:<Icons.User />,sec:"Overview"},
    {id:"attendance",label:"Attendance Log",icon:<Icons.Calendar />,sec:"Academics"},
    {id:"marks",label:"Academic Marks",icon:<Icons.Chart />,sec:"Academics"},
    {id:"transcript",label:"Transcript",icon:<Icons.Document />,sec:"Academics"},
    {id:"courses",label:"Registration Portal",icon:<Icons.Book />,sec:"Academics"},
    {id:"fee",label:"Fee Structure",icon:<Icons.CreditCard />,sec:"Administration"},
    {id:"court",label:"Facilities Booking",icon:<Icons.BuildingOffice />,sec:"Campus Infrastructure"},
    {id:"complaints",label:"Complaints",icon:<Icons.ClipboardList />,sec:"Campus Infrastructure"},
    {id:"announcements",label:"Announcements",icon:<Icons.Speakerphone />,sec:"Campus Infrastructure"},
    {id:"honor",label:"Honor's List",icon:<Icons.Trophy />,sec:"Campus Infrastructure"},
  ];
  const t = [
    {id:"dashboard",label:"Dashboard",icon:<Icons.Home />,sec:"Overview"},
    {id:"profile",label:"Profile Configuration",icon:<Icons.User />,sec:"Overview"},
    {id:"attendance",label:"Submit Attendance",icon:<Icons.Calendar />,sec:"Faculty Operations"},
    {id:"marks",label:"Publish Scores",icon:<Icons.Chart />,sec:"Faculty Operations"},
    {id:"transcript",label:"Archive Dossiers",icon:<Icons.Document />,sec:"Faculty Operations"},
    {id:"honor",label:"Merit Registry",icon:<Icons.Trophy />,sec:"Faculty Operations"},
    {id:"announcements",label:"Broadcast Notices",icon:<Icons.Speakerphone />,sec:"Communications"},
  ];
  const a = [
    {id:"dashboard",label:"Dashboard",icon:<Icons.Home />,sec:"Overview"},
    {id:"profile",label:"Profile Configuration",icon:<Icons.User />,sec:"Overview"},
    {id:"courses",label:"Curriculum Catalog",icon:<Icons.Book />,sec:"System Administration"},
    {id:"fee",label:"Invoice Generation",icon:<Icons.CreditCard />,sec:"System Administration"},
    {id:"transcript",label:"Dossier Verification",icon:<Icons.Document />,sec:"System Administration"},
    {id:"honor",label:"Merit Review",icon:<Icons.Trophy />,sec:"System Administration"},
    {id:"complaints",label:"Resolution Center",icon:<Icons.ClipboardList />,sec:"System Administration"},
    {id:"announcements",label:"Broadcast Comm.",icon:<Icons.Speakerphone />,sec:"Communications"},
  ];
  return {student:s,teacher:t,admin:a}[role]||s;
}

/* ── ROOT ─────────────────────────────────────────────────────── */
export default function CampusConnect() {
  const [user, setUser] = useState(() => Session.get());
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    console.log("System Initialized. Active Session:", user);
  }, []);

  const logout = () => { Session.clear(); setUser(null); setPage("dashboard"); };
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
          <div className="sidebar-logo">
            <Icons.AcademicCap />
            Campus<span>Connect</span>
          </div>
        </div>
        
        <div style={{ flex: 1, padding: "16px 0" }}>
          {sections.map(sec=>(
            <div key={sec} className="nav-section">
              <div className="nav-label">{sec}</div>
              {nav.filter(n=>n.sec===sec).map(n=>(
                <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
                  {n.icon}
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
            <Icons.Logout /> log out
          </button>
        </div>
      </aside>
      
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}
