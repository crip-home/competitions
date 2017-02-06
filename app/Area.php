<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Area
 * @package App
 */
class Area extends Model
{
    use HasAuditTrait, HasCompetitionTrait;

    /**
     * The table associated with the model.
     * @var string
     */
    protected $table = 'areas';

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'competition_id',  // int(10) UNSIGNED
        'created_by',      // int(10) UNSIGNED
        'created_by_name', // varchar(255)
        'description',     // text NULL
        'nr',              // int(10) NULL
        'title',           // varchar(255)
        'type',            // varchar(255)
        'updated_by',      // int(10) UNSIGNED
        'updated_by_name', // varchar(255)
    ];

    /**
     * @return HasMany
     */
    public function categories()
    {
        return $this->hasMany(Category::class, 'area_id', 'id');
    }
}
