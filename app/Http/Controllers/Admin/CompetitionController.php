<?php namespace App\Http\Controllers\Admin;

use App\Competition;
use App\Contracts\ICompetitionRepository;
use App\Contracts\IUserRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\Competitions\AdminStoreCompetition;
use App\Role;
use Illuminate\Http\Request;

/**
 * Class CompetitionController
 * @package App\Http\Controllers\Admin
 */
class CompetitionController extends Controller
{
    /**
     * @var ICompetitionRepository
     */
    private $competitions;

    /**
     * @var IUserRepository
     */
    private $users;

    /**
     * FileController constructor.
     * @param ICompetitionRepository $competitions
     * @param IUserRepository $users
     */
    public function __construct(ICompetitionRepository $competitions, IUserRepository $users)
    {
        $this->middleware('jwt.auth');
        $this->competitions = $competitions;
        $this->users = $users;
    }

    /**
     * GET     /api/admin/competitions
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Competition::class);

        if (!$request->user()->hasRole(Role::SUPER_ADMIN)) {
            $this->competitions->filterOwnedOrManaged();
        }

        $data = $this->competitions->paginate($request->per_page ?: 15);

        return $this->json($data);
    }

    /**
     * POST    /api/admin/posts
     * @param  AdminStoreCompetition $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(AdminStoreCompetition $request)
    {
        $this->authorize('create', Competition::class);

        $details = $request->only('ambulance', 'cooperation', 'equipment', 'invitation', 'judge_id',
            'organization_date', 'price', 'prizes', 'program', 'registration_till', 'rules', 'subtitle', 'title');

        $details['judge_name'] = $this->users->find($request->judge_id, ['id', 'name'])->name;

        $result = $this->competitions->create($details);

        return $this->json($result);
    }
}