<?php namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * @package App
 */
class User extends Authenticatable
{
    use Notifiable, HasTimestampsTrait;

    /**
     * The table associated with the model.
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
        'password',
        'email',
        'remember_token',
    ];

    /**
     * The attributes that should be mutated to dates.
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    /**
     * The accessors to append to the model's array form.
     * @var array
     */
    protected $appends = [
        'md5',
        'created_from_now'
    ];

    /**
     * @return HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'author_id', 'id');
    }

    /**
     * @return BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(
            Role::class, 'role_user', 'user_id', 'role_id'
        )->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function teams()
    {
        return $this->belongsToMany(
            Team::class, 'team_members', 'user_id', 'team_id'
        )->wherePivot('membership_type', TeamMember::MEMBER);
    }

    /**
     * @param  string $role
     * @return bool
     */
    public function hasRole(string $role): bool
    {
        $roles = $this->roles->map(function ($role) {
            return $role->key;
        })->toArray();

        // Allow super admin do anything
        if (in_array(Role::SUPER_ADMIN, $roles))
            return true;

        return in_array($role, $roles);
    }

    /**
     * Encode user email in md5
     * @return string
     */
    public function getMd5Attribute(): string
    {
        if (array_key_exists('email', $this->attributes)) {
            return md5($this->attributes['email']);
        }

        return '';
    }
}
