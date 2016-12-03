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
     * @var array
     */
    protected $roles;

    /**
     * Validate the class instance.
     *
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

    /**
     * @return bool
     */
    public function checkAuth()
    {
        if (!\Auth::check())
            return false;

        $this->roles = Auth::user()->roles;

        return true;
    }

    /**
     * @param array $roles
     * @return bool
     */
    public function hasAny($roles = [])
    {
        foreach ($roles as $role)
            if ($this->hasRole($role))
                return true;

        return false;
    }

    /**
     * @param string $role
     * @return bool
     */
    public function hasRole($role)
    {
        if (in_array($role, $this->roles))
            return true;

        return false;
    }
}