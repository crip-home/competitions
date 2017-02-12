<?php namespace App\Repositories;

use App\Competition;
use App\Contracts\ICompetitionRepository;
use Illuminate\Support\Facades\Auth;

/**
 * Class CompetitionRepository
 * @package App\Repositories
 */
class CompetitionRepository extends PaginationRepository implements ICompetitionRepository
{
    /**
     * @var Auth
     */
    private $auth;

    /**
     * CompetitionRepository constructor.
     * @param Auth $auth
     */
    public function __construct(Auth $auth)
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
        $this->query = $this->getQuery()->where('created_by', $this->auth->id);

        return $this;
    }
}