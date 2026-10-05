<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login | Iotnect</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@600;700;800&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..600,0..1,0&display=swap" rel="stylesheet">
    @vite('resources/css/app.css')
</head>
<body class="login-body">
    <main class="login-shell">
        <section class="login-card">
            <div class="login-logo-panel">
                <img src="{{ asset('images/iotnect-logo.png') }}" alt="Iotnect">
            </div>

            <div class="login-form-panel">

                <div class="login-form-heading login-form-heading--simple">
                    <h1>Welcome back</h1>
                    <p>Sign in to continue to your dashboard.</p>
                </div>

                <form method="POST" action="{{ route('login.store') }}" class="login-form">
                    @csrf

                    <label class="login-field" for="username">
                        <span>Username</span>
                        <span class="login-input-wrap">
                            <span class="material-symbols-rounded">person</span>
                            <input id="username" name="username" type="text" autocomplete="username" placeholder="Enter your username" value="{{ old('username') }}" required autofocus>
                        </span>
                    </label>

                    @error('username')
                        <p class="login-error"><span class="material-symbols-rounded">error</span>{{ $message }}</p>
                    @enderror

                    <label class="login-field" for="password">
                        <span>Password</span>
                        <span class="login-input-wrap">
                            <span class="material-symbols-rounded">lock</span>
                            <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required>
                            <button class="password-toggle" type="button" id="passwordToggle" aria-label="Show password"><span class="material-symbols-rounded">visibility</span></button>
                        </span>
                    </label>

                    <label class="remember-control"><input name="remember" type="checkbox"><span>Remember me</span></label>

                    <button class="login-submit" type="submit"><span>Sign in</span><span class="material-symbols-rounded">arrow_forward</span></button>
                </form>
            </div>
        </section>
    </main>

    <script>
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.getElementById('password');

        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.querySelector('.material-symbols-rounded').textContent = isPassword ? 'visibility_off' : 'visibility';
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    </script>
</body>
</html>
