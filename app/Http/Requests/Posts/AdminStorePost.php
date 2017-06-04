<?php namespace App\Http\Requests\Posts;

use App\Http\Requests\FormRequest;
use App\Post;

/**
 * Class StorePost
 * @package App\Http\Requests\Posts
 */
class AdminStorePost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @return bool
     */
    public function authorize()
    {
        return \Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|min:3|max:255',
            'body' => 'required',
            'image' => 'required|max:1000',
            'state' => 'required|in:' . join(',', Post::STATES),
            'publish_at' => 'required|date',
            'locale' => 'required|max:2|min:2'
        ];
    }
}
