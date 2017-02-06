<?php namespace App\Http\Requests\Teams;

use App\Http\Requests\FormRequest;
use Illuminate\Validation\Rule;
use Route;

/**
 * Class AdminStoreMember
 * @package App\Http\Requests\Teams
 */
class AdminStoreMember extends FormRequest
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
            'name' => [
                'required',
                'max:255'
            ],
            'user_id' => [
                Rule::exists('users', 'id'),
                Rule::unique('team_members', 'user_id')
                    ->where('team_id', Route::current()->parameters()['team'])
            ]
        ];
    }

}