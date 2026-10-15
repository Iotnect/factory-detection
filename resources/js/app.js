const people = [
  { id:"EMP-1042", name:"Aiman Hakim", dept:"Assembly", location:"Assembly Line A", camera:"CAM-04", time:"10:42:18", date:"05 Oct 2026", confidence:96, type:"Phone usage" },
  { id:"EMP-2087", name:"Nur Izzati", dept:"Packaging", location:"Packing Zone 2", camera:"CAM-11", time:"10:31:04", date:"05 Oct 2026", confidence:91, type:"Phone usage" },
  { id:"EMP-3184", name:"Daniel Wong", dept:"Machining", location:"CNC Bay 4", camera:"CAM-07", time:"09:58:46", date:"05 Oct 2026", confidence:98, type:"Phone usage" },
  { id:"EMP-4019", name:"Siti Aminah", dept:"Quality", location:"QA Station 1", camera:"CAM-15", time:"09:17:32", date:"05 Oct 2026", confidence:88, type:"Phone usage" },
  { id:"EMP-5331", name:"Raj Kumar", dept:"Warehouse", location:"Loading Bay", camera:"CAM-18", time:"08:49:15", date:"05 Oct 2026", confidence:93, type:"Phone usage" }
];

const absence = [
  { ...people[1], id:"EMP-2208", name:"Farah Nadia", dept:"Packaging", location:"Post PK-07", camera:"CAM-12", time:"10:36:20", confidence:97, type:"Post left for 18 min", duration:"18m 42s" },
  { ...people[2], id:"EMP-3390", name:"Harith Iskandar", dept:"Machining", location:"Post MC-04", time:"10:11:06", confidence:92, type:"Late return", duration:"11m 08s" },
  { ...people[3], id:"EMP-4416", name:"Mei Ling", dept:"Quality", location:"Post QA-02", time:"09:42:51", confidence:89, type:"Post left for 7 min", duration:"07m 16s" },
  { ...people[4], id:"EMP-5277", name:"Kavitha Rao", dept:"Warehouse", location:"Post WH-11", time:"08:55:40", confidence:95, type:"Absent at shift start", duration:"24m 03s" }
];

const movementRecords = [
  { id:"MOV-1042-01", date:"05 Oct 2026", time:"10:42:18", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"East Corridor", to:"Assembly Line A", camera:"CAM-04", duration:"00:46", confidence:96, event:"Zone transition", status:"Normal" },
  { id:"MOV-1042-02", date:"05 Oct 2026", time:"10:17:03", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"Packaging", to:"Restricted Storage", camera:"CAM-19", duration:"02:14", confidence:94, event:"Restricted entry", status:"Alert" },
  { id:"MOV-1042-03", date:"05 Oct 2026", time:"09:36:41", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"Quality Assurance", to:"East Corridor", camera:"CAM-08", duration:"06:12", confidence:93, event:"Extended stop", status:"Review" },
  { id:"MOV-1042-04", date:"05 Oct 2026", time:"08:14:22", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"Main Gate", to:"Quality Assurance", camera:"CAM-02", duration:"01:08", confidence:98, event:"Zone transition", status:"Normal" }
];

const employeeDirectory = [
  { id:"EMP-1042", name:"Aiman Hakim", department:"Assembly", role:"Line Operator", shift:"Morning", status:"Active", reference:"Enrolled", joined:"12 Jan 2023", lastSeen:"Assembly Line A", movements:18 },
  { id:"EMP-2087", name:"Nur Izzati", department:"Packaging", role:"Packing Operator", shift:"Morning", status:"Active", reference:"Enrolled", joined:"03 Apr 2024", lastSeen:"Packing Zone 2", movements:12 },
  { id:"EMP-3184", name:"Daniel Wong", department:"Machining", role:"CNC Technician", shift:"Morning", status:"Active", reference:"Enrolled", joined:"18 Aug 2022", lastSeen:"CNC Bay 4", movements:9 },
  { id:"EMP-4019", name:"Siti Aminah", department:"Quality", role:"QA Inspector", shift:"Morning", status:"Active", reference:"Enrolled", joined:"22 Feb 2021", lastSeen:"QA Station 1", movements:14 },
  { id:"EMP-5331", name:"Raj Kumar", department:"Warehouse", role:"Storekeeper", shift:"Morning", status:"Active", reference:"Enrolled", joined:"09 Nov 2023", lastSeen:"Loading Bay", movements:7 },
  { id:"EMP-2208", name:"Farah Nadia", department:"Packaging", role:"Packing Operator", shift:"Morning", status:"On leave", reference:"Enrolled", joined:"15 Jun 2024", lastSeen:"Post PK-07", movements:5 },
  { id:"EMP-3390", name:"Harith Iskandar", department:"Machining", role:"Maintenance Technician", shift:"Evening", status:"Active", reference:"Enrolled", joined:"28 Mar 2022", lastSeen:"Post MC-04", movements:11 },
  { id:"EMP-4416", name:"Mei Ling", department:"Quality", role:"Quality Engineer", shift:"Evening", status:"Active", reference:"Missing", joined:"01 Sep 2025", lastSeen:"Post QA-02", movements:6 }
];

const pageMeta = {
  overview:"Command overview", phone:"Phone usage detection", absence:"Post & absence detection",
  camera:"Camera tracking", route:"Floorplan route tracking", employees:"Employee management", reports:"Reports", settings:"Settings"
};

const demoCameras = [
  { id:"camera-01", location:"Machining Floor", status:"Online" },
  { id:"camera-02", location:"Production Floor", status:"Online" },
  { id:"camera-03", location:"Packaging Floor", status:"Online" },
  { id:"camera-04", location:"Assembly Floor", status:"Online" },
  { id:"camera-05", location:"Warehouse", status:"Offline" }
];
const demoTrackedPeople = [
  ...people.map(({ id, name, dept }) => ({ id, name, dept })),
  { id:"EMP-2208", name:"Farah Nadia", dept:"Packaging" },
  { id:"EMP-3390", name:"Harith Iskandar", dept:"Machining" },
  { id:"EMP-4416", name:"Mei Ling", dept:"Quality" },
  { id:"EMP-5277", name:"Kavitha Rao", dept:"Warehouse" },
  { id:"EMP-1063", name:"Amirul Azman", dept:"Assembly" },
  { id:"EMP-2094", name:"Nadia Zulkifli", dept:"Packaging" },
  { id:"EMP-3205", name:"Jason Tan", dept:"Machining" },
  { id:"EMP-4031", name:"Aisyah Rahman", dept:"Quality" },
  { id:"EMP-5350", name:"Suresh Nair", dept:"Warehouse" },
  { id:"EMP-1088", name:"Syafiq Roslan", dept:"Assembly" },
  { id:"EMP-2116", name:"Emily Lim", dept:"Packaging" },
  { id:"EMP-3220", name:"Hafiz Abdullah", dept:"Machining" },
  { id:"EMP-4057", name:"Priya Devi", dept:"Quality" }
].map((person, index) => ({ ...person, camera:`camera-${String(index % 4 + 1).padStart(2, "0")}` }));

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const app = $("#app");
const currentUsername = document.body.dataset.username || "User";
const employeeAvatarUrl = document.body.dataset.employeeAvatarUrl || "/images/employee-avatar.png";
let currentPage = "overview";
let toastTimer;
let cameraLoadController;
const themeStorageKey = "neovision-theme";

