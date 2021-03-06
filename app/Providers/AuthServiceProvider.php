<?php namespace App\Providers;

use App\Competition;
use App\Policies\CompetitionPolicy;
use App\Policies\PostPolicy;
use App\Policies\TeamMemberPolicy;
use App\Policies\TeamPolicy;
use App\Post;
use App\Team;
use App\TeamMember;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

/**
 * Class AuthServiceProvider
 * @package App\Providers
 */
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     * @var array
     */
    protected $policies = [
        Post::class => PostPolicy::class,
        Team::class => TeamPolicy::class,
        TeamMember::class => TeamMemberPolicy::class,
        Competition::class => CompetitionPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
