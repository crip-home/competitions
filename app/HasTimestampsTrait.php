<?php namespace App;

/**
 * Class HasTimestampsTrait
 * @package App
 */
trait HasTimestampsTrait
{
    /**
     * Use in $appends array as 'created_from_now'
     * @return string
     */
    public function getCreatedFromNowAttribute()
    {
        if (array_key_exists('created_at', $this->attributes)) {
            return $this->created_at->diffForHumans();
        }

        return '';
    }
}