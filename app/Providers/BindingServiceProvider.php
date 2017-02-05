<?php namespace App\Providers;

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
        $this->app->bind(\App\Contracts\IMessageRepository::class, \App\Repositories\MessageRepository::class);
        $this->app->bind(\App\Contracts\IPostRepository::class, \App\Repositories\PostRepository::class);
        $this->app->bind(\App\Contracts\IUserRepository::class, \App\Repositories\UserRepository::class);
        $this->app->bind(\App\Contracts\ITeamRepository::class, \App\Repositories\TeamRepository::class);
        $this->app->bind(\App\Contracts\ITeamMemberRepository::class, \App\Repositories\TeamMemberRepository::class);
        $this->app->bind(\App\Contracts\IFileRepository::class, \App\Repositories\FileRepository::class);
    }
}