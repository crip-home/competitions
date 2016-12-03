<?php namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 * @package App
 */
class Role extends Model
{

    const SUPER_ADMIN = 'SUPER_ADMIN';
    const CREATE_POST = 'CREATE_POST';
    const EDIT_POSTS = 'EDIT_POSTS';

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