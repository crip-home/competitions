<?php namespace App\Http\Controllers;

use App\Contracts\ITeamRepository;
use Illuminate\Http\JsonResponse;

/**
 * Class TeamController
 * @package App\Http\Controllers
 */
class TeamController extends Controller
{
    /**
     * @var ITeamRepository
     */
    private $teams;

    /**
     * TeamController constructor.
     * @param ITeamRepository $teams
     */
    public function __construct(ITeamRepository $teams)
    {
        $this->teams = $teams;
    }

    /**
     * Get team details.
     * GET     /api/teams/{team}
     * @param  int $teamId
     * @return JsonResponse
     */
    public function show(int $teamId): JsonResponse
    {
        $data = $this->teams->find($teamId);

        return $this->json($data);
    }
}