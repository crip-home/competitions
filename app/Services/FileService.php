<?php namespace App\Services;

use App\Contracts\IFileRepository;
use App\Services\Models\FileUpload;
use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use phpDocumentor\Reflection\Types\Object_;

/**
 * Class FileService
 * @package App\Services
 */
class FileService
{
    /**
     * @var IFileRepository
     */
    private $files;

    /**
     * Default file sizes
     * @var array
     */
    private $sizes = [
        'thumb' => [165, 165, 'resize',],
        'xs' => [80, 80, 'resize']
    ];

    /**
     * FileService constructor.
     * @param IFileRepository $files
     */
    public function __construct(IFileRepository $files)
    {
        $this->files = $files;
    }

    /**
     * @param integer $userId
     * @param UploadedFile $file
     * @param array $sizes
     * @return FileUpload
     */
    public function upload($userId, UploadedFile $file, array $sizes = [])
    {
        // each user will have own dir
        $dir = 'uploads/' . $userId;

        $upload = new FileUpload($this->files, $dir);

        if ($file->isValid()) {
            // Generates all required path and src properties for file upload
            $upload->setFile($file);

            // Save file on the server
            $file->move(public_path($upload->getDir()), $upload->filesystemName());

            // Generate thumbs for uploaded file
            $this->createThumbs($upload, $sizes);

            $upload->setCompleted();
        }

        // save uploaded file info in database
        $dbFile = $this->files->create($upload->toArray());

        $upload->setId($dbFile->id);

        return $upload;
    }

    /**
     * Generate thumbs for uploaded file
     * @param FileUpload $upload
     * @param array $sizes
     * @return FileUpload
     */
    private function createThumbs(FileUpload $upload, array $sizes)
    {
        $allSizes = array_merge($this->sizes, $sizes);
        foreach ($allSizes as $sizeKey => $size) {
            $img = app(ImageManager::class)->make($upload->path);
            switch ($size[2]) {
                case 'width':
                    // resize the image to a width of $sizes[ 0 ] and constrain aspect ratio (auto height)
                    $img->resize($size[0], null, function ($constraint) {
                        $constraint->aspectRatio();
                    });
                    break;
                case 'height':
                    // resize the image to a height of $sizes[ 1 ] and constrain aspect ratio (auto width)
                    $img->resize(null, $size[1], function ($constraint) {
                        $constraint->aspectRatio();
                    });
                    break;
                // 'resize'
                default:
                    $img->fit($size[0], $size[1]);
                    break;
            }
            $thumbPath = $upload->addThumb($sizeKey);

            $img->save($thumbPath);
        }

        return $upload;
    }
}