const people = [
  { id:"EMP-1042", name:"Aiman Hakim", dept:"Assembly", location:"Assembly Line A", camera:"CAM-04", time:"10:42:18", date:"05 Oct 2026", severity:"Critical", status:"Unresolved", confidence:96, type:"Phone usage" },
  { id:"EMP-2087", name:"Nur Izzati", dept:"Packaging", location:"Packing Zone 2", camera:"CAM-11", time:"10:31:04", date:"05 Oct 2026", severity:"Warning", status:"Under review", confidence:91, type:"Phone usage" },
  { id:"EMP-3184", name:"Daniel Wong", dept:"Machining", location:"CNC Bay 4", camera:"CAM-07", time:"09:58:46", date:"05 Oct 2026", severity:"Critical", status:"Confirmed", confidence:98, type:"Phone usage" },
  { id:"EMP-4019", name:"Siti Aminah", dept:"Quality", location:"QA Station 1", camera:"CAM-15", time:"09:17:32", date:"05 Oct 2026", severity:"Warning", status:"Resolved", confidence:88, type:"Phone usage" },
  { id:"EMP-5331", name:"Raj Kumar", dept:"Warehouse", location:"Loading Bay", camera:"CAM-18", time:"08:49:15", date:"05 Oct 2026", severity:"Warning", status:"Under review", confidence:93, type:"Phone usage" }
];

const absence = [
  { ...people[1], id:"EMP-2208", name:"Farah Nadia", dept:"Packaging", location:"Post PK-07", camera:"CAM-12", time:"10:36:20", severity:"Critical", status:"Unresolved", confidence:97, type:"Post left for 18 min", duration:"18m 42s" },
  { ...people[2], id:"EMP-3390", name:"Harith Iskandar", dept:"Machining", location:"Post MC-04", time:"10:11:06", severity:"Warning", status:"Under review", confidence:92, type:"Late return", duration:"11m 08s" },
  { ...people[3], id:"EMP-4416", name:"Mei Ling", dept:"Quality", location:"Post QA-02", time:"09:42:51", severity:"Warning", status:"Resolved", confidence:89, type:"Post left for 7 min", duration:"07m 16s" },
  { ...people[4], id:"EMP-5277", name:"Kavitha Rao", dept:"Warehouse", location:"Post WH-11", time:"08:55:40", severity:"Critical", status:"Confirmed", confidence:95, type:"Absent at shift start", duration:"24m 03s" }
];

const movementRecords = [
  { id:"MOV-1042-01", time:"10:42:18", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"East Corridor", to:"Assembly Line A", camera:"CAM-04", duration:"00:46", confidence:96, event:"Zone transition", status:"Normal" },
  { id:"MOV-1042-02", time:"10:17:03", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"Packaging", to:"Restricted Storage", camera:"CAM-19", duration:"02:14", confidence:94, event:"Restricted entry", status:"Alert" },
  { id:"MOV-1042-03", time:"09:36:41", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"Quality Assurance", to:"East Corridor", camera:"CAM-08", duration:"06:12", confidence:93, event:"Extended stop", status:"Review" },
  { id:"MOV-1042-04", time:"08:14:22", employee:"Aiman Hakim", employeeId:"EMP-1042", from:"Main Gate", to:"Quality Assurance", camera:"CAM-02", duration:"01:08", confidence:98, event:"Zone transition", status:"Normal" }
];

const pageMeta = {
  overview:"Command overview", phone:"Phone usage detection", absence:"Post & absence detection",
  camera:"Camera tracking", route:"Floorplan route tracking"
};

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const app = $("#app");
const currentUsername = document.body.dataset.username || "User";
let currentPage = "overview";
let toastTimer;

function icon(name) { return `<span class="material-symbols-rounded">${name}</span>`; }
function noFootage() { return `<div class="footage-empty">${icon("videocam_off")}<p>No footage available at the moment</p></div>`; }
function badge(value) {
  const cls = /critical|unresolved|confirmed|alert/i.test(value) ? "red" : /warning|review/i.test(value) ? "amber" : /resolved|online|normal/i.test(value) ? "green" : "";
  return `<span class="badge ${cls}">${value}</span>`;
}
function showToast(message) {
  $("#toastText").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2600);
}
function metric(label, value, iconName, tone="", trend="Live telemetry") {
  return `<article class="metric-card ${tone}"><div><small>${label}</small><strong>${value}</strong><span class="trend ${tone === "alert" ? "down" : ""}">${trend}</span></div><span class="metric-icon">${icon(iconName)}</span></article>`;
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
      ${metric("Unresolved", isPhone ? "4" : "3", "pending_actions", "warn", "Requires review")}
      ${metric(isPhone ? "Highest risk area" : "Average absence", isPhone ? "Line A" : "12m 18s", isPhone ? "location_on" : "timer", "good", isPhone ? "5 detections" : "-2m this week")}
    </div>
    <section class="panel filter-panel">
      <div class="panel-head"><div class="panel-title">${icon("manage_search")}<div><h2>Find employee records</h2><p>Search by employee name or ID, then refine the results.</p></div></div><span class="result-count" id="resultCount">${records.length} records</span></div>
      <form class="search-row" id="recordSearch">
        <label class="search-field"><span class="material-symbols-rounded">search</span><input class="field" id="searchInput" placeholder="Employee name or ID (e.g. EMP-1042)"></label>
        <select class="field" id="deptFilter" aria-label="Department"><option value="">All departments</option><option>Assembly</option><option>Packaging</option><option>Machining</option><option>Quality</option><option>Warehouse</option></select>
        <select class="field" id="statusFilter" aria-label="Status"><option value="">All statuses</option><option>Unresolved</option><option>Under review</option><option>Confirmed</option><option>Resolved</option></select>
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
    target.innerHTML = `<div class="empty-state">${icon("person_search")}<strong>No matching records</strong><p>Try a different employee name, ID, department, or status.</p></div>`;
    return;
  }
  target.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Employee</th><th>Department</th><th>Event</th><th>Location</th><th>Date & time</th>${type === "phone" ? "<th>Confidence</th>" : "<th>Duration</th>"}<th>Severity</th><th>Status</th><th></th></tr></thead><tbody>
    ${records.map(r => `<tr data-id="${r.id}"><td><div class="employee"><span class="avatar">${r.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</span><span><strong>${r.name}</strong><small>${r.id}</small></span></div></td><td>${r.dept}</td><td>${r.type}</td><td><strong>${r.location}</strong><br><span class="mono">${r.camera}</span></td><td>${r.date}<br><span class="mono">${r.time}</span></td>${type === "phone" ? `<td><span class="confidence"><i style="--score:${r.confidence}%"></i><b>${r.confidence}%</b></span></td>` : `<td class="mono">${r.duration}</td>`}<td>${badge(r.severity)}</td><td>${badge(r.status)}</td><td>${icon("chevron_right")}</td></tr>`).join("")}
  </tbody></table></div>`;
  $$('tbody tr', target).forEach(row => row.addEventListener('click', () => openIncident([...people, ...absence].find(r => r.id === row.dataset.id))));
}

function bindDetectionFilters(records, type) {
  const run = () => {
    const q = $("#searchInput").value.trim().toLowerCase();
    const dept = $("#deptFilter").value;
    const status = $("#statusFilter").value;
    const filtered = records.filter(r => (!q || `${r.id} ${r.name}`.toLowerCase().includes(q)) && (!dept || r.dept === dept) && (!status || r.status === status));
    renderTable(filtered, type);
  };
  $("#recordSearch").addEventListener("submit", e => { e.preventDefault(); run(); });
  $("#deptFilter").addEventListener("change", run);
  $("#statusFilter").addEventListener("change", run);
  $("#clearFilters").addEventListener("click", () => { $("#recordSearch").reset(); renderTable(records, type); });
}

function renderCamera() {
  app.innerHTML = `<section class="page">
    ${pageHead("24 cameras connected", "Camera tracking", "Follow employees across camera zones using visual re-identification.", `<button class="button">${icon("grid_view")} Camera wall</button>`)}
    <div class="metric-grid">${metric("Online", "24", "videocam", "good", "96% availability")}${metric("Offline", "1", "videocam_off", "alert", "CAM-22 service due")}${metric("Tracked people", "18", "person_pin_circle")}${metric("Re-ID accuracy", "97.4%", "center_focus_strong", "good", "+0.6% this week")}</div>
    <section class="panel filter-panel"><form class="search-row" id="cameraSearch"><label class="search-field"><span class="material-symbols-rounded">search</span><input class="field" id="cameraPerson" placeholder="Search employee name or ID"></label><select class="field"><option>All zones</option><option>Assembly</option><option>Packaging</option><option>Warehouse</option></select><select class="field"><option>All cameras</option><option>CAM-04</option><option>CAM-11</option><option>CAM-18</option></select><select class="field"><option>Live now</option><option>Last hour</option><option>Today</option></select><button class="button primary">${icon("my_location")} Track</button></form></section>
    <div class="camera-layout">
      <section class="panel"><div class="panel-head"><div><h2>Live camera matrix</h2><p>Selected identity: Aiman Hakim &middot; EMP-1042</p></div>${badge("Live tracking")}</div><div class="camera-grid">
        ${cameraFeed()}
        ${cameraFeed()}
        ${cameraFeed()}
        ${cameraFeed()}
      </div></section>
      <aside class="panel"><div class="panel-head"><div><h2>Identity journey</h2><p>Camera-to-camera movement</p></div></div><div class="route-timeline">
        ${routeEvent("10:42", "CAM-04 &middot; Assembly Line A", "Identity confidence 96%")}
        ${routeEvent("10:36", "CAM-03 &middot; East Corridor", "Direction: west")}
        ${routeEvent("10:29", "CAM-02 &middot; Staff Entrance", "Identity confidence 94%")}
        ${routeEvent("07:03", "CAM-01 &middot; Main Gate", "Shift entry recorded")}
      </div><button class="button primary" data-page-jump="route" style="width:100%;margin-top:16px">${icon("route")} View on floorplan</button></aside>
    </div>
  </section>`;
  $("#cameraSearch").addEventListener("submit", e => { e.preventDefault(); showToast($("#cameraPerson").value ? `Tracking ${$("#cameraPerson").value}` : "Showing all tracked employees"); });
}
function cameraFeed() {
  return `<div class="camera-feed">${noFootage()}</div>`;
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
      <aside class="panel"><div class="employee" style="margin-bottom:18px"><span class="avatar">AH</span><span><strong>Aiman Hakim</strong><small>EMP-1042 &middot; Assembly</small></span>${badge("On site")}</div>
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
      ${movementRecords.map(record => `<tr><td><strong>${record.time}</strong><br><span class="mono">05 Oct 2026</span></td><td><div class="employee"><span class="avatar">AH</span><span><strong>${record.employee}</strong><small>${record.employeeId}</small></span></div></td><td><div class="movement-path"><span>${record.from}</span>${icon("arrow_forward")}<strong>${record.to}</strong></div></td><td class="mono">${record.camera}</td><td class="mono">${record.duration}</td><td><span class="confidence"><i style="--score:${record.confidence}%"></i><b>${record.confidence}%</b></span></td><td>${record.event}</td><td>${badge(record.status)}</td><td><button class="button small evidence-button" data-movement-id="${record.id}">${icon("smart_display")} View</button></td></tr>`).join("")}
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
  $("#modalContent").innerHTML = `<div class="modal-inner"><div class="modal-title-row"><span class="monitor-icon">${icon(isAbsence ? "person_off" : "smartphone")}</span><div><span class="status-label">Case ${record.id}-${record.time.replaceAll(":","")}</span><h2 id="modalTitle">${record.type}</h2><p>${record.name} &middot; ${record.id}</p></div></div>
    <div class="detail-grid"><div class="evidence">${noFootage()}</div>
      <div class="detail-stack"><div class="detail-block"><h3>Incident details</h3><div class="detail-list"><div><small>Employee</small><strong>${record.name}</strong></div><div><small>Department</small><strong>${record.dept}</strong></div><div><small>Location</small><strong>${record.location}</strong></div><div><small>Camera</small><strong>${record.camera}</strong></div><div><small>${isAbsence ? "Duration" : "AI confidence"}</small><strong>${isAbsence ? record.duration : record.confidence + "%"}</strong></div><div><small>Severity</small><strong>${badge(record.severity)}</strong></div></div></div>
      <div class="detail-block"><h3>Case status</h3>${badge(record.status)}</div><textarea class="field notes" placeholder="Add supervisor notes..."></textarea></div></div>
    <div class="modal-actions"><button class="button primary" data-case-action="Confirmed violation">${icon("gavel")} Confirm violation</button><button class="button" data-case-action="Marked as false detection">${icon("close")} False detection</button><button class="button" data-case-action="Case resolved">${icon("task_alt")} Resolve case</button><button class="button" data-case-action="Report exported">${icon("download")} Export report</button></div></div>`;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $$('[data-case-action]').forEach(btn => btn.addEventListener('click', () => showToast(btn.dataset.caseAction)));
}
function closeModal() { $("#modalBackdrop").hidden = true; document.body.style.overflow = ""; }

function navigate(page) {
  currentPage = pageMeta[page] ? page : "overview";
  $("#headerTitle").textContent = pageMeta[currentPage];
  $$(".nav-link[data-page]").forEach(link => link.classList.toggle("active", link.dataset.page === currentPage));
  if (currentPage === "overview") renderOverview();
  if (currentPage === "phone" || currentPage === "absence") renderDetection(currentPage);
  if (currentPage === "camera") renderCamera();
  if (currentPage === "route") renderRoute();
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
navigate(location.hash.slice(1) || "overview");
