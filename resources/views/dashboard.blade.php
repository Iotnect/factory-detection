<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Iotnect factory activity monitoring dashboard">
  <title>Iotnect - Factory Monitoring</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@600;700;800&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..600,0..1,0&display=swap" rel="stylesheet">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body data-username="{{ session('demo_username', config('demo.username', 'User')) }}">
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <a class="brand" href="#overview" aria-label="Iotnect dashboard">
        <span class="brand-mark"><span class="material-symbols-rounded">security</span></span>
        <span><strong>Iotnect</strong></span>
      </a>

      <nav class="nav" aria-label="Primary navigation">
        <p class="nav-label">Workspace</p>
        <a class="nav-link active" href="#overview" data-page="overview"><span class="material-symbols-rounded">space_dashboard</span><span>Overview</span></a>
        <p class="nav-label">Monitoring</p>
        <a class="nav-link" href="{{ route('modules.mobile-phone-usage') }}" data-page="phone" aria-label="Mobile Phone Usage Detection"><span class="material-symbols-rounded">phonelink_erase</span><span>Phone Usage</span><b class="nav-count">12</b></a>
        <a class="nav-link" href="{{ route('modules.leave-post-absence') }}" data-page="absence" aria-label="Leave Post and Absence Detection"><span class="material-symbols-rounded">person_off</span><span>Post & Absence</span><b class="nav-count amber">8</b></a>
        <a class="nav-link" href="{{ route('modules.camera-tracking') }}" data-page="camera" aria-label="Camera Tracking"><span class="material-symbols-rounded">videocam</span><span>Camera Tracking</span></a>
        <a class="nav-link" href="{{ route('modules.floorplan-route-tracking') }}" data-page="route" aria-label="Floorplan Route Tracking"><span class="material-symbols-rounded">route</span><span>Route Tracking</span></a>
        <p class="nav-label">Management</p>
        <button class="nav-link" data-toast="Reports are ready for export"><span class="material-symbols-rounded">analytics</span><span>Reports</span></button>
        <button class="nav-link" data-toast="Settings panel opened"><span class="material-symbols-rounded">settings</span><span>Settings</span></button>
      </nav>

      <div class="system-card">
        <div class="system-card__head"><span>System health</span><span class="live-dot"></span></div>
        <strong>All systems operational</strong>
        <div class="health-bar"><i></i></div>
        <small>24 of 25 cameras online</small>
      </div>

      <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button class="profile-mini" type="submit" title="Log out">
          <span class="avatar">AN</span>
          <span><strong>Aina Noor</strong><small>Safety Supervisor</small></span>
          <span class="material-symbols-rounded">logout</span>
        </button>
      </form>
    </aside>

    <div class="workspace">
      <header class="topbar">
        <button class="icon-button mobile-menu" id="menuToggle" aria-label="Toggle menu"><span class="material-symbols-rounded">menu</span></button>
        <div class="topbar-title"><span class="eyebrow">Plant 01 &middot; Shah Alam</span><strong id="headerTitle">Command overview</strong></div>
        <div class="topbar-actions">
          <div class="shift-chip"><span class="live-dot"></span><span><small>Current shift</small><strong>Morning &middot; 07:00&ndash;15:00</strong></span></div>
          <button class="icon-button notification-button" data-toast="You have 5 unread alerts" aria-label="Notifications"><span class="material-symbols-rounded">notifications</span><i>5</i></button>
          <span class="date-chip" id="currentDate"></span>
        </div>
      </header>

      <main id="app" tabindex="-1"></main>
    </div>
  </div>

  <div class="modal-backdrop" id="modalBackdrop" hidden>
    <section class="incident-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal-close icon-button" id="modalClose" aria-label="Close details"><span class="material-symbols-rounded">close</span></button>
      <div id="modalContent"></div>
    </section>
  </div>

  <div class="toast" id="toast" role="status"><span class="material-symbols-rounded">check_circle</span><span id="toastText">Action completed</span></div>
</body>
</html>
