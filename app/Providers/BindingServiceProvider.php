<?php namespace App\Providers;

use App\Contracts\IMessageRepository;
use App\Contracts\IPostRepository;
use App\Contracts\IUserRepository;
use App\Repositories\MessageRepository;
use App\Repositories\PostRepository;
use App\Repositories\UserRepository;
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
        $this->app->bind(IMessageRepository::class, MessageRepository::class);
        $this->app->bind(IPostRepository::class, PostRepository::class);
        $this->app->bind(IUserRepository::class, UserRepository::class);
    }
}