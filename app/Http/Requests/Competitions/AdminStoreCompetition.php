<?php namespace App\Http\Requests\Competitions;

use App\Http\Requests\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class AdminStoreCompetition
 * @package App\Http\Requests\Competitions
 */
class AdminStoreCompetition extends FormRequest
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
            'ambulance' => '',
            'cooperation' => '',
            'equipment' => '',
            'invitation' => '',
            'judge_id' => [
                Rule::exists('users', 'id'),
            ],
            'organization_date' => ['required', 'date'],
            'price' => '',
            'prizes' => '',
            'program' => '',
            'registration_till' => ['required', 'date'],
            'rules' => '',
            'subtitle' => ['required', 'max:255'],
            'title' => [
                'required', 'max:255', Rule::unique('competitions', 'title')
            ],
        ];
    }
}