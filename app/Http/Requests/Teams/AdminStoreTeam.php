<?php namespace App\Http\Requests\Teams;

use App\Http\Requests\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class AdminStoreTeam
 * @package App\Http\Requests\Teams
 */
class AdminStoreTeam extends FormRequest
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
                Rule::unique('teams', 'name')
            ],
            'short' => [
                'required',
                'max:15',
                Rule::unique('teams', 'short')
            ],
            'logo_id' => [
                Rule::exists('files', 'id')
            ]
        ];
    }
}