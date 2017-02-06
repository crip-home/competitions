<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class CategoryGroup
 * @package App
 */
class CategoryGroup extends Model
{
    use HasCompetitionTrait, HasAuditTrait;

    /**
     * The table associated with the model.
     * @var string
     */
    protected $table = 'category_groups';

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'competition_id',   // int(10) UNSIGNED
        'created_by',       // int(10) UNSIGNED
        'created_by_name',  // varchar(255)
        'discipline_id',    // int(10) UNSIGNED
        'discipline_short', // varchar(255)
        'discipline_title', // varchar(255)
        'short',            // varchar(15)
        'title',            // varchar(255)
        'updated_by',       // int(10) UNSIGNED
        'updated_by_name',  // varchar(255)
    ];

    /**
     * @return BelongsTo
     */
    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'discipline_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function categories()
    {
        return $this->hasMany(Category::class, 'category_id', 'id');
    }
}
