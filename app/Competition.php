<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Competition
 * @package App
 */
class Competition extends Model
{
    use HasAuditTrait;

    /**
     * The table associated with the model.
     * @var string
     */
    protected $table = 'competitions';

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'ambulance',         // longtext
        'cooperation',       // longtext
        'created_by',        // int(10) UNSIGNED
        'created_by_name',   // varchar(255)
        'equipment',         // longtext
        'invitation',        // longtext
        'judge_id',          // int(10) UNSIGNED NULL
        'judge_name',        // varchar(255)
        'organization_date', // timestamp NULL
        'price',             // longtext
        'prizes',            // longtext
        'program',           // longtext
        'registration_till', // timestamp NULL
        'rules',             // longtext
        'subtitle',          // varchar(255)
        'title',             // varchar(255)
        'updated_by',        // int(10) UNSIGNED
        'updated_by_name',   // varchar(255)
    ];

    /**
     * @return BelongsTo
     */
    public function judge()
    {
        return $this->belongsTo(User::class, 'judge_id', 'id');
    }

    /**
     * @return BelongsToMany
     */
    public function managers()
    {
        return $this->belongsToMany(
            User::class, 'competition_managers', 'competition_id', 'user_id'
        )->withTimestamps();
    }
}
