<?php namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 * @package App
 */
class Post extends Model
{

    const STATE_DRAFT = 'DRAFT';
    const STATE_PENDING = 'PENDING';
    const STATE_PRIVATE = 'PRIVATE';
    const STATE_PUBLISHED = 'PUBLISHED';
    const STATE_TRASH = 'TRASH';

    const STATES = [
        Post::STATE_DRAFT,
        Post::STATE_PENDING,
        Post::STATE_PRIVATE,
        Post::STATE_PUBLISHED,
        Post::STATE_TRASH,
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'title', 'body', 'image', 'state', 'publish_at', 'author_id', 'locale'
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
        if (array_key_exists('body', $this->attributes))
            return str_limit(strip_tags($this->attributes['body']), 500);

        return '';
    }
}