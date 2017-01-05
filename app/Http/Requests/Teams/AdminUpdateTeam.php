<?php namespace App\Http\Requests\Teams;

use App\Http\Requests\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class AdminUpdateTeam
 * @package App\Http\Requests\Teams
 */
class AdminUpdateTeam extends FormRequest
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
            'name' => [
                'required',
                'max:255',
                Rule::unique('teams', 'name')->ignore($this->get('id'))
            ],
            'short' => [
                'required',
                'max:15',
                Rule::unique('teams', 'short')->ignore($this->get('id'))
            ]
        ];
    }
}