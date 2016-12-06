<?php namespace App\Policies;

use App\Policies\Traits\HandlesUserRoles;
use App\Role;
use App\User;
use App\Post;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class PostPolicy
 * @package App\Policies
 */
class PostPolicy
{
    use HandlesAuthorization, HandlesUserRoles;

    /**
     * Determine whether the user can view the post.
     *
     * @param  \App\User $user
     * @param  \App\Post $post
     * @return bool
     */
    public function view(User $user, Post $post)
    {
        $roles = $this->roles($user);

        // if user can manage posts, he can view any of posts
        if ($this->hasRole($roles, Role::MANAGE_POSTS))
            return true;

        // if user cant create post, he cant view any of them
        if (!$this->hasRole($roles, Role::CREATE_POST))
            return false;

        // if user has CREATE_POST and he is author of this post, he can view it
        if ($user->id == $post->author_id)
            return true;

        return false;
    }

    /**
     * Determine whether the user can view list of posts.
     *
     * @param  \App\User $user
     * @return bool
     */
    public function viewList(User $user)
    {
        $roles = $this->roles($user);

        // if user can manage posts or cant create post, he cal see list
        if ($this->hasAnyRole($roles, [Role::MANAGE_POSTS, Role::CREATE_POST]))
            return true;

        return false;
    }

    /**
     * Determine whether the user can create posts.
     *
     * @param  \App\User $user
     * @return bool
     */
    public function create(User $user)
    {
        $roles = $this->roles($user);

        // if user can manage posts or cant create post
        if ($this->hasAnyRole($roles, [Role::MANAGE_POSTS, Role::CREATE_POST]))
            return true;

        return false;
    }

    /**
     * Determine whether the user can update the post.
     *
     * @param  \App\User $user
     * @param  \App\Post $post
     * @return bool
     */
    public function update(User $user, Post $post)
    {
        $roles = $this->roles($user);

        // if user can manage posts, he can update any of posts
        if ($this->hasRole($roles, Role::MANAGE_POSTS))
            return true;

        // if user cant create post, he cant update any of them
        if (!$this->hasRole($roles, Role::CREATE_POST))
            return false;

        // if user has CREATE_POST and he is author of this post, he can update it
        if ($user->id == $post->author_id)
            return true;

        return false;
    }

    /**
     * Determine whether the user can delete the post.
     *
     * @param  \App\User $user
     * @param  \App\Post $post
     * @return bool
     */
    public function delete(User $user, Post $post)
    {
        return false;
    }
}
