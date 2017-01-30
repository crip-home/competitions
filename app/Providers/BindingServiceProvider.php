<?php namespace App\Providers;

use App\Post;
use App\Repositories\IPostRepository;
use App\Repositories\IUserRepository;
use App\Repositories\PostRepository;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Support\ServiceProvider;

/**
 * Class BindingServiceProvider
 * @package App\Providers
 */
class BindingServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}