<?php namespace App\Repositories;

use App\Contracts\IPostRepository;
use App\Post;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class PostRepository
 * @package App\Repositories
 */
class PostRepository extends PaginationRepository implements IPostRepository
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

    /**
     * Filter query by author id
     *
     * @param int $id Author identifier
     *
     * @return $this
     */
    public function filterByAuthor($id)
    {
        $this->query = $this->getQuery()->where('author_id', $id);

        return $this;
    }
}