function icon(name) { return `<span class="material-symbols-rounded">${name}</span>`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" })[character]); }
function employeeAvatar(name, large=false) { return `<img class="${large ? "employee-profile-avatar" : "avatar"}" src="${employeeAvatarUrl}" alt="${escapeHtml(name)} profile">`; }
function noFootage() { return `<div class="footage-empty">${icon("videocam_off")}<p>No footage available at the moment</p></div>`; }
function noEvidence() { return `<div class="footage-empty">${icon("image_not_supported")}<p>No evidence shown</p></div>`; }
function badge(value) {
  const cls = /critical|unresolved|confirmed|alert|inactive|offline/i.test(value) ? "red" : /warning|review|leave/i.test(value) ? "amber" : /resolved|online|normal|active/i.test(value) ? "green" : "";
  return `<span class="badge ${cls}">${value}</span>`;
}
function showToast(message) {
  $("#toastText").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2600);
}
function metric(label, value, iconName, tone="", trend="Live telemetry", cameraSummary="") {
  const tag = cameraSummary ? "button" : "article";
  const attributes = cameraSummary ? ` type="button" data-camera-summary="${cameraSummary}" aria-haspopup="dialog" aria-label="${label}: ${value}. View list"` : "";
  return `<${tag} class="metric-card ${tone}${cameraSummary ? " metric-card-clickable" : ""}"${attributes}><div><small>${label}</small><strong>${value}</strong><span class="trend ${tone === "alert" ? "down" : ""}">${trend}</span></div><span class="metric-icon">${icon(iconName)}</span></${tag}>`;
}

function pageHead(kicker, title, copy, action="") {
  return `<div class="page-head"><div><span class="status-label">${kicker}</span><h1>${title}</h1><p>${copy}</p></div>${action}</div>`;
}

function renderOverview() {
  app.innerHTML = `<section class="page">
    ${pageHead("Live operations", `Hello, ${currentUsername}.`, "Here's what is happening across Plant 01 right now.", `<button class="button" data-action="export">${icon("download")} Export report</button>`)}
    <div class="metric-grid">
      ${metric("Employees on site", "248", "groups", "good", "+12 since 07:00")}
      ${metric("Active cameras", "24/25", "videocam", "", "96% coverage")}
      ${metric("Open incidents", "20", "warning", "alert", "+5 in the last hour")}
      ${metric("Compliance score", "94.2%", "verified", "good", "+1.8% this week")}
    </div>
    <div class="monitor-grid">
      ${monitorCard("phone", "phonelink_erase", "Phone usage", "Detected handheld device use", 12, "4 critical")}
      ${monitorCard("absence", "person_off", "Post & absence", "Unattended or vacant work posts", 8, "2 critical")}
      ${monitorCard("camera", "center_focus_strong", "Camera tracking", "Live employee re-identification", 24, "cameras online")}
      ${monitorCard("route", "route", "Route tracking", "Movement and restricted-zone paths", 3, "route alerts")}
    </div>
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-head"><div class="panel-title">${icon("monitoring")}<div><h2>Incident activity</h2><p>Detections across the last seven days</p></div></div><div class="legend"><span><i></i>Phone</span><span><i></i>Absence</span></div></div>
        <div class="chart">
          <svg viewBox="0 0 700 180" preserveAspectRatio="none" aria-label="Weekly incidents chart">
            <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7457d9" stop-opacity=".28"/><stop offset="1" stop-color="#7457d9" stop-opacity="0"/></linearGradient></defs>
            <path d="M0 140 C65 132 80 72 140 91 S220 138 285 104 S350 35 420 62 S500 128 565 88 S630 28 700 45 L700 180 L0 180Z" fill="url(#chartFill)"/>
            <path d="M0 140 C65 132 80 72 140 91 S220 138 285 104 S350 35 420 62 S500 128 565 88 S630 28 700 45" fill="none" stroke="#7457d9" stroke-width="4" stroke-linecap="round"/>
            <path d="M0 156 C90 135 115 145 165 129 S255 116 310 138 S410 95 470 112 S580 78 700 98" fill="none" stroke="#d28b26" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 7"/>
          </svg>
        </div><div class="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
      </section>
      <section class="panel">
        <div class="panel-head"><div class="panel-title">${icon("notifications_active")}<div><h2>Recent alerts</h2><p>Latest AI-detected events</p></div></div><button class="button small" data-page-jump="phone">View all</button></div>
        <div class="activity-list">
          ${activity("smartphone", "Aiman Hakim", "Phone use &middot; Assembly Line A", "2m ago", "")}
          ${activity("person_off", "Farah Nadia", "Post PK-07 left unattended", "7m ago", "amber")}
          ${activity("door_open", "Kavitha Rao", "Entered restricted path", "18m ago", "")}
          ${activity("verified", "Mei Ling", "Incident reviewed and resolved", "24m ago", "green")}
        </div>
      </section>
    </div>
  </section>`;
}

function monitorCard(page, iconName, title, text, count, suffix) {
  return `<button class="monitor-card" data-page-jump="${page}"><div class="monitor-card__top"><span class="monitor-icon">${icon(iconName)}</span><span class="chevron">${icon("arrow_outward")}</span></div><h3>${title}</h3><p>${text}</p><div class="monitor-meta"><strong>${count}</strong><span>${suffix}</span></div></button>`;
}
function activity(iconName, name, copy, time, tone) {
  return `<div class="activity-item" data-record="${name}"><span class="activity-icon ${tone}">${icon(iconName)}</span><div><strong>${name}</strong><small>${copy}</small></div><span class="activity-time">${time}</span></div>`;
}

function renderEmployeeManagement() {
  const totalEmployees = 240 + employeeDirectory.length;
  const activeEmployees = 228 + employeeDirectory.filter(employee => employee.status === "Active").length;
  const employeesOnLeave = 7 + employeeDirectory.filter(employee => employee.status === "On leave").length;
  const enrolledProfiles = 233 + employeeDirectory.filter(employee => employee.reference === "Enrolled").length;

  app.innerHTML = `<section class="page employee-page">
    ${pageHead("People & AI identity", "Employee management", "Register employees and manage the identity data used by AI detection and tracking.", `<button class="button primary" id="registerEmployee">${icon("person_add")} Register employee</button>`)}
    <div class="metric-grid">
      ${metric("Registered employees", totalEmployees, "badge", "", "+8 this month")}
      ${metric("Active employees", activeEmployees, "person_check", "good", "Across all shifts")}
      ${metric("On leave", employeesOnLeave, "event_busy", "warn", "Current records")}
      ${metric("AI profiles enrolled", enrolledProfiles, "face", "good", `${Math.round((enrolledProfiles / totalEmployees) * 100)}% coverage`)}
    </div>
    <section class="panel filter-panel">
      <div class="panel-head"><div class="panel-title">${icon("manage_search")}<div><h2>Employee directory</h2><p>Search personnel records without loading the full workforce database at once.</p></div></div><span class="result-count" id="employeeResultCount"></span></div>
      <form class="employee-search-row" id="employeeSearch">
        <label class="search-field"><span class="material-symbols-rounded">search</span><input class="field" id="employeeQuery" placeholder="Employee name or ID"></label>
        <select class="field" id="employeeDepartment" aria-label="Department"><option value="">All departments</option>${[...new Set(employeeDirectory.map(employee => employee.department))].sort().map(department => `<option>${department}</option>`).join("")}</select>
        <select class="field" id="employeeStatus" aria-label="Employment status"><option value="">All statuses</option><option>Active</option><option>On leave</option><option>Inactive</option></select>
        <select class="field" id="employeeReference" aria-label="AI reference status"><option value="">All AI profiles</option><option>Enrolled</option><option>Missing</option></select>
        <button class="button primary" type="submit">${icon("search")} Find</button>
      </form>
    </section>
    <section class="panel">
      <div class="panel-head"><div><h2>Personnel records</h2><p>Select an employee to review their profile and movement history.</p></div><button class="button small" id="clearEmployeeFilters">${icon("filter_alt_off")} Clear filters</button></div>
      <div id="employeeTable"></div>
    </section>
  </section>`;

  renderEmployeeTable(employeeDirectory);
  bindEmployeeFilters();
  $("#registerEmployee").addEventListener("click", openEmployeeRegistration);
}

function renderEmployeeTable(records) {
  const target = $("#employeeTable");
  $("#employeeResultCount").textContent = `${records.length} displayed record${records.length === 1 ? "" : "s"}`;

  if (!records.length) {
    target.innerHTML = `<div class="empty-state">${icon("person_search")}<strong>No matching employees</strong><p>Try another name, ID, department, or status.</p></div>`;
    return;
  }

  target.innerHTML = `<div class="table-wrap"><table class="employee-table"><thead><tr><th>Employee</th><th>Department</th><th>Position</th><th>Shift</th><th>Status</th><th>AI reference</th><th>Last known area</th><th>Movement records</th><th></th></tr></thead><tbody>
    ${records.map(employee => `<tr><td><div class="employee">${employeeAvatar(employee.name)}<span><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.id)}</small></span></div></td><td>${escapeHtml(employee.department)}</td><td>${escapeHtml(employee.role)}</td><td>${escapeHtml(employee.shift)}</td><td>${badge(employee.status)}</td><td><span class="ai-reference ${employee.reference === "Missing" ? "missing" : ""}">${escapeHtml(employee.reference)}</span></td><td>${escapeHtml(employee.lastSeen)}</td><td><strong>${employee.movements}</strong> <span class="mono">events</span></td><td><button class="button small" data-employee-id="${escapeHtml(employee.id)}">${icon("visibility")} View</button></td></tr>`).join("")}
  </tbody></table></div>`;

  $$('[data-employee-id]', target).forEach(button => button.addEventListener("click", () => openEmployeeProfile(employeeDirectory.find(employee => employee.id === button.dataset.employeeId))));
}

function bindEmployeeFilters() {
  const filterEmployees = () => {
    const query = $("#employeeQuery").value.trim().toLowerCase();
    const department = $("#employeeDepartment").value;
    const status = $("#employeeStatus").value;
    const reference = $("#employeeReference").value;
    const records = employeeDirectory.filter(employee =>
      (!query || `${employee.id} ${employee.name}`.toLowerCase().includes(query)) &&
      (!department || employee.department === department) &&
      (!status || employee.status === status) &&
      (!reference || employee.reference === reference)
    );
    renderEmployeeTable(records);
  };

  $("#employeeSearch").addEventListener("submit", event => { event.preventDefault(); filterEmployees(); });
  $("#employeeDepartment").addEventListener("change", filterEmployees);
  $("#employeeStatus").addEventListener("change", filterEmployees);
  $("#employeeReference").addEventListener("change", filterEmployees);
  $("#clearEmployeeFilters").addEventListener("click", () => { $("#employeeSearch").reset(); renderEmployeeTable(employeeDirectory); });
}

function openEmployeeProfile(employee) {
  if (!employee) return;
  const employeeMovements = movementRecords.filter(record => record.employeeId === employee.id);
  $("#modalContent").innerHTML = `<div class="modal-inner employee-profile-modal">
    <div class="modal-title-row">${employeeAvatar(employee.name, true)}<div><span class="status-label">${escapeHtml(employee.id)}</span><h2 id="modalTitle">${escapeHtml(employee.name)}</h2><p>${escapeHtml(employee.role)} &middot; ${escapeHtml(employee.department)}</p></div></div>
    <div class="employee-profile-grid">
      <section class="detail-block"><h3>Employment details</h3><div class="detail-list"><div><small>Status</small><strong>${badge(employee.status)}</strong></div><div><small>Shift</small><strong>${escapeHtml(employee.shift)}</strong></div><div><small>Joined</small><strong>${escapeHtml(employee.joined)}</strong></div><div><small>Last known area</small><strong>${escapeHtml(employee.lastSeen)}</strong></div></div></section>
      <section class="detail-block"><h3>AI identity profile</h3><div class="ai-profile-summary"><span class="ai-profile-icon">${icon(employee.reference === "Missing" ? "no_accounts" : "face")}</span><div><strong>${escapeHtml(employee.reference)}</strong><small>${employee.reference === "Enrolled" ? "Reference profile available for person re-identification." : "Reference image is required before AI tracking can be enabled."}</small></div></div></section>
    </div>
    <section class="employee-history"><div class="panel-head"><div><h2>Movement history</h2><p>Recent AI-inferred movements linked to this employee.</p></div><span class="result-count">${employeeMovements.length} records</span></div>
      ${employeeMovements.length ? `<div class="table-wrap"><table><thead><tr><th>Date & time</th><th>From</th><th>To</th><th>Camera</th><th>Event</th><th>Confidence</th></tr></thead><tbody>${employeeMovements.map(record => `<tr><td>${escapeHtml(record.date)}<br><span class="mono">${escapeHtml(record.time)}</span></td><td>${escapeHtml(record.from)}</td><td>${escapeHtml(record.to)}</td><td class="mono">${escapeHtml(record.camera)}</td><td>${escapeHtml(record.event)}</td><td>${record.confidence}%</td></tr>`).join("")}</tbody></table></div>` : `<div class="employee-history-empty">${icon("route")}<p>No movement records available for this employee.</p></div>`}
    </section>
    <div class="modal-actions"><button class="button primary" data-employee-history="${escapeHtml(employee.id)}">${icon("route")} Open route tracking</button><button class="button" data-employee-edit="${escapeHtml(employee.id)}">${icon("edit")} Edit employee</button></div>
  </div>`;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $('[data-employee-history]').addEventListener("click", () => { closeModal(); location.hash = "route"; });
  $('[data-employee-edit]').addEventListener("click", () => openEmployeeEditor(employee));
}

function openEmployeeEditor(employee) {
  if (!employee) return;
  const departments = ["Assembly", "Machining", "Packaging", "Quality", "Warehouse"];
  const departmentOptions = [...new Set([...departments, employee.department])];

  $("#modalContent").innerHTML = `<div class="modal-inner employee-registration-modal">
    <div class="modal-title-row">${employeeAvatar(employee.name, true)}<div><span class="status-label">${escapeHtml(employee.id)}</span><h2 id="modalTitle">Edit employee</h2><p>Update this employee's personnel and AI identity details.</p></div></div>
    <form id="employeeEditForm" class="employee-form">
      <div class="employee-form-grid">
        <label><span>Employee ID</span><input class="field" name="employeeId" value="${escapeHtml(employee.id)}" readonly></label>
        <label><span>Full name</span><input class="field" name="fullName" value="${escapeHtml(employee.name)}" required></label>
        <label><span>Department</span><select class="field" name="department" required>${departmentOptions.map(department => `<option${department === employee.department ? " selected" : ""}>${escapeHtml(department)}</option>`).join("")}</select></label>
        <label><span>Position</span><input class="field" name="role" value="${escapeHtml(employee.role)}" required></label>
        <label><span>Shift</span><select class="field" name="shift" required>${["Morning", "Evening", "Night"].map(shift => `<option${shift === employee.shift ? " selected" : ""}>${shift}</option>`).join("")}</select></label>
        <label><span>Status</span><select class="field" name="status" required>${["Active", "On leave", "Inactive"].map(status => `<option${status === employee.status ? " selected" : ""}>${status}</option>`).join("")}</select></label>
        <label><span>Joined</span><input class="field" name="joined" value="${escapeHtml(employee.joined)}" required></label>
        <label><span>Last known area</span><input class="field" name="lastSeen" value="${escapeHtml(employee.lastSeen)}" required></label>
        <label><span>AI reference</span><select class="field" name="reference" required>${["Enrolled", "Missing"].map(reference => `<option${reference === employee.reference ? " selected" : ""}>${reference}</option>`).join("")}</select></label>
      </div>
      <div class="modal-actions"><button class="button primary" type="submit">${icon("save")} Save changes</button><button class="button" type="button" id="cancelEmployeeEdit">Cancel</button></div>
    </form>
  </div>`;

  $("#cancelEmployeeEdit").addEventListener("click", () => openEmployeeProfile(employee));
  $("#employeeEditForm").addEventListener("submit", event => updateEmployee(event, employee));
}

function updateEmployee(event, employee) {
  event.preventDefault();
  const form = event.currentTarget;
  const previousName = employee.name;
  const updatedName = form.elements.fullName.value.trim();
  const updatedDepartment = form.elements.department.value;

  Object.assign(employee, {
    name: updatedName,
    department: updatedDepartment,
    role: form.elements.role.value.trim(),
    shift: form.elements.shift.value,
    status: form.elements.status.value,
    joined: form.elements.joined.value.trim(),
    lastSeen: form.elements.lastSeen.value.trim(),
    reference: form.elements.reference.value
  });

  [...people, ...absence].filter(record => record.id === employee.id).forEach(record => {
    record.name = updatedName;
    record.dept = updatedDepartment;
  });
  movementRecords.filter(record => record.employeeId === employee.id).forEach(record => {
    record.employee = updatedName;
  });

  renderEmployeeManagement();
  openEmployeeProfile(employee);
  showToast(`${previousName} updated successfully`);
}

function openEmployeeRegistration() {
  $("#modalContent").innerHTML = `<div class="modal-inner employee-registration-modal">
    <div class="modal-title-row"><span class="monitor-icon">${icon("person_add")}</span><div><span class="status-label">New personnel record</span><h2 id="modalTitle">Register employee</h2><p>Create an employee profile for detection and tracking workflows.</p></div></div>
    <form id="employeeRegistrationForm" class="employee-form">
      <div class="employee-form-grid">
        <label><span>Employee ID</span><input class="field" name="employeeId" placeholder="EMP-0000" required></label>
        <label><span>Full name</span><input class="field" name="fullName" placeholder="Employee name" required></label>
        <label><span>Department</span><select class="field" name="department" required><option value="">Select department</option><option>Assembly</option><option>Machining</option><option>Packaging</option><option>Quality</option><option>Warehouse</option></select></label>
        <label><span>Position</span><input class="field" name="role" placeholder="Job title" required></label>
        <label><span>Shift</span><select class="field" name="shift" required><option>Morning</option><option>Evening</option><option>Night</option></select></label>
        <label><span>Status</span><select class="field" name="status" required><option>Active</option><option>On leave</option><option>Inactive</option></select></label>
      </div>
      <label class="reference-upload"><span class="reference-upload__icon">${icon("add_a_photo")}</span><span><strong>AI reference image</strong><small>Upload a clear front-facing employee image for person re-identification.</small></span><input name="referenceImage" type="file" accept="image/png,image/jpeg"><span class="button small">Choose image</span></label>
      <div class="modal-actions"><button class="button primary" type="submit">${icon("person_add")} Register employee</button><button class="button" type="button" id="cancelEmployeeRegistration">Cancel</button></div>
    </form>
  </div>`;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#cancelEmployeeRegistration").addEventListener("click", closeModal);
  $("#employeeRegistrationForm").addEventListener("submit", registerEmployee);
}

function registerEmployee(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const employeeId = form.elements.employeeId.value.trim().toUpperCase();
  const fullName = form.elements.fullName.value.trim();

  if (employeeDirectory.some(employee => employee.id === employeeId)) {
    showToast("That employee ID is already registered");
    return;
  }

  employeeDirectory.unshift({
    id: employeeId,
    name: fullName,
    department: form.elements.department.value,
    role: form.elements.role.value.trim(),
    shift: form.elements.shift.value,
    status: form.elements.status.value,
    reference: form.elements.referenceImage.files.length ? "Enrolled" : "Missing",
    joined: new Intl.DateTimeFormat("en-MY", { day:"2-digit", month:"short", year:"numeric" }).format(new Date()),
    lastSeen: "Not detected",
    movements: 0
  });

  closeModal();
  renderEmployeeManagement();
  showToast(`${fullName} registered successfully`);
}

const reportDefinitions = {
  phone: {
    title: "Mobile phone usage",
    description: "Export detected mobile phone usage incidents.",
    icon: "phonelink_erase",
    records: people,
    columns: [
      ["Employee ID", "id"], ["Employee", "name"], ["Department", "dept"], ["Event", "type"],
      ["Location", "location"], ["Camera", "camera"], ["Date", "date"], ["Time", "time"], ["AI confidence", "confidence"]
    ]
  },
  absence: {
    title: "Leave & Absence",
    description: "Export leave-post, late-return, and absence incidents.",
    icon: "person_off",
    records: absence,
    columns: [
      ["Employee ID", "id"], ["Employee", "name"], ["Department", "dept"], ["Event", "type"],
      ["Location", "location"], ["Camera", "camera"], ["Date", "date"], ["Time", "time"], ["Duration", "duration"]
    ]
  },
  route: {
    title: "Route tracking",
    description: "Export AI-inferred employee movement and route records.",
    icon: "route",
    records: movementRecords,
    columns: [
      ["Movement ID", "id"], ["Employee ID", "employeeId"], ["Employee", "employee"], ["From", "from"],
      ["To", "to"], ["Camera", "camera"], ["Date", "date"], ["Time", "time"], ["Duration", "duration"],
      ["AI confidence", "confidence"], ["Event", "event"], ["Status", "status"]
    ]
  }
};

function renderReports() {
  app.innerHTML = `<section class="page reports-page">
    ${pageHead("Management", "Reports", "Choose a report and export only the records within your selected date range.")}
    <div class="report-grid">
      ${Object.entries(reportDefinitions).map(([type, report]) => `<article class="panel report-card">
        <div class="report-card__heading"><span class="report-icon">${icon(report.icon)}</span><div><h2>${report.title}</h2><p>${report.description}</p></div></div>
        <form class="report-export-form" data-report-type="${type}">
          <div class="report-date-range">
            <label><span>From</span><input class="field" name="from" type="date" value="2026-10-01" required></label>
            <label><span>To</span><input class="field" name="to" type="date" value="2026-10-07" required></label>
          </div>
          <button class="button primary" type="submit">${icon("download")} Export</button>
        </form>
      </article>`).join("")}
    </div>
  </section>`;

  $$(".report-export-form").forEach(form => form.addEventListener("submit", exportReport));
}

function renderSettings() {
  const isDarkMode = document.documentElement.dataset.theme === "dark";
  app.innerHTML = `<section class="page settings-page">
    ${pageHead("Management", "Settings", "Configure your dashboard appearance and preferences.")}
    <div class="settings-grid">
      <section class="panel settings-card">
        <div class="settings-card__copy"><span class="settings-icon">${icon("dark_mode")}</span><div><h2>Dark mode</h2><p>Use a darker colour scheme throughout the Neovision dashboard.</p></div></div>
        <label class="theme-switch" for="darkModeToggle">
          <input id="darkModeToggle" type="checkbox" role="switch" ${isDarkMode ? "checked" : ""}>
          <span class="theme-switch__track"><span class="theme-switch__thumb"></span></span>
          <span class="theme-switch__state">${isDarkMode ? "On" : "Off"}</span>
        </label>
      </section>
    </div>
  </section>`;

  $("#darkModeToggle").addEventListener("change", event => {
    const theme = event.currentTarget.checked ? "dark" : "light";
    applyTheme(theme);
    $(".theme-switch__state").textContent = theme === "dark" ? "On" : "Off";
    showToast(`Dark mode ${theme === "dark" ? "enabled" : "disabled"}`);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
}

function initialiseTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || preferredTheme);
}

function exportReport(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const report = reportDefinitions[form.dataset.reportType];
  const from = form.elements.from.value;
  const to = form.elements.to.value;

  if (from > to) {
    showToast("The start date must be before the end date");
    return;
  }

  const records = report.records.filter(record => {
    const date = recordDateValue(record.date);
    return date >= from && date <= to;
  });

  if (!records.length) {
    showToast("No records found in the selected date range");
    return;
  }

  const rows = [
    report.columns.map(([heading]) => heading),
    ...records.map(record => report.columns.map(([, key]) => record[key] ?? ""))
  ];
  const csv = `\uFEFF${rows.map(row => row.map(csvCell).join(",")).join("\r\n")}`;
  const download = document.createElement("a");
  download.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  download.download = `${form.dataset.reportType}-${from}-to-${to}.csv`;
  download.click();
  URL.revokeObjectURL(download.href);
  showToast(`${records.length} ${report.title} record${records.length === 1 ? "" : "s"} exported`);
}

function recordDateValue(date) {
  const months = { Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06", Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12" };
  const [day, month, year] = date.split(" ");
  return `${year}-${months[month]}-${day.padStart(2, "0")}`;
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function renderDetection(type) {
  const isPhone = type === "phone";
  const records = isPhone ? people : absence;
  const title = isPhone ? "Mobile phone usage" : "Leave post & absence";
  const copy = isPhone ? "Review detected device usage and supporting visual evidence." : "Investigate unattended posts, late returns, and shift absences.";
  app.innerHTML = `<section class="page detection-page" data-kind="${type}">
    ${pageHead("AI detection workspace", title, copy, `<button class="button" data-action="export">${icon("file_download")} Export cases</button>`)}
    <div class="metric-grid">
      ${metric(isPhone ? "Detections today" : "Post events today", isPhone ? "12" : "8", isPhone ? "smartphone" : "person_off", "alert", "+3 from yesterday")}
      ${metric("Employees involved", isPhone ? "9" : "6", "badge")}
      ${metric(isPhone ? "Highest risk area" : "Average absence", isPhone ? "Line A" : "12m 18s", isPhone ? "location_on" : "timer", "good", isPhone ? "5 detections" : "-2m this week")}
    </div>
    <section class="panel filter-panel">
      <div class="panel-head"><div class="panel-title">${icon("manage_search")}<div><h2>Find employee records</h2><p>Search by employee name or ID, then refine the results.</p></div></div><span class="result-count" id="resultCount">${records.length} records</span></div>
      <form class="search-row" id="recordSearch">
        <label class="search-field"><span class="material-symbols-rounded">search</span><input class="field" id="searchInput" placeholder="Employee name or ID (e.g. EMP-1042)"></label>
        <select class="field" id="deptFilter" aria-label="Department"><option value="">All departments</option><option>Assembly</option><option>Packaging</option><option>Machining</option><option>Quality</option><option>Warehouse</option></select>
        <input class="field" type="date" value="2026-10-05" aria-label="Date">
        <button class="button primary" type="submit">${icon("search")} Find</button>
      </form>
    </section>
    <section class="panel">
      <div class="panel-head"><div><h2>Detection records</h2><p>Click any record to inspect its evidence and case details.</p></div><button class="button small" id="clearFilters">${icon("filter_alt_off")} Clear filters</button></div>
      <div id="recordsTable"></div>
    </section>
  </section>`;
  renderTable(records, type);
  bindDetectionFilters(records, type);
}

function renderTable(records, type) {
  const target = $("#recordsTable");
  $("#resultCount").textContent = `${records.length} record${records.length === 1 ? "" : "s"}`;
  if (!records.length) {
    target.innerHTML = `<div class="empty-state">${icon("person_search")}<strong>No matching records</strong><p>Try a different employee name, ID, or department.</p></div>`;
    return;
  }
  target.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Employee</th><th>Department</th><th>Event</th><th>Location</th><th>Date & time</th>${type === "phone" ? "<th>Confidence</th>" : "<th>Duration</th>"}<th></th></tr></thead><tbody>
    ${records.map(r => `<tr data-id="${r.id}"><td><div class="employee">${employeeAvatar(r.name)}<span><strong>${r.name}</strong><small>${r.id}</small></span></div></td><td>${r.dept}</td><td>${r.type}</td><td><strong>${r.location}</strong><br><span class="mono">${r.camera}</span></td><td>${r.date}<br><span class="mono">${r.time}</span></td>${type === "phone" ? `<td><span class="confidence"><i style="--score:${r.confidence}%"></i><b>${r.confidence}%</b></span></td>` : `<td class="mono">${r.duration}</td>`}<td>${icon("chevron_right")}</td></tr>`).join("")}
  </tbody></table></div>`;
  $$('tbody tr', target).forEach(row => row.addEventListener('click', () => openIncident([...people, ...absence].find(r => r.id === row.dataset.id))));
}

function bindDetectionFilters(records, type) {
  const run = () => {
    const q = $("#searchInput").value.trim().toLowerCase();
    const dept = $("#deptFilter").value;
    const filtered = records.filter(r => (!q || `${r.id} ${r.name}`.toLowerCase().includes(q)) && (!dept || r.dept === dept));
    renderTable(filtered, type);
  };
  $("#recordSearch").addEventListener("submit", e => { e.preventDefault(); run(); });
  $("#deptFilter").addEventListener("change", run);
  $("#clearFilters").addEventListener("click", () => { $("#recordSearch").reset(); renderTable(records, type); });
}

function renderCamera() {
  const onlineCount = demoCameras.filter(camera => camera.status === "Online").length;
  const offlineCount = demoCameras.filter(camera => camera.status === "Offline").length;
  app.innerHTML = `<section class="page">
    ${pageHead(`${onlineCount} cameras online · ${offlineCount} offline`, "Camera tracking", "Follow employees across camera zones using visual re-identification.", `<button class="button">${icon("grid_view")} Camera wall</button>`)}
    <div class="metric-grid">${metric("Online", onlineCount, "videocam", "good", "Demo feeds available", "online")}${metric("Offline", offlineCount, "videocam_off", "alert", "camera-05 offline", "offline")}${metric("Tracked people", demoTrackedPeople.length, "person_pin_circle", "", "View tracked people", "people")}${metric("Re-ID accuracy", "97.4%", "center_focus_strong", "good", "+0.6% this week")}</div>
    <section class="panel filter-panel"><form class="search-row" id="cameraSearch"><label class="search-field"><span class="material-symbols-rounded">search</span><input class="field" id="cameraPerson" placeholder="Search employee name or ID"></label><select class="field" id="cameraLocation" aria-label="Camera location"><option value="">All locations</option>${[...new Set(demoCameras.map(camera => camera.location))].map(location => `<option value="${escapeHtml(location)}">${escapeHtml(location)}</option>`).join("")}</select><select class="field" id="cameraFilter" aria-label="Camera">${cameraFilterOptions()}</select><select class="field" aria-label="Time range"><option>Live now</option><option>Last hour</option><option>Today</option></select><button class="button primary">${icon("my_location")} Track</button></form></section>
    <div class="camera-layout">
      <section class="panel"><div class="panel-head"><div><h2>Live camera matrix</h2><p>Selected identity: Aiman Hakim &middot; EMP-1042</p><p id="cameraGridStatus" role="status">Showing 4 cameras</p></div>${badge("Live tracking")}</div><div class="camera-grid">
        ${cameraFeed("camera-01", 1)}
        ${cameraFeed("camera-02", 2)}
        ${cameraFeed("camera-02", 3)}
        ${cameraFeed("camera-01", 4)}
      </div><div class="empty-state" id="cameraGridEmpty" hidden>${icon("videocam_off")}<strong>No live footage</strong><p>The camera at this location is offline.</p></div></section>
      <aside class="panel"><div class="panel-head"><div><h2>Identity journey</h2><p>Camera-to-camera movement</p></div></div><div class="route-timeline">
        ${routeEvent("10:42", "CAM-04 &middot; Assembly Line A", "Identity confidence 96%")}
        ${routeEvent("10:36", "CAM-03 &middot; East Corridor", "Direction: west")}
        ${routeEvent("10:29", "CAM-02 &middot; Staff Entrance", "Identity confidence 94%")}
        ${routeEvent("07:03", "CAM-01 &middot; Main Gate", "Shift entry recorded")}
      </div><button class="button primary" data-page-jump="route" style="width:100%;margin-top:16px">${icon("route")} View on floorplan</button></aside>
    </div>
    <dialog class="camera-viewer" id="cameraViewer" aria-labelledby="cameraViewerTitle">
      <div class="camera-viewer-head"><div><h2 id="cameraViewerTitle">Camera view</h2><p>Demo footage</p></div><button class="icon-button" id="cameraViewerClose" type="button" aria-label="Close camera view">${icon("close")}</button></div>
      <video id="cameraViewerVideo" autoplay muted loop playsinline controls></video>
    </dialog>
    <dialog class="camera-viewer camera-summary" id="cameraSummary" aria-labelledby="cameraSummaryTitle">
      <div class="camera-viewer-head"><div><h2 id="cameraSummaryTitle">Camera status</h2><p id="cameraSummaryDescription"></p></div><button class="icon-button" id="cameraSummaryClose" type="button" aria-label="Close camera list">${icon("close")}</button></div>
      <div class="camera-summary-content" id="cameraSummaryContent"></div>
    </dialog>
  </section>`;
  $$("[data-camera-summary]", app).forEach(button => button.addEventListener("click", () => openCameraSummary(button.dataset.cameraSummary)));
  bindCameraDialog($("#cameraSummary"), $("#cameraSummaryClose"));
  $("#cameraSearch").addEventListener("submit", e => { e.preventDefault(); applyCameraFilters(); if ($("#cameraPerson").value) showToast(`Tracking ${$("#cameraPerson").value}`); });
  $("#cameraLocation").addEventListener("change", () => {
    $("#cameraFilter").innerHTML = cameraFilterOptions($("#cameraLocation").value);
    applyCameraFilters();
  });
  $("#cameraFilter").addEventListener("change", applyCameraFilters);
  $$(".camera-feed", app).forEach(feed => feed.addEventListener("click", () => openCameraViewer(feed)));
  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "button camera-retry";
  retryButton.textContent = "Retry cameras";
  retryButton.hidden = true;
  $(".camera-grid", app).after(retryButton);
  retryButton.addEventListener("click", () => initialiseCameraFeeds(retryButton));
  initialiseCameraFeeds(retryButton);
  const viewer = $("#cameraViewer");
  bindCameraDialog(viewer, $("#cameraViewerClose"));
  viewer.addEventListener("close", () => {
    const video = $("#cameraViewerVideo", viewer);
    video.pause();
    video.onloadedmetadata = null;
    video.removeAttribute("src");
    video.load();
  });
}
function cameraFeed(videoName, position) {
  const cameraLabel = `camera-${String(position).padStart(2, "0")}`;
  const camera = demoCameras.find(camera => camera.id === cameraLabel);
  return `<button class="camera-feed is-loading" type="button" disabled data-camera-label="${cameraLabel}" data-camera-location="${escapeHtml(camera.location)}" aria-label="Expand ${cameraLabel}, ${escapeHtml(camera.location)}" aria-haspopup="dialog"><video preload="auto" muted loop playsinline src="/demo-video/${videoName}.mp4" aria-label="${cameraLabel} demo footage"></video><span class="camera-load-status" role="status">Preparing cameras&hellip;</span><span class="camera-expand"><span>${cameraLabel}<small>${escapeHtml(camera.location)}</small></span>${icon("open_in_full")}</span></button>`;
}

function cameraFilterOptions(location="") {
  return `<option value="">All cameras</option>${demoCameras.filter(camera => !location || camera.location === location).map(camera => `<option value="${camera.id}">${camera.id}${camera.status === "Offline" ? " (Offline)" : ""}</option>`).join("")}`;
}

function applyCameraFilters() {
  const location = $("#cameraLocation").value;
  const cameraId = $("#cameraFilter").value;
  let visibleCount = 0;
  $$(".camera-feed", app).forEach(feed => {
    feed.hidden = Boolean((location && feed.dataset.cameraLocation !== location) || (cameraId && feed.dataset.cameraLabel !== cameraId));
    const video = $("video", feed);
    if (feed.hidden) { video.pause(); return; }
    visibleCount++;
    if (!feed.disabled) video.play().catch(() => {});
  });
  const grid = $(".camera-grid", app);
  grid.classList.toggle("is-single", visibleCount === 1);
  grid.hidden = visibleCount === 0;
  $("#cameraGridEmpty").hidden = visibleCount !== 0;
  $("#cameraGridStatus").textContent = `${location || "All locations"} · Showing ${visibleCount} camera${visibleCount === 1 ? "" : "s"}`;
}

function bindCameraDialog(dialog, closeButton) {
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", e => {
    const bounds = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom)) dialog.close();
  });
}

function openCameraSummary(type) {
  const isPeople = type === "people";
  const status = type === "online" ? "Online" : "Offline";
  const cameras = demoCameras.filter(camera => camera.status === status);
  const checkedAt = new Intl.DateTimeFormat("en-MY", {
    timeZone:"Asia/Kuala_Lumpur", day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false
  }).format(new Date());
  $("#cameraSummaryTitle").textContent = isPeople ? `Tracked people (${demoTrackedPeople.length})` : `${status} cameras (${cameras.length})`;
  $("#cameraSummaryDescription").textContent = isPeople ? "Demo tracking list · Camera assignment is simulated." : "Demo camera status · Last check uses the current time (MYT).";
  $("#cameraSummaryClose").setAttribute("aria-label", isPeople ? "Close tracked people list" : "Close camera list");
  $("#cameraSummaryContent").innerHTML = isPeople
    ? `<div class="table-wrap"><table><thead><tr><th>Employee</th><th>Employee ID</th><th>Department</th><th>Camera</th><th>Status</th></tr></thead><tbody>${demoTrackedPeople.map(person => `<tr><td><strong>${escapeHtml(person.name)}</strong></td><td class="mono">${escapeHtml(person.id)}</td><td>${escapeHtml(person.dept)}</td><td class="mono">${person.camera}</td><td>${badge("Active")}</td></tr>`).join("")}</tbody></table></div>`
    : `<div class="table-wrap"><table><thead><tr><th>Camera</th><th>Location</th><th>Status</th><th>Last check (MYT)</th></tr></thead><tbody>${cameras.map(camera => `<tr><td class="mono"><strong>${camera.id}</strong></td><td>${camera.location}</td><td>${badge(camera.status)}</td><td class="mono">${checkedAt}</td></tr>`).join("")}</tbody></table></div>`;
  $("#cameraSummary").showModal();
}

function waitForCamera(video, signal) {
  return new Promise(resolve => {
    if (signal.aborted) { resolve(false); return; }
    if (video.readyState >= 3) { resolve(true); return; }
    const finish = ready => {
      clearTimeout(timeout);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onError);
      signal.removeEventListener("abort", onError);
      resolve(ready);
    };
    const onReady = () => finish(true);
    const onError = () => finish(false);
    const timeout = setTimeout(onError, 20000);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onError);
    signal.addEventListener("abort", onError, { once:true });
    video.load();
  });
}

async function initialiseCameraFeeds(retryButton) {
  cameraLoadController?.abort();
  cameraLoadController = new AbortController();
  const { signal } = cameraLoadController;
  const feeds = $$(".camera-feed", app);
  const videos = feeds.map(feed => $("video", feed));
  retryButton.hidden = true;
  feeds.forEach((feed, index) => {
    videos[index].pause();
    feed.disabled = true;
    feed.classList.remove("is-unavailable");
    feed.classList.add("is-loading");
    $(".camera-load-status", feed).textContent = "Preparing cameras…";
  });
  const readiness = await Promise.all(videos.map(video => waitForCamera(video, signal)));
  if (signal.aborted) return;
  const markUnavailable = feed => {
    feed.disabled = true;
    feed.classList.add("is-unavailable");
    $(".camera-load-status", feed).textContent = "Video unavailable. Retry cameras.";
    retryButton.hidden = false;
  };
  feeds.forEach((feed, index) => {
    feed.classList.remove("is-loading");
    if (!readiness[index]) { markUnavailable(feed); return; }
    feed.disabled = false;
    videos[index].currentTime = 0;
    if (!feed.hidden) videos[index].play().catch(() => { if (!signal.aborted) markUnavailable(feed); });
  });
}

function openCameraViewer(feed) {
  const viewer = $("#cameraViewer");
  const sourceVideo = $("video", feed);
  const video = $("#cameraViewerVideo", viewer);
  const playbackTime = sourceVideo.currentTime;
  $("#cameraViewerTitle").textContent = feed.dataset.cameraLabel;
  video.setAttribute("aria-label", `${feed.dataset.cameraLabel} demo footage`);
  video.muted = true;
  video.onloadedmetadata = () => { video.currentTime = playbackTime; };
  video.src = sourceVideo.currentSrc || sourceVideo.src;
  viewer.showModal();
}

function renderRoute() {
  app.innerHTML = `<section class="page">
    ${pageHead("Spatial intelligence", "Floorplan route tracking", "Replay an employee's movement and inspect evidence at every checkpoint.", `<button class="button" data-action="export">${icon("file_download")} Export route</button>`)}
    <section class="panel filter-panel"><form class="search-row" id="routeSearch"><label class="search-field"><span class="material-symbols-rounded">search</span><input class="field" id="routePerson" value="Aiman Hakim &middot; EMP-1042" placeholder="Employee name or ID"></label><select class="field"><option>Floor 01</option><option>Floor 02</option></select><input class="field" type="date" value="2026-10-05"><select class="field"><option>07:00&ndash;15:00</option><option>15:00&ndash;23:00</option></select><button class="button primary">${icon("route")} Show route</button></form></section>
    <div class="route-layout">
      <section class="panel"><div class="panel-head"><div><h2>Plant 01 &middot; Ground floor</h2><p>Route from 07:03 to 10:42 &middot; 1.84 km</p></div><div class="legend"><span><i></i>Route</span><span><i style="background:var(--red)"></i>Alert</span></div></div>
        <div class="floorplan">
          <svg viewBox="0 0 820 500" role="img" aria-label="Factory floorplan with employee route">
            <defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#dcd7e7" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/>
            <rect class="map-zone" x="28" y="32" width="230" height="155" rx="12"/><text class="map-label" x="48" y="62">ASSEMBLY LINE A</text>
            <rect class="map-zone" x="278" y="32" width="250" height="155" rx="12"/><text class="map-label" x="298" y="62">CNC MACHINING</text>
            <rect class="map-zone" x="548" y="32" width="242" height="155" rx="12"/><text class="map-label" x="568" y="62">PACKAGING</text>
            <rect class="map-zone" x="28" y="218" width="178" height="245" rx="12"/><text class="map-label" x="48" y="248">WAREHOUSE</text>
            <rect class="map-zone" x="226" y="218" width="302" height="110" rx="12"/><text class="map-label" x="246" y="248">EAST CORRIDOR</text>
            <rect class="map-zone" x="226" y="348" width="302" height="115" rx="12"/><text class="map-label" x="246" y="378">QUALITY ASSURANCE</text>
            <rect class="map-zone restricted" x="548" y="218" width="242" height="245" rx="12"/><text class="map-label" x="568" y="248" fill="#c8475b">RESTRICTED STORAGE</text>
            <polyline class="route-progress" points="70,430 170,390 270,406 380,398 470,282 390,270 340,145 455,110 620,120 660,270"/>
            <polyline class="route-line" points="70,430 170,390 270,406 380,398 470,282 390,270 340,145 455,110 620,120 660,270"/>
            <circle class="route-dot" cx="70" cy="430" r="10"/><circle class="route-dot" cx="270" cy="406" r="10"/><circle class="route-dot" cx="470" cy="282" r="10"/><circle class="route-dot" cx="340" cy="145" r="10"/><circle class="route-dot" cx="620" cy="120" r="10"/><circle class="route-alert" cx="660" cy="270" r="12"/>
            <text class="map-label" x="46" y="458">START 07:03</text><text class="map-label" x="676" y="274" fill="#c8475b">ALERT 10:17</text>
          </svg><div class="map-controls"><button class="icon-button" data-toast="Map zoomed in">${icon("add")}</button><button class="icon-button" data-toast="Map zoomed out">${icon("remove")}</button><button class="icon-button" data-toast="Map view reset">${icon("my_location")}</button></div>
        </div><div class="playback"><button class="icon-button" id="routePlay">${icon("play_arrow")}</button><span class="mono">07:03</span><input id="routeRange" type="range" min="0" max="100" value="68"><span class="mono" id="routeTime">10:42</span><select class="field" style="width:80px;min-height:36px"><option>1&times;</option><option>2&times;</option><option>4&times;</option></select></div>
      </section>
      <aside class="panel"><div class="employee" style="margin-bottom:18px">${employeeAvatar("Aiman Hakim")}<span><strong>Aiman Hakim</strong><small>EMP-1042 &middot; Assembly</small></span>${badge("On site")}</div>
        <div class="metric-grid" style="grid-template-columns:1fr 1fr"><div class="detail-block"><small>Distance</small><strong>1.84 km</strong></div><div class="detail-block"><small>Zones</small><strong>6</strong></div><div class="detail-block"><small>Stops</small><strong>4</strong></div><div class="detail-block"><small>Alerts</small><strong style="color:var(--red)">1</strong></div></div>
        <div class="panel-head"><div><h2>Route checkpoints</h2><p>Select a point to inspect evidence</p></div></div><div class="route-timeline">
          ${routeEvent("10:42", "Assembly Line A", "Current position &middot; CAM-04")}${routeEvent("10:17", "Restricted Storage", "Unauthorized boundary crossing")}${routeEvent("09:36", "East Corridor", "Stopped for 6m 12s")}${routeEvent("08:14", "Quality Assurance", "Checkpoint passed")}${routeEvent("07:03", "Main Gate", "Route started")}
        </div>
      </aside>
    </div>
    ${renderMovementRecords()}
  </section>`;
  $("#routeSearch").addEventListener("submit", e => { e.preventDefault(); showToast(`Route loaded for ${$("#routePerson").value}`); });
  $("#routePlay").addEventListener("click", e => { e.currentTarget.classList.toggle("playing"); e.currentTarget.innerHTML = icon(e.currentTarget.classList.contains("playing") ? "pause" : "play_arrow"); showToast(e.currentTarget.classList.contains("playing") ? "Route playback started" : "Route playback paused"); });
  $("#routeRange").addEventListener("input", e => $("#routeTime").textContent = `${String(7 + Math.floor(e.target.value / 20)).padStart(2,"0")}:${String((e.target.value * 7) % 60).padStart(2,"0")}`);
  $$('[data-movement-id]').forEach(button => button.addEventListener('click', () => openMovementEvidence(movementRecords.find(record => record.id === button.dataset.movementId))));
}
function routeEvent(time, title, copy) { return `<button class="route-event" data-toast="Opened evidence from ${time}" style="border:0;background-color:transparent;text-align:left;width:100%;cursor:pointer"><time>${time}</time><span><strong>${title}</strong><small>${copy}</small></span></button>`; }

function renderMovementRecords() {
  return `<section class="panel movement-records">
    <div class="panel-head"><div class="panel-title">${icon("directions_walk")}<div><h2>Employee movement records</h2><p>AI-inferred movements generated from CCTV detections and re-identification.</p></div></div><div class="movement-record-actions"><span class="result-count">${movementRecords.length} records</span><button class="button small" data-action="export">${icon("download")} Export</button></div></div>
    <div class="table-wrap"><table><thead><tr><th>Timestamp</th><th>Employee</th><th>Movement</th><th>Camera</th><th>Dwell / travel</th><th>AI confidence</th><th>Event</th><th>Status</th><th>Evidence</th></tr></thead><tbody>
      ${movementRecords.map(record => `<tr><td><strong>${record.time}</strong><br><span class="mono">${record.date}</span></td><td><div class="employee">${employeeAvatar(record.employee)}<span><strong>${record.employee}</strong><small>${record.employeeId}</small></span></div></td><td><div class="movement-path"><span>${record.from}</span>${icon("arrow_forward")}<strong>${record.to}</strong></div></td><td class="mono">${record.camera}</td><td class="mono">${record.duration}</td><td><span class="confidence"><i style="--score:${record.confidence}%"></i><b>${record.confidence}%</b></span></td><td>${record.event}</td><td>${badge(record.status)}</td><td><button class="button small evidence-button" data-movement-id="${record.id}">${icon("smart_display")} View</button></td></tr>`).join("")}
    </tbody></table></div>
  </section>`;
}

function openMovementEvidence(record) {
  if (!record) return;
  $("#modalContent").innerHTML = `<div class="modal-inner"><div class="modal-title-row"><span class="monitor-icon">${icon("route")}</span><div><span class="status-label">Movement ${record.id}</span><h2 id="modalTitle">${record.from} to ${record.to}</h2><p>${record.employee} &middot; ${record.employeeId}</p></div></div>
    <div class="detail-grid"><div class="evidence">${noFootage()}</div>
      <div class="detail-stack"><div class="detail-block"><h3>AI movement inference</h3><div class="detail-list"><div><small>Employee</small><strong>${record.employee}</strong></div><div><small>Camera</small><strong>${record.camera}</strong></div><div><small>From zone</small><strong>${record.from}</strong></div><div><small>To zone</small><strong>${record.to}</strong></div><div><small>Travel / dwell time</small><strong>${record.duration}</strong></div><div><small>AI confidence</small><strong>${record.confidence}%</strong></div><div><small>Event type</small><strong>${record.event}</strong></div><div><small>Status</small><strong>${badge(record.status)}</strong></div></div></div>
      <div class="detail-block"><h3>Inference source</h3><p class="movement-source">Generated from person detection, employee re-identification, camera timestamp, and zone-transition data.</p></div></div></div>
    <div class="modal-actions"><button class="button primary" data-case-action="Checkpoint selected on floorplan">${icon("location_on")} Show checkpoint</button><button class="button" data-case-action="Movement record exported">${icon("download")} Export record</button></div></div>`;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $$('[data-case-action]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.caseAction)));
}

function openIncident(record) {
  if (!record) record = people[0];
  const isAbsence = record.duration;
  const phoneRecordIndex = people.findIndex(person => person.id === record.id);
  const evidence = isAbsence
    ? `<img class="evidence-image" src="/evidence-demo/evidence-post%20absence.png" alt="Demo post and absence evidence for ${escapeHtml(record.name)}">`
    : phoneRecordIndex >= 0
      ? `<img class="evidence-image" src="/evidence-demo/evidence-0${phoneRecordIndex % 2 + 1}.png" alt="Demo phone usage evidence for ${escapeHtml(record.name)}">`
      : noEvidence();
  $("#modalContent").innerHTML = `<div class="modal-inner"><div class="modal-title-row"><span class="monitor-icon">${icon(isAbsence ? "person_off" : "smartphone")}</span><div><span class="status-label">Case ${record.id}-${record.time.replaceAll(":","")}</span><h2 id="modalTitle">${record.type}</h2><p>${record.name} &middot; ${record.id}</p></div></div>
    <div class="detail-grid"><div class="evidence">${evidence}</div>
      <div class="detail-stack"><div class="detail-block"><h3>Incident details</h3><div class="detail-list"><div><small>Employee</small><strong>${record.name}</strong></div><div><small>Department</small><strong>${record.dept}</strong></div><div><small>Location</small><strong>${record.location}</strong></div><div><small>Camera</small><strong>${record.camera}</strong></div><div><small>${isAbsence ? "Duration" : "AI confidence"}</small><strong>${isAbsence ? record.duration : record.confidence + "%"}</strong></div></div></div></div></div>`;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() { $("#modalBackdrop").hidden = true; document.body.style.overflow = ""; }

function navigate(page) {
  cameraLoadController?.abort();
  currentPage = pageMeta[page] ? page : "overview";
  $("#headerTitle").textContent = pageMeta[currentPage];
  $$(".nav-link[data-page]").forEach(link => link.classList.toggle("active", link.dataset.page === currentPage));
  if (currentPage === "overview") renderOverview();
  if (currentPage === "phone" || currentPage === "absence") renderDetection(currentPage);
  if (currentPage === "camera") renderCamera();
  if (currentPage === "route") renderRoute();
  if (currentPage === "employees") renderEmployeeManagement();
  if (currentPage === "reports") renderReports();
  if (currentPage === "settings") renderSettings();
  $("#sidebar").classList.remove("open");
  app.focus({preventScroll:true});
}

document.addEventListener("click", e => {
  const navLink = e.target.closest(".nav-link[data-page]");
  if (navLink) { e.preventDefault(); location.hash = navLink.dataset.page; }
  const jump = e.target.closest("[data-page-jump]");
  if (jump) { location.hash = jump.dataset.pageJump; return; }
  const toastTarget = e.target.closest("[data-toast]");
  if (toastTarget) showToast(toastTarget.dataset.toast);
  const action = e.target.closest("[data-action]");
  if (action?.dataset.action === "export") showToast("Report exported successfully");
  const activityTarget = e.target.closest("[data-record]");
  if (activityTarget) openIncident([...people, ...absence].find(r => r.name === activityTarget.dataset.record));
});
window.addEventListener("hashchange", () => navigate(location.hash.slice(1)));
$("#menuToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
$("#modalClose").addEventListener("click", closeModal);
$("#modalBackdrop").addEventListener("click", e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

const now = new Date();
$("#currentDate").textContent = new Intl.DateTimeFormat("en-MY", { weekday:"short", day:"2-digit", month:"short", year:"numeric" }).format(now);
initialiseTheme();
document.fonts.load('24px "Material Symbols Rounded"').then(fonts => {
  if (fonts.length) document.documentElement.classList.add("icons-ready");
}).catch(() => {});
navigate(location.hash.slice(1) || "overview");
