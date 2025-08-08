<?php

namespace App\Http\Controllers;

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
        return Inertia::render("dashboard", [
            "files" => File::latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "max:50"],
            "description" => ["nullable","max:255"],
            "image" => ["required", "image"],
            "dxf_file" => ["required", "file"]
        ]);

        if ($request->hasFile("image")) {
            $filePath = $request->file("image")->store("images", "public");
            $data["image"] = $filePath;
        }

        if ($request->hasFile("dxf_file")) {
            $filePath = $request->file("dxf_file")->store("dxf_files". "public");
            $data["dxf_file"] = $filePath;
        }

        File::create($data);

        return redirect("dashboard")->with("success","File Uploaded");
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        return Inertia::render("show",[
            "file" => $file,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        return Inertia::render("create");
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

        return redirect("dashboard")->with("success","File updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        $file->delete();
        return redirect("dashboard")->with("success","File deleted");
    }
}
