<?php namespace App\Http\Middleware;

use App\Role;
use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

/**
 * Class RegisterUserStorageFolder
 * @package App\Http\Middleware
 */
class RegisterUserStorageFolder
{
    /**
     * Handle an incoming request.
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string|null $guard
     * @return mixed
     * @throws AuthorizationException
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (!Auth::guard($guard)->check()) {
            throw new AuthorizationException();
        }

        if (!Auth::user()->hasRole(Role::SUPER_ADMIN)) {
            Config::set('cripfilesys.user_folder', Auth::id());
        }

        return $next($request);
    }
}
