<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::all();
        return Inertia::render("dashboard", [
            // "files" => $files
            "user" => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("files/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FileUploadRequest $request)
    {

        $data = $request->validated();
        $data["user_id"] = auth()->id();

        if ($request->hasFile("image")) {
            $filePath = $request->file("image")->store("images", "public");
            $data["image"] = $filePath;
        }

        if ($request->hasFile("dxf_file")) {
            $filePath = $request->file("dxf_file")->store("dxf_files", "public");
            $data["dxf_file"] = $filePath;
        }

        File::create($data);

        return to_route("dashboard")->with('success', 'Uploaded successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        return Inertia::render("files/show",[
            "file" => $file,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        return Inertia::render("files/update");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
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

        return to_route("dashboard");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        $file->delete();
        return to_route("dashboard");
    }
}
