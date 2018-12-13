<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

use App\Policies\PostPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\UserPolicy;
use App\Policies\RolePolicy;
Use App\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::resource('post', PostPolicy::class);
        Gate::resource('category', CategoryPolicy::class);
        Gate::resource('user', UserPolicy::class);
        Gate::resource('role', ROlePolicy::class);

        Gate::define('user.authorize', UserPolicy::class.'@authorize');
        Gate::define('statistical', function(User $user){
            return $user->hasPermission('statistical');
        });
    }
}
