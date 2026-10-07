<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class DashboardNavigationTest extends TestCase
{
    public function test_unauthenticated_user_is_redirected_from_dashboard(): void
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirectToRoute('login');
    }

    public function test_dashboard_renders_links_to_all_detection_modules(): void
    {
        $response = $this
            ->withSession(['demo_authenticated' => true])
            ->get(route('dashboard'));

        $response->assertViewIs('dashboard')
            ->assertSee('Mobile Phone Usage Detection')
            ->assertSee(route('modules.mobile-phone-usage'), false)
            ->assertSee('Leave Post and Absence Detection')
            ->assertSee(route('modules.leave-post-absence'), false)
            ->assertSee('Camera Tracking')
            ->assertSee(route('modules.camera-tracking'), false)
            ->assertSee('Floorplan Route Tracking')
            ->assertSee(route('modules.floorplan-route-tracking'), false)
            ->assertSee('href="#reports"', false)
            ->assertSee('data-page="reports"', false)
            ->assertSee('href="#settings"', false)
            ->assertSee('data-page="settings"', false);
    }

    public function test_dashboard_receives_the_authenticated_username(): void
    {
        $response = $this
            ->withSession([
                'demo_authenticated' => true,
                'demo_username' => 'line.supervisor',
            ])
            ->get(route('dashboard'));

        $response->assertOk()
            ->assertSee('data-username="line.supervisor"', false);
    }

    #[DataProvider('moduleRoutes')]
    public function test_authenticated_user_can_open_each_module_page(string $routeName, string $title): void
    {
        $response = $this
            ->withSession(['demo_authenticated' => true])
            ->get(route($routeName));

        $response->assertViewIs('modules.show')
            ->assertSee($title);
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function moduleRoutes(): array
    {
        return [
            'mobile phone usage' => ['modules.mobile-phone-usage', 'Mobile Phone Usage Detection'],
            'leave post and absence' => ['modules.leave-post-absence', 'Leave Post and Absence Detection'],
            'camera tracking' => ['modules.camera-tracking', 'Camera Tracking'],
            'floorplan route tracking' => ['modules.floorplan-route-tracking', 'Floorplan Route Tracking'],
        ];
    }
}
