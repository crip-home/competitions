<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Message
 * @package App
 */
class Message extends Model
{
    use HasAuditTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body',             // text
        'created_by',       // int(10) UNSIGNED
        'created_by_name',  // varchar(255)
        'from_id',          // int(10) UNSIGNED
        'from_name',        // varchar(255)
        'importance_level', // smallint(5) 10
        'is_read',          // tinyint(1) 0
        'subject',          // varchar(255)
        'to_id',            // int(10) UNSIGNED
        'to_name',          // varchar(255)
        'type',             // varchar(20)
        'updated_by',       // int(10) UNSIGNED NULL
        'updated_by_name',  // varchar(255) ''
    ];

    /**
     * @return BelongsTo
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'from_id', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function recipient()
    {
        return $this->belongsTo(User::class, 'to_id', 'id');
    }
}
