<?php namespace App\Http\Requests\Posts;

use App\Http\Requests\FormRequest;
use App\Post;
use App\Role;

/**
 * Class StorePost
 * @package App\Http\Requests\Posts
 */
class StorePost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (!$this->checkAuth())
            return false;

        if ($this->hasAny([Role::SUPER_ADMIN, Role::CREATE_POST]))
            return true;

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'body' => 'required',
            'image' => 'required|url|max:1000',
            'state' => 'required|in:' . join(',', Post::STATES),
            'publish_at' => 'required|date',
            'locale' => 'required|max:2|min:2'
        ];
    }
}
