<?php

namespace App\Models;

use App\Enums\Categories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class File extends Model
{
    use Searchable;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'image',
        'category',
        'dxf_file',
    ];

    protected function casts(): array
    {
        return [
            'category' => Categories::class,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'category' => $this->category,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
