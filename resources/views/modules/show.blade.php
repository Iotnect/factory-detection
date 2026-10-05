<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $title }} | {{ config('app.name', 'Laravel') }}</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="min-h-dvh bg-slate-100 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
        <main class="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-10 px-5 py-8 sm:px-8 sm:py-12">
            <nav class="flex items-center justify-between gap-4">
                <a class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900" href="{{ route('dashboard') }}">
                    <span aria-hidden="true">&larr;</span>
                    Dashboard
                </a>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <button class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:text-slate-400" type="submit">
                        Log keluar
                    </button>
                </form>
            </nav>

            <section class="flex flex-1 items-center justify-center">
                <div class="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-300/20 sm:p-14 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
                    <div class="mx-auto flex max-w-2xl flex-col items-center gap-5">
                        <span class="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">Module Page</span>
                        <h1 class="text-3xl font-bold tracking-tight sm:text-5xl">{{ $title }}</h1>
                        <p class="text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">{{ $description }}</p>
                        <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">Module content will be added here.</p>
                    </div>
                </div>
            </section>
        </main>
    </body>
</html>
