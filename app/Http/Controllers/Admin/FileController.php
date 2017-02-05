<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Files\FileUploadRequest;
use App\Services\FileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class FileController
 * @package App\Http\Controllers\Admin
 */
class FileController extends Controller
{
    /**
     * @var FileService
     */
    private $files;

    /**
     * FileController constructor.
     *
     * @param FileService $files
     */
    public function __construct(FileService $files)
    {
        $this->middleware('jwt.auth');
        $this->files = $files;
    }

    /**
     * POST  /api/admin/files
     *
     * @param FileUploadRequest $request
     *
     * @return JsonResponse
     */
    public function store(FileUploadRequest $request)
    {
        $response = $this->files->upload($request->file);

        return new JsonResponse($response, $response->status());
    }
}