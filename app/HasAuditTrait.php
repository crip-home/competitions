<?php namespace App;

use App;
use Auth;
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

    /**
     * The "booting" method of the model.
     */
    public static function boot()
    {
        parent::boot();

        // Register a creating model event with the dispatcher.
        static::creating(function ($table) {
            if (App::runningInConsole()) {
                $table->created_by = 1;
                $table->created_by_name = 'cli';
                return;
            }

            $table->created_by = Auth::user()->id;
            $table->created_by_name = Auth::user()->name;
        });

        // Register an updating model event with the dispatcher.
        static::updating(function ($table) {
            if (App::runningInConsole()) {
                $table->updated_by = 1;
                $table->updated_by_name = 'cli';
                return;
            }

            $table->updated_by = Auth::user()->id;
            $table->updated_by_name = Auth::user()->name;
        });
    }
}