<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class TeamMember
 * @package App
 */
class TeamMember extends Model
{
    use HasAuditTrait;

    const INVITED = 'invited';
    const MEMBER = 'member';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'team_members';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'created_by',      // int(10) UNSIGNED
        'created_by_name', // varchar(255)
        'membership_type', // varchar(255)
        'name',            // varchar(255)
        'team_id',         // int(10) UNSIGNED
        'updated_by',      // int(10) UNSIGNED NULL
        'updated_by_name', // varchar(255) ''
        'user_id',         // int(10) UNSIGNED NULL
    ];

    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id', 'id');
    }
}
