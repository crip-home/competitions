<?php namespace App\Http\Controllers;

use App\Contracts\ITeamRepository;
use Illuminate\Http\JsonResponse;

/**
 * Class TeamsController
 * @package App\Http\Controllers
 */
class TeamsController extends Controller
{
    /**
     * @var ITeamRepository
     */
    private $teams;

    /**
     * TeamsController constructor.
     * @param ITeamRepository $teams
     */
    public function __construct(ITeamRepository $teams)
    {
        $this->teams = $teams;
    }

    /**
     * GET    /api/teams/{team}
     * @param integer $teamId
     * @return JsonResponse
     */
    public function show($teamId)
    {
        $data = $this->teams->withLogo()->find($teamId);

        return new JsonResponse($data);
    }
}