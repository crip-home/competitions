<?php namespace App;

use Auth;
use Illuminate\Database\Eloquent\Model;
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
     * The "booting" method of the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        // Register a creating model event with the dispatcher.
        static::creating(function ($table) {
            $table->created_by = Auth::user()->id;
            $table->created_by_name = Auth::user()->name;
        });

        // Register an updating model event with the dispatcher.
        static::updating(function ($table) {
            $table->updated_by = Auth::user()->id;
            $table->updated_by_name = Auth::user()->name;
        });
    }

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

}
