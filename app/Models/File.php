<?php

namespace App\Models;

use App\Enums\Categories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class File extends Model implements HasMedia
{
    use InteractsWithMedia, Searchable;

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

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('dxf-images')
            ->useDisk('public');

        $this
            ->addMediaCollection('dxf-files2')
            ->useDisk('private');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->width(368)
            ->height(232)
            ->sharpen(10)
            ->nonQueued();

    }

    public function getPath(Media $media): string
    {
        return "{$media->collection_name}/{$media->model->id}";
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
