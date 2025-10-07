<?php

namespace App\Http\Requests;

use App\Enums\Categories;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FileUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
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
