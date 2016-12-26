<?php namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class HasAuditTrait
 * @package App
 */
trait HasAuditTrait
{
    /**
     * @return BelongsTo
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function modifier()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}