<?php

namespace App\Http\Requests;

use App\Enums\Categories;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,bmp', 'max:2048'],
            'category' => ['required', Rule::enum(Categories::class)],
            'dxf_file' => [
                'required',
                'file',
                'max:10240',
                function ($attribute, $value, $fail) {
                    if (strtolower($value->getClientOriginalExtension()) !== 'dxf') {
                        $fail('The '.$attribute.' must be a DXF file.');
                    }
                },
            ],
        ];
    }
}
