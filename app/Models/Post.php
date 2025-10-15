<?php

namespace App\Models;

use App\Enums\Categories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;
use Spatie\Image\Enums\Fit;
// use Spatie\MediaLibrary\Conversions\Manipulations;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Post extends Model implements HasMedia
{
    use InteractsWithMedia, Searchable;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'category',
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

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('dxf-images')
            ->useDisk('public');

        $this
            ->addMediaCollection('dxf-files')
            ->useDisk('private');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->fit(Fit::Contain, 600, 600)
            ->performOnCollections('dxf-images')
            ->nonQueued();

        $this
            ->addMediaConversion('medium')
            ->fit(Fit::Contain, 1200, 1200)
            ->performOnCollections('dxf-images');

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
