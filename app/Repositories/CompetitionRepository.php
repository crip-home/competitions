<?php namespace App\Repositories;

use App\Competition;
use App\Contracts\ICompetitionRepository;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

/**
 * Class CompetitionRepository
 * @package App\Repositories
 */
class CompetitionRepository
    extends PaginationRepository
    implements ICompetitionRepository
{
    /**
     * @var Auth
     */
    private $auth;

    /**
     * CompetitionRepository constructor.
     * @param Auth $auth
     */
    public function __construct(Guard $auth)
    {
        parent::__construct();
        $this->auth = $auth;
    }

    /**
     * Get current repository full model class name
     * @return string
     */
    function modelClass()
    {
        return Competition::class;
    }

    /**
     * Filter owned or managed competitions
     * @return $this
     */
    public function filterOwnedOrManaged()
    {
        $userId = $this->auth->user()->id;

        $this->query = $this->getQuery()
            ->whereHas('managers', function (Builder $q) use ($userId) {
                $q->where('users.id', $userId);
            })
            ->orWhere('created_by', $userId)
            ->orWhere('judge_id', $userId);

        return $this;
    }
}