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

    const USER_MESSAGE = 'USER_MESSAGE';
    const TEAM_MEMBER_INVITATION = 'TEAM_MEMBER_INVITATION';

    /**
     * The table associated with the model.
     * @var string
     */
    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
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
        'reply',            // int(10) UNSIGNED
        'reply_count',      // smallint(5) UNSIGNED
        'subject',          // varchar(255)
        'to_id',            // int(10) UNSIGNED
        'to_name',          // varchar(255)
        'type',             // varchar(50)
        'updated_by',       // int(10) UNSIGNED NULL
        'updated_by_name',  // varchar(255) ''
        'payload',          // text
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
        'date_from_now'
    ];

    /**
     * The attributes that should be casted to native types.
     * @var array
     */
    protected $casts = [
        'payload' => 'array',
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

    /**
     * @return BelongsTo
     */
    public function replyOn()
    {
        return $this->belongsTo(Message::class, 'reply', 'id');
    }

    /**
     * @return string
     */
    public function getDateFromNowAttribute()
    {
        return $this->created_at->diffForHumans();
    }
}
