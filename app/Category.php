<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Category
 * @package App
 */
class Category extends Model
{
    use HasAuditTrait, HasCompetitionTrait;

    /**
     * The table associated with the model.
     * @var string
     */
    protected $table = 'categories';

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'area_id',              // int(10) UNSIGNED
        'category_group_id',    // int(10) UNSIGNED
        'category_group_short', // varchar(255)
        'category_group_title', // varchar(255)
        'competition_id',       // int(10) UNSIGNED
        'created_by',           // int(10) UNSIGNED
        'created_by_name',      // varchar(255)
        'discipline_id',        // int(10) UNSIGNED
        'discipline_short',     // varchar(255)
        'discipline_title',     // varchar(255)
        'order',                // int(10) UNSIGNED
        'short',                // varchar(15)
        'title',                // varchar(255)
        'updated_by',           // int(10) UNSIGNED
        'updated_by_name',      // varchar(255)
    ];

    /**
     * @return BelongsTo
     */
    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function category_group()
    {
        return $this->belongsTo(CategoryGroup::class, 'category_group_id', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function discipline()
    {
        return $this->belongsTo(Discipline::class, 'discipline_id', 'id');
    }
}
