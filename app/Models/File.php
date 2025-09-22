<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

     public function orders(): HasMany {
        return $this->hasMany(Order::class);
    }
}
