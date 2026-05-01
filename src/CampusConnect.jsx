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
    setOk("Account created successfully.");
    setTimeout(() => onLogin(user), 500);
  };

  const login = () => {
    if (!form.email.trim() || !form.password.trim()) return setErr("Enter email and password.");
    const users = DB.getUsers();
    const user = users.find(u => u.email === form.email.trim().toLowerCase() && u.password === form.password);
    if (!user) return setErr("Invalid credentials.");
    DB.saveSession(user);
    onLogin(user);
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
  const save = () => {
    if (!form.name.trim()||!form.email.trim()) return setErr("Name and email are required fields.");
    const users = DB.getUsers();
    const idx = users.findIndex(u=>u.id===user.id);
    if (idx===-1) return setErr("User account not found.");
    const updated = {...users[idx], name:form.name.trim(), email:form.email.trim().toLowerCase(), phone:form.phone.trim(), program:form.program.trim(), dept:form.dept.trim(), semester:Number(form.semester)};
    if (form.newPass.trim()) updated.password = form.newPass.trim();
    users[idx] = updated;
    DB.saveUsers(users); DB.saveSession(updated);
    setOk("Profile settings updated successfully."); setErr(""); onUpdate(updated);
    setTimeout(()=>setOk(""),4000);
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
    setOk("Attendance record established."); setTimeout(()=>setOk(""),3000);
  };

  if (!isTeacher) {
    const mine = records.filter(r=>r.studentId===user.id);
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
            <h1 className="page-title">Attendance Records</h1>
            <p className="page-subtitle">Review your daily class attendance</p>
          </div>
        </div>
        {mine.length===0 ? 
          <div className="card empty-state">
            <Icons.Calendar className="icon-xl" />
            <div className="empty-text">No attendance records have been registered.</div>
          </div>
        : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Course</th><th>Date</th><th>Status</th><th>Instructor</th></tr></thead>
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
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Record Attendance</h1>
          <p className="page-subtitle">Submit daily attendance for enrolled students</p>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: 640 }}>
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group"><label>Course Title</label><input className="input-field" placeholder="e.g. Object Oriented Programming" value={course} onChange={e=>setCourse(e.target.value)} /></div>
          <div className="form-group"><label>Date of Lecture</label><input className="input-field" type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Select Student</label>
            <select className="input-field" value={selStudent} onChange={e=>setSelStudent(e.target.value)}>
              <option value="">Choose...</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Attendance Status</label>
            <select className="input-field" value={status} onChange={e=>setStatus(e.target.value)}>
              <option>Present</option><option>Absent</option><option>Leave</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={markAtt}>Submit Record</button>
      </div>
      
      {myMarked.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}><Icons.ClipboardList /> Recent Submissions</div>
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
    setOk("Academic scores published successfully."); setTimeout(()=>setOk(""),3000);
  };

  if (!isTeacher) {
    const mine = allMarks.filter(r=>r.studentId===user.id);
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
            <h1 className="page-title">Academic Marks</h1>
            <p className="page-subtitle">Review assessment scores distributed by faculty</p>
          </div>
        </div>
        {mine.length===0 ? 
          <div className="card empty-state">
            <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Chart /></div>
            <div className="empty-text">No assessment data available.</div>
          </div>
        : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Course</th><th>Quiz</th><th>Assignment</th><th>Midterm</th><th>Final</th><th>Instructor</th></tr></thead>
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
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Publish Marks</h1>
          <p className="page-subtitle">Submit official assessment scores for enrolled students</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Student Registration</label>
            <select className="input-field" value={form.studentId} onChange={s("studentId")}>
              <option value="">Select an individual...</option>
              {students.map(st=><option key={st.id} value={st.id}>{st.name} ({st.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="form-group"><label>Course Title</label><input className="input-field" placeholder="e.g. Data Structures" value={form.course} onChange={s("course")} /></div>
        </div>
        
        <div className="form-grid">
          <div className="form-group"><label>Quiz Total</label><input className="input-field" type="number" placeholder="Out of 10/20" value={form.quiz} onChange={s("quiz")} /></div>
          <div className="form-group"><label>Assignment Total</label><input className="input-field" type="number" placeholder="Out of 10/20" value={form.assignment} onChange={s("assignment")} /></div>
        </div>
        <div className="form-grid">
          <div className="form-group"><label>Midterm Examination</label><input className="input-field" type="number" placeholder="Out of 30/40" value={form.mid} onChange={s("mid")} /></div>
          <div className="form-group"><label>Final Examination</label><input className="input-field" type="number" placeholder="Out of 40/50" value={form.final} onChange={s("final")} /></div>
        </div>
        <button className="btn-primary" onClick={save}>Publish Data</button>
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
    setForm({category:"Academic",desc:""}); setOk("Formal complaint submitted to the administration."); setTimeout(()=>setOk(""),4000);
  };

  const resolve = id => { const u=all.map(c=>c.id===id?{...c,status:"Resolved"}:c); DB.setData("complaints",u); setAll(u); };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Complaint Resolution Center</h1>
          <p className="page-subtitle">Review and manage institutional issues reported by students</p>
        </div>
      </div>
      {all.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.ClipboardList /></div>
          <div className="empty-text">No pending complaints. The institution is operating smoothly.</div>
        </div>
      : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Complainant</th><th>Classification</th><th>Details</th><th>Filing Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {all.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:500}}>{c.studentName}</td>
                    <td>{c.category}</td>
                    <td style={{maxWidth:300, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}} title={c.desc}>{c.desc}</td>
                    <td>{c.date}</td>
                    <td><span className={`badge ${c.status==="Resolved"?"badge-success":"badge-warning"}`}>{c.status}</span></td>
                    <td>
                      {c.status!=="Resolved" ? (
                        <button className="btn-primary" style={{padding: "6px 12px", fontSize: 12}} onClick={()=>resolve(c.id)}>Mark Resolved</button>
                      ) : (
                        <span style={{color: "var(--success)", display: "flex"}}><Icons.CheckCircle /></span>
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
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">File a Grievance</h1>
          <p className="page-subtitle">Submit formal concerns to university administration</p>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: 640 }}>
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        <div className="form-group">
          <label>Classification</label>
          <select className="input-field" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
            <option>Academic</option><option>Facility</option><option>Financial</option><option>Administrative</option><option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Formal Description</label>
          <textarea className="input-field" rows={5} placeholder="Provide a detailed and objective account of the issue..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} style={{resize: "vertical", minHeight: 120}} />
        </div>
        <button className="btn-primary" onClick={submit}>Submit Document</button>
      </div>
      
      {mine.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}><Icons.Document /> Historical Submissions</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Classification</th><th>Excerpt</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {mine.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:500}}>{c.category}</td>
                    <td style={{maxWidth:300, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{c.desc}</td>
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
    setForm({title:"",content:"",audience:"All"}); setOk("Official announcement broadcasted."); setTimeout(()=>setOk(""),3000);
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
          {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
          <div className="form-group">
            <label>Header / Subject</label>
            <input className="input-field" placeholder="Directive subject line" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className="form-group">
            <label>Memorandum Body</label>
            <textarea className="input-field" rows={5} placeholder="Draft the communication..." value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} style={{resize: "vertical", minHeight: 120}} />
          </div>
          <div className="form-group">
            <label>Designated Recipients</label>
            <select className="input-field" value={form.audience} onChange={e=>setForm(f=>({...f,audience:e.target.value}))} style={{maxWidth: 240}}>
              <option>All</option><option>Students</option><option>Teachers</option>
            </select>
          </div>
          <button className="btn-primary" onClick={post}>Authorize Broadcast</button>
        </div>
      )}
      
      {all.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Speakerphone /></div>
          <div className="empty-text">No active university announcements.</div>
        </div>
      : <div style={{ display: "grid", gap: 20 }}>
          {all.map(a=>(
            <div className="card" key={a.id} style={{ marginBottom: 0, paddingLeft: 30, borderLeft: "4px solid var(--primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <h3 style={{ fontSize: 20, margin: 0, color: "var(--text-main)", fontWeight: 700 }}>{a.title}</h3>
                <span className="badge badge-neutral"><Icons.User /> {a.audience}</span>
              </div>
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20, whiteSpace: "pre-wrap" }}>
                {a.content}
              </p>
              <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 16, borderTop: "1px solid var(--border-light)", paddingTop: 16 }}>
                <span style={{display: "flex", alignItems: "center", gap: 6}}><Icons.User /> {a.author}</span>
                <span style={{display: "flex", alignItems: "center", gap: 6}}><Icons.Calendar /> {a.date}</span>
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
  const SLOTS = ["09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00"];
  const [bookings, setBookings] = useState(()=>DB.getData("court_bookings"));
  const [court, setCourt] = useState("Basketball");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [selected, setSelected] = useState(null); const [ok, setOk] = useState("");

  const takenSlots = bookings.filter(b=>b.court===court&&b.date===date).map(b=>b.slot);

  const book = () => {
    if (selected===null) return;
    const b = { id:Date.now().toString(), userId:user.id, userName:user.name, court, date, slot:SLOTS[selected] };
    const updated = [...bookings, b]; DB.setData("court_bookings",updated); setBookings(updated);
    setOk(`${court} reservation confirmed for ${SLOTS[selected]}.`); setSelected(null); setTimeout(()=>setOk(""),4000);
  };

  const mine = bookings.filter(b=>b.userId===user.id);
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
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Infrastructure</label>
            <select className="input-field" value={court} onChange={e=>{setCourt(e.target.value);setSelected(null);}}>
              <option>Basketball Court</option><option>Tennis Court</option><option>Badminton Facility</option><option>Athletics Track</option>
            </select>
          </div>
          <div className="form-group">
            <label>Reservation Date</label>
            <input className="input-field" type="date" value={date} onChange={e=>{setDate(e.target.value);setSelected(null);}} />
          </div>
        </div>
        
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>Available Allocations</label>
          <div className="slots-grid">
            {SLOTS.map((sl,i)=>{
              const taken = takenSlots.includes(sl); 
              const sel = selected===i;
              let slotClass = "slot-available";
              if (taken) slotClass = "slot-booked";
              else if (sel) slotClass = "slot-selected";
              
              return (
                <div key={i} className={`slot-item ${slotClass}`} onClick={()=>!taken&&setSelected(i)}>
                  {sl}<br/>
                  <span style={{ fontSize: 11, fontWeight: 400 }}>{taken?"Unavailable":sel?"Staged":"Open"}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
            {selected !== null ? <span>Selected Time: <strong>{SLOTS[selected]}</strong></span> : "Await allocation selection"}
          </div>
          <button className="btn-primary" disabled={selected===null} onClick={book}>Authorize Booking</button>
        </div>
      </div>
      
      {mine.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}><Icons.Calendar /> Schedule Ledger</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Infrastructure</th><th>Date</th><th>Allocation</th><th>Verification</th></tr></thead>
              <tbody>
                {mine.map(b=>(
                  <tr key={b.id}>
                    <td style={{fontWeight:600}}>{b.court}</td>
                    <td>{b.date}</td>
                    <td>{b.slot}</td>
                    <td><span className="badge badge-success">Approved</span></td>
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
    setForm({name:"",code:"",credits:"3",teacher:"",seats:"30"}); setOk("Curriculum addition processed."); setTimeout(()=>setOk(""),3000);
  };

  const register = course => {
    if (course.seats<=0) return;
    const reg = { id:Date.now().toString(), studentId:user.id, courseId:course.id, date:new Date().toISOString().slice(0,10) };
    const updatedRegs = [...regs, reg];
    const updatedCourses = courses.map(c=>c.id===course.id?{...c,seats:c.seats-1}:c);
    DB.setData("registrations",updatedRegs); DB.setData("courses",updatedCourses);
    setRegs(updatedRegs); setCourses(updatedCourses);
    setOk(`Enrollment protocol completed for ${course.code}.`); setTimeout(()=>setOk(""),4000);
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
        <div className="card-title"><Icons.Book /> Append Curriculum Database</div>
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group"><label>Nomenclature</label><input className="input-field" placeholder="e.g. Advanced Operating Systems" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div className="form-group"><label>Reference Code</label><input className="input-field" placeholder="e.g. CS-401" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} /></div>
        </div>
        <div className="form-grid" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
          <div className="form-group"><label>Faculty Assignment</label><input className="input-field" placeholder="e.g. Dr. Faculty Name" value={form.teacher} onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} /></div>
          <div className="form-group"><label>Credit Allocation</label><input className="input-field" type="number" value={form.credits} onChange={e=>setForm(f=>({...f,credits:e.target.value}))} /></div>
          <div className="form-group"><label>Capacity Limitation</label><input className="input-field" type="number" value={form.seats} onChange={e=>setForm(f=>({...f,seats:e.target.value}))} /></div>
        </div>
        <button className="btn-primary" onClick={addCourse}>Commit to Registry</button>
      </div>
      
      {courses.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Active Offerings</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Code</th><th>Nomenclature</th><th>Assigned Faculty</th><th>Credits</th><th>Remaining Quota</th></tr></thead>
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
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Course Registration Portal</h1>
          <p className="page-subtitle">Formally enroll in authorized academic electives and cores</p>
        </div>
      </div>
      
      {ok&&<div className="alert alert-success" style={{maxWidth: 1200}}><Icons.CheckCircle />{ok}</div>}
      
      {courses.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Book /></div>
          <div className="empty-text">The registration window is currently suspended.</div>
        </div>
      : <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Term Schedule</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Reference</th><th>Title</th><th>Faculty</th><th>Cr.</th><th>Quota</th><th>Action</th></tr></thead>
              <tbody>
                {courses.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:600}}>{c.code}</td>
                    <td>{c.name}</td>
                    <td>{c.teacher||"—"}</td>
                    <td>{c.credits}</td>
                    <td>
                      <span className={`badge ${c.seats>0?"badge-success":"badge-danger"}`}>
                        {c.seats>0?c.seats+" Available":"Capacity Reached"}
                      </span>
                    </td>
                    <td>
                      {regIds.includes(c.id) ? (
                        <span className="badge badge-info" style={{padding: "6px 12px"}}><Icons.CheckCircle /> Processed</span>
                      ) : (
                        <button className="btn-primary" style={{padding: "6px 16px", fontSize: 12}} disabled={c.seats<=0} onClick={()=>register(c)}>Enroll</button>
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
            <div className="card-title" style={{ margin: 0 }}><Icons.Document /> Registration Dossier</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Course Nomenclature</th><th>Reference</th><th>Timestamp</th></tr></thead>
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
    setForm({studentId:"",amount:"",dueDate:"",semester:""}); setOk("Financial document formally generated."); setTimeout(()=>setOk(""),4000);
  };

  const pay = id => { const u=challans.map(c=>c.id===id?{...c,status:"Paid",paidDate:new Date().toISOString().slice(0,10)}:c); DB.setData("challans",u); setChallans(u); };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Financial Ledger</h1>
          <p className="page-subtitle">Issue and monitor structural fee assessments</p>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: 660 }}>
        <div className="card-title"><Icons.CreditCard /> Execute Invoice</div>
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-group">
          <label>Target Account</label>
          <select className="input-field" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
            <option value="">Select registry entry...</option>
            {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
          </select>
        </div>
        
        <div className="form-grid">
          <div className="form-group"><label>Principal (PKR)</label><input className="input-field" type="number" placeholder="e.g. 150000" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></div>
          <div className="form-group"><label>Maturity Date</label><input className="input-field" type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))} /></div>
        </div>
        
        <div className="form-group" style={{ maxWidth: "50%" }}>
          <label>Academic Period</label>
          <input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} />
        </div>
        
        <button className="btn-primary" onClick={generate} style={{ marginTop: 8 }}>Process Invoice</button>
      </div>
      
      {challans.length>0 && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="card-title" style={{ margin: 0 }}>Issued Document Registry</div>
          </div>
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead><tr><th>Entity</th><th>Liability</th><th>Deadline</th><th>Period</th><th>Clearance</th></tr></thead>
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
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Accounts Payable</h1>
          <p className="page-subtitle">Consult and reconcile outstanding institutional dues</p>
        </div>
      </div>
      
      {mine.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.CreditCard /></div>
          <div className="empty-text">No financial obligations currently exist.</div>
        </div>
      : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 24 }}>
          {mine.map(c=>(
            <div className="card" key={c.id} style={{ display: "flex", flexDirection: "column", marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span className={`badge ${c.status==="Paid"?"badge-success":"badge-warning"}`}>{c.status}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>Generated: {c.generatedDate}</span>
              </div>
              
              <div style={{ background: "var(--bg-app)", padding: 24, borderRadius: "var(--radius-md)", marginBottom: 24, border: "1px solid var(--border-light)" }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Total Liability</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>PKR {Number(c.amount).toLocaleString()}</div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24, flex: 1 }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Maturity Date</div>
                  <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: 15 }}>{c.dueDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Academic Period</div>
                  <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: 15 }}>{c.semester||"—"}</div>
                </div>
              </div>
              
              {c.status==="Pending" ? (
                <button className="btn-primary" style={{ width: "100%", padding: 14 }} onClick={()=>pay(c.id)}>
                  Process Remittance
                </button>
              ) : (
                <div style={{ padding: "14px", background: "var(--bg-app)", color: "var(--success)", border: "1px solid var(--success-bg)", borderRadius: "var(--radius-sm)", textAlign: "center", fontWeight: 600, fontSize: 14, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                  <Icons.CheckCircle /> Transaction Verified: {c.paidDate}
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
    setForm({studentId:"",semester:"",courses:"",gpa:""}); setOk("Official Transcript generated."); setTimeout(()=>setOk(""),4000);
  };

  if (isAdmin) return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Transcript Registry</h1>
          <p className="page-subtitle">Publish certified academic progression records</p>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: 660 }}>
        {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
        
        <div className="form-grid">
          <div className="form-group">
            <label>Subject Entry</label>
            <select className="input-field" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
              <option value="">Select an individual...</option>
              {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
            </select>
          </div>
          <div className="form-group"><label>Academic Cohort</label><input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
        </div>
        
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label>Validated Credits (Delimited)</label>
          <input className="input-field" placeholder="e.g. Object Oriented Programming, Data Structures, Calculus" value={form.courses} onChange={e=>setForm(f=>({...f,courses:e.target.value}))} />
        </div>
        
        <div className="form-group" style={{ maxWidth: "35%", marginBottom: 24 }}>
          <label>Cumulative Metric (GPA)</label>
          <input className="input-field" type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.75" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} style={{ fontSize: 16, fontWeight: 600, color: "var(--primary)" }} />
        </div>
        
        <button className="btn-primary" onClick={generate}>Authorize Certification</button>
      </div>
    </div>
  );

  const mine = transcripts.filter(t=>t.studentId===user.id);
  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="header-content" style={{ borderRadius: "var(--radius-lg)" }}>
          <h1 className="page-title">Transcript</h1>
          <p className="page-subtitle">Certified transcript of institutional progress</p>
        </div>
      </div>
      
      {mine.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Document /></div>
          <div className="empty-text">No formal records have been archived.</div>
        </div>
      : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 24 }}>
          {mine.map(t=>(
            <div className="card" key={t.id} style={{ marginBottom: 0, borderTop: "4px solid var(--text-main)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{t.semester}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>Archived: {t.generatedDate}</div>
                </div>
                {t.gpa && (
                  <div style={{ textAlign: "right", background: "var(--bg-app)", padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em" }}>Metric</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-main)", lineHeight: 1, marginTop: 4 }}>{t.gpa}</div>
                  </div>
                )}
              </div>
              
              <div style={{ border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ background: "var(--bg-app)", padding: "10px 16px", borderBottom: "1px solid var(--border-light)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Modules Validated</div>
                <div style={{ padding: "16px", fontSize: 14, color: "var(--text-main)", lineHeight: 1.8 }}>
                  {t.courses ? t.courses.split(",").map((course, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 4, height: 4, background: "var(--primary)", borderRadius: "50%" }} /> 
                      {course.trim()}
                    </div>
                  )) : "None stipulated."}
                </div>
              </div>
              
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 20, textAlign: "right", borderTop: "1px dashed var(--border-light)", paddingTop: 16 }}>
                Certified authority: <strong style={{color:"var(--text-main)"}}>{t.generatedBy}</strong>
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
    setForm({studentId:"",title:"",semester:"",gpa:"",description:""}); setOk("Distinction officially recorded."); setTimeout(()=>setOk(""),4000);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <img className="banner-img" src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80" alt="Graduation" style={{ height: 160 }} />
        <div className="header-content">
          <h1 className="page-title">Merit & Distinction Registry</h1>
          <p className="page-subtitle">Formal recognition of institutional excellence</p>
        </div>
      </div>
      
      {canManage && (
        <div className="card" style={{ maxWidth: 660 }}>
          <div className="card-title"><Icons.Trophy /> Consecrate Merit</div>
          {ok&&<div className="alert alert-success"><Icons.CheckCircle />{ok}</div>}
          
          <div className="form-grid">
            <div className="form-group">
              <label>Nominee</label>
              <select className="input-field" value={form.studentId} onChange={e=>setForm(f=>({...f,studentId:e.target.value}))}>
                <option value="">Select registry profile...</option>
                {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollno||"—"})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Distinction Title</label><input className="input-field" placeholder="e.g. Dean's Commendation" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} /></div>
          </div>
          
          <div className="form-grid">
            <div className="form-group"><label>Cohort / Period</label><input className="input-field" placeholder="e.g. Spring 2025" value={form.semester} onChange={e=>setForm(f=>({...f,semester:e.target.value}))} /></div>
            <div className="form-group"><label>Qualifying GPA</label><input className="input-field" type="number" step="0.01" placeholder="e.g. 3.9" value={form.gpa} onChange={e=>setForm(f=>({...f,gpa:e.target.value}))} /></div>
          </div>
          
          <div className="form-group" style={{ marginBottom: 24 }}>
            <label>Citation Abstract <span style={{fontWeight:400, color:"var(--text-muted)"}}>(Optional)</span></label>
            <input className="input-field" placeholder="Formal justification for the award..." value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </div>
          
          <button className="btn-primary" onClick={add}>Publish Distinction</button>
        </div>
      )}
      
      {list.length===0 ? 
        <div className="card empty-state">
          <div style={{fontSize: 48, opacity: 0.2, marginBottom: 16}}><Icons.Trophy /></div>
          <div className="empty-text">No distinctions have been archived for the current period.</div>
        </div>
      : <div style={{ display: "grid", gap: 16 }}>
          {list.map((h,i)=> (
            <div className="card" key={h.id} style={{ display: "flex", alignItems: "center", gap: 24, padding: "24px 32px", marginBottom: 0, borderLeft: i < 3 ? "4px solid var(--primary)" : "1px solid var(--border-light)" }}>
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
                  <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{h.studentName}</span>
                  <span className="badge badge-neutral" style={{ letterSpacing: "0.1em" }}>{h.rollno}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--primary)", marginBottom: 8 }}>{h.title}</div>
                {h.description && <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12, fontStyle: "italic" }}>"{h.description}"</div>}
                
                {h.semester && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 20, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <span>Period: {h.semester}</span>
                    {h.gpa && <span>Metric: <strong style={{color:"var(--text-main)"}}>{h.gpa}</strong></span>}
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
  const [user, setUser] = useState(() => DB.getSession());
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    console.log("System Initialized. Active Session:", user);
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
