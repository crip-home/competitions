<?php namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 * @package App
 */
class Post extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     * 'state', ['PUBLISHED', 'DRAFT', 'PENDING', 'TRASH', 'PRIVATE']
     * @var array
     */
    protected $fillable = [
        'title', 'body', 'image', 'state', 'publish_at', 'author_id'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'publish_at'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'date_from_now',
        'short_body'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    /**
     * @return string
     */
    public function getDateFromNowAttribute()
    {
        return $this->publish_at->diffForHumans();
    }

    /**
     * @return string
     */
    public function getShortBodyAttribute()
    {
        return str_limit(strip_tags($this->attributes['body']), 500);
    }
}