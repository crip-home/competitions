<?php namespace App\Http\Requests\Files;

use App\Http\Requests\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class FileUploadRequest
 * @package App\Http\Requests\Files
 */
class FileUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return \Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => [
                'required',
                'image',
                'max:2000',
                'mimes:jpeg,bmp,png'
            ]
        ];
    }
}