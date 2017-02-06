<?php namespace App\Services\Models;

use App\Contracts\IFileRepository;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\UploadedFile;

/**
 * Class FileUpload
 * @package App\Services\Models
 */
class FileUpload implements Arrayable
{
    /**
     * @var IFileRepository
     */
    private $files;

    private $completed = false;
    private $id = 0;
    private $dir = '';
    private $name = '';
    private $extension = '';
    private $mimetype = '';
    private $payload = [];

    /**
     * Filesystem full path to the file
     * @var string
     */
    public $path = '';

    /**
     * FileUpload constructor.
     * @param IFileRepository $files
     * @param string $dir
     */
    public function __construct(IFileRepository $files, $dir)
    {
        $this->files = $files;
        $this->dir = $dir;
    }

    /**
     * Get the instance as an array.
     * @return array
     */
    public function toArray()
    {
        return [
            'id' => $this->id,
            'status' => $this->status(),
            'name' => $this->filesystemName(),
            'src' => $this->getSrc(),
            'mimetype' => $this->mimetype,
            'extension' => $this->extension,
            'payload' => $this->payload
        ];
    }

    /**
     * @return bool
     */
    public function isSuccessful()
    {
        return $this->completed;
    }

    /**
     * Gets file upload status
     * @return int
     */
    public function status()
    {
        return $this->isSuccessful() ? 200 : 422;
    }

    /**
     * Set file base configuration before start uploading
     * @param UploadedFile $file
     * @return $this
     */
    public function setFile(UploadedFile $file)
    {
        $this->name = $this->getUniqueName($file);
        $this->mimetype = $file->getMimeType();
        $this->extension = $file->getClientOriginalExtension();
        $this->path = $this->getPath();

        return $this;
    }

    /**
     * Get file full name
     * @return string
     */
    public function filesystemName()
    {
        $name = $this->name;

        if ($this->extension) {
            $name .= '.' . $this->extension;
        }

        return $name;
    }

    /**
     * Add thumb definition to payload
     * @param $size
     * @return string
     */
    public function addThumb($size)
    {
        if (!array_key_exists('thumbs', $this->payload)) {
            $this->payload['thumbs'] = [];
        }

        $this->payload['thumbs'][$size] = $this->getSrc($size);

        return $this->getPath($size);
    }

    /**
     * Set uploaded state as completed
     */
    public function setCompleted()
    {
        $this->completed = true;
    }

    /**
     * Set database id for file
     * @param $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $size
     * @return string
     */
    public function getDir($size = '')
    {
        return '/' . $this->dir . date('/Y-m-d') . ($size ? ("/$size") : '');
    }

    /**
     * Get file src property
     * @param string $size
     * @return string
     */
    private function getSrc($size = '')
    {
        $dir = $this->getDir($size);
        $result =  $dir . '/' . $this->filesystemName();

        if (!file_exists(public_path($dir))) {
            mkdir(public_path($dir), 0777, true);
        }

        return $result;
    }

    /**
     * Get file path property
     * @param string $size
     * @return string
     */
    private function getPath($size = '')
    {
        return public_path($this->getSrc($size));
    }

    /**
     * Get unique file name for uploading file
     * @param UploadedFile $file
     * @return string
     */
    private function getUniqueName(UploadedFile $file)
    {
        $name = Slug::make(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $name = str_limit($name, 200);
        $count = $this->files->whereNameStartsWith($name)->count();
        if ($count > 0) {
            $name = $name . '-' . ($count + 1);
        }

        return $name;
    }
}