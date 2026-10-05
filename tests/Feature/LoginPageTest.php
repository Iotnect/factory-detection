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
}
