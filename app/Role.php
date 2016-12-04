<?php namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 * @package App
 */
class Role extends Model
{
    // Can do any action in system
    const SUPER_ADMIN = 'SUPER_ADMIN';

    // Can create/manage own posts
    const CREATE_POST = 'CREATE_POST';
    // Can manage other user posts
    const MANAGE_POSTS = 'MANAGE_POSTS';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user', 'role_id', 'user-id')->withTimestamps();
    }
}