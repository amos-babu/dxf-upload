<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->getFirstMediaUrl('dxf-images', 'preview'),
            'dxfFile' => $this->getFirstMediaUrl('dxf-files'),
            'createdAt' => $this->created_at
                ? Carbon::parse($this->created_at)->diffForHumans()
                : null,
            'isFavorite' => $request->user()
               ? $this->isFavorite
               : null,
        ];
    }
}
