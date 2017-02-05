<?php namespace App;

use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Team
 * @package App
 */
class Team extends Model
{
    use HasAuditTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'teams';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'created_by',      // int(10) UNSIGNED
        'created_by_name', // varchar(255)
        'logo_id',         // int(10) UNSIGNED
        'name',            // varchar(255)
        'short',           // varchar(15)
        'updated_by',      // int(10) UNSIGNED
        'updated_by_name', // varchar(255)
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        '_credits'
    ];

    /**
     * @return HasMany
     */
    public function members()
    {
        return $this->hasMany(TeamMember::class, 'team_id', 'id');
    }

    /**
     * @return BelongsToMany
     */
    public function owners()
    {
        return $this->belongsToMany(User::class, 'team_owner', 'team_id', 'user_id')->withTimestamps();
    }

    /**
     * @return BelongsTo
     */
    public function logo()
    {
        return $this->belongsTo(File::class, 'logo_id', 'id');
    }
}
