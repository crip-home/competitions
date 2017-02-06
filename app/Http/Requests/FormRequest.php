<?php namespace App\Http\Requests;

use App\Role;
use Auth;
use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;

/**
 * Class FormRequest
 * @package App\Http\Requests
 */
class FormRequest extends LaravelFormRequest
{
    /**
     * Validate the class instance.
     * @return void
     */
    public function validate()
    {
        $instance = $this->getValidatorInstance();
        if (method_exists($this, 'after')) {
            $instance->after([$this, 'after']);
        }
        if (!$this->passesAuthorization()) {
            $this->failedAuthorization();
        } elseif (!$instance->passes()) {
            $this->failedValidation($instance);
        }
    }
}