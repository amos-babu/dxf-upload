<?php

test('example', function () {
    $response = $this->get('/files');

    $response->assertStatus(200);
});
