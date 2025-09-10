<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Http\Resources\FileResource;
use App\Http\Resources\ShowFileResource;
use App\Models\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $files = File::select('id', 'name', 'image', 'dxf_file')->latest()->paginate(9);
        return Inertia::render("dashboard", [
            "files" => FileResource::collection($files),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render("files/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FileUploadRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data["user_id"] = Auth::id();

        if ($request->hasFile("image")) {
            $filePath = $request->file("image")->store("images", "public");
            $data["image"] = $filePath;
        }

        if ($request->hasFile("dxf_file")) {
             $dxfFile = $request->file('dxf_file');
            $dxfFileName = time().'.dxf';
            $filePath = $dxfFile->storeAs('dxf_files', $dxfFileName, 'public');
            $data["dxf_file"] = $filePath;
        }

        File::create($data);

        return to_route("files.index")->with('success', 'Uploaded successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file): Response
    {
        return Inertia::render("files/show",[
            "file" => new ShowFileResource($file),
        ]);
    }

    public function imageDownload(File $file) {
        //   dd(storage_path("app/public". $file->dxf_file));

        if (Storage::disk('public')->exists($file->dxf_file)) {
            $absolutePath = Storage::disk('public')->path($file->dxf_file);

            Storage::download($absolutePath, basename($file->dxf_file));

            // return response()->download($absolutePath, basename($file->dxf_file));
        }

        abort(404, 'File not found');
    }

    public function dxfDownload(File $file) {
        dd(storage_path("app/public". $file->dxf_file));

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file): Response
    {
        return Inertia::render("files/update");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file): RedirectResponse
    {
        $data = $request->validate([
            "name" => ["nullable"],
            "description" => ["nullable"],
            "image" => ["nulllable", "image"],
            "dxf_file" => ["nullable", "file"],
        ]);

        if($request->hasFile("image")){
            $filePath = $request->file("image")->store("images", "public");
            $data["image"] = $filePath;
        }

        if($request->hasFile("dxf_file")){
            $filePath = $request->file("dxf_file")->store("dxf_files", "public");
            $data["dxf_file"] = $filePath;
        }

        $file->update($data);

        return to_route("files.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file): RedirectResponse
    {
        $file->delete();
        return to_route("files.index");
    }
}
