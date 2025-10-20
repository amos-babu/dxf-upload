<?php

use App\Models\Post;
use App\Models\User;
use App\Enums\Categories;
use Illuminate\Http\UploadedFile;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('files url displays', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('authenticated user can upload files', function () {

    Storage::fake('public');
    Storage::fake('private');

    $user = User::factory()->create();
    $this->actingAs($user);

    $file = UploadedFile::fake()->create('design.dxf', 1000, 'application/dxf');
    $image = UploadedFile::fake()->image('design.png');

    $this->post('/posts', [
        'name' => 'Test Design',
        'description' => 'A test design file',
        'category' => Categories::KNOCKOUTS->value,
        'dxf_file' => $file,
        'image' => $image,
    ])->assertRedirect('/');

    $post = Post::where('name', 'Test Design')->first();
    $this->assertCount(1, $post->getMedia('dxf-files'));
    $this->assertCount(1, $post->getMedia('dxf-images'));

    $this->assertDatabaseHas('posts', ['name' => 'Test Design']);

    // Storage::disk('private')->assertExists(
    //     $post->getFirstMediaPath('dxf-files')
    // );
});

// test('guest user cannot upload files', function () {});

// test('guest users see files', function () {});

// test('guest users can download images', function () {});

// test('guest users cannot download files', function () {});
