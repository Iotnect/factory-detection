<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class LoginController extends Controller
{
    public function create(): View
    {
        return view('login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $usernameMatches = hash_equals(
            (string) config('demo.username'),
            $credentials['username'],
        );

        $passwordMatches = hash_equals(
            (string) config('demo.password'),
            $credentials['password'],
        );

        if (! $usernameMatches || ! $passwordMatches) {
            return back()
                ->withErrors([
                    'username' => 'The username or password is incorrect.',
                ])
                ->onlyInput('username');
        }

        $request->session()->regenerate();
        $request->session()->put([
            'demo_authenticated' => true,
            'demo_username' => $credentials['username'],
        ]);

        return redirect()->route('dashboard');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
