<?php

use App\Models\Post;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('files url displays', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

// test('shows multiple files for users', function () {
//     $user = User::factory()->create();
//     $files = Post::factory()->count(3)->for($user)->create();
//     dd($files);

//     $this->actingAs($user)
//         ->get(route('files.index'))
//         ->assertOk()
//         ->assertSee($files[0]->name);
// });

// test('authenticated user can upload files', function () {});

// test('guest user cannot upload files', function () {});

// test('guest users see files', function () {});

// test('guest users can download images', function () {});

// test('guest users cannot download files', function () {});
