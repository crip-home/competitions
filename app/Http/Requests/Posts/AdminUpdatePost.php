<?php namespace App\Http\Requests\Posts;

use App\Http\Requests\FormRequest;

/**
 * Class AdminUpdatePost
 * @package App\Http\Requests\Posts
 */
class AdminUpdatePost extends FormRequest
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
        return app(AdminStorePost::class)->rules();
    }
}