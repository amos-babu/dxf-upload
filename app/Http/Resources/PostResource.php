<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'image' => $this->getFirstMediaUrl('dxf-images', 'thumb'),
            'dxf_file' => $this->getFirstMediaUrl('dxf-files'),
        ];
        // 'image' => url(Storage::url($this->image)),
        // 'dxfFile' => url(Storage::url($this->dxf_file)),
    }
}
