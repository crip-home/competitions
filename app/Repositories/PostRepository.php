<?php namespace App\Repositories;

use App\Post;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class PostRepository
 * @package App\Repositories
 */
class PostRepository extends PaginationRepository
{
    /**
     * Get current repository full model class name
     *
     * @return string
     */
    function modelClass()
    {
        return Post::class;
    }

    /**
     * Filter only published posts
     *
     * @return $this
     */
    public function onlyPublished()
    {
        $this->query = $this->getQuery()
            ->where('state', Post::STATE_PUBLISHED)
            ->whereRaw('publish_at <= CURDATE()');

        return $this;
    }

    /**
     * Filter only where in list of locales
     *
     * @param array $locales
     *
     * @return $this
     */
    public function scopeLocales(array $locales = [])
    {
        if (count($locales) > 0) {
            $this->query = $this->getQuery()->whereIn('locale', $locales);
        }

        return $this;
    }

    /**
     * Join author entity ro querable
     *
     * @return $this
     */
    public function withAuthor()
    {
        $this->query = $this->getQuery()->with(['author' => function (BelongsTo $query) {
            $query->getQuery()->select(['id', 'name']);
        }]);

        return $this;
    }
}