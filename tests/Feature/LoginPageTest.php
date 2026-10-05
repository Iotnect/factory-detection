<?php

namespace Tests\Feature;

use Tests\TestCase;

class LoginPageTest extends TestCase
{
    public function test_login_page_renders_the_credentials_form(): void
    {
        $response = $this->get('/');

        $response->assertViewIs('login')
            ->assertSee('Welcome back')
            ->assertSee('name="username"', false)
            ->assertSee('name="password"', false)
            ->assertSee('Sign in');
    }

    public function test_successful_login_stores_the_username_for_the_dashboard(): void
    {
        $response = $this->post(route('login.store'), [
            'username' => config('demo.username'),
            'password' => config('demo.password'),
        ]);

        $response->assertRedirectToRoute('dashboard')
            ->assertSessionHas('demo_authenticated', true)
            ->assertSessionHas('demo_username', config('demo.username'));
    }
}
