<?php namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class HasCompetitionTrait
 * @package App
 */
trait HasCompetitionTrait
{
    /**
     * @return BelongsTo
     */
    public function competition()
    {
        return $this->belongsTo(Competition::class, 'competition_id', 'id');
    }
}