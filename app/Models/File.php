<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class File extends Model
{
    protected $fillable = [
        "user_id",
        "name",
        "description",
        "image",
        "dxf_file"
    ];

    public function user(): HasMany {
        return $this->hasMany(User::class);
    }
}
