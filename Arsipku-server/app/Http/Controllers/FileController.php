<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index()
    {
        $data = File::join('locations', 'locations.id', '=', 'files.location_id')
            ->join('rooms', 'rooms.id', '=', 'locations.room_id')
            ->join('storages AS m', 'm.id', '=', 'locations.storage_id')
            ->leftJoin('storages AS s', 's.id', '=', 'locations.sub_storage_id')
            ->join('buildings', 'buildings.id', '=', 'rooms.building_id')
            ->join('users', 'users.id', '=', 'files.user_id')
            ->orderBy('files.created_at', 'DESC')
            ->get([
                'files.*',
                'users.name AS userName',
                'buildings.name AS building',
                'rooms.name AS roomName',
                'm.name AS primaryStorage',
                's.name AS secondaryStorage'
            ]);

        $response = [
            'message' => 'Data Lokasi Penyimpanan',
            'data' => $data,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'nomor_berkas' => 'required|unique:files,nomor_berkas',
            'tipe_berkas' => 'required',
            'kegiatan' => 'required',
            'pptk' => 'required',
            'jenis_berkas' => 'required',
            'foto' => 'required|image|file|max:1024',
            'location_id' => 'required',
        ]);

        try {
            $foto = $request->file('foto')->store('foto_berkas');

            $file = File::create([
                'nomor_berkas' => $fields['nomor_berkas'],
                'tipe_berkas' => $fields['tipe_berkas'],
                'kegiatan' => $fields['kegiatan'],
                'pptk' => $fields['pptk'],
                'jenis_berkas' => $fields['jenis_berkas'],
                'foto' => asset('storage/' . $foto),
                'location_id' => $fields['location_id'],
                'user_id' => auth()->user()->id
            ]);

            $response = [
                'message' => 'Data Menambah Berkas Baru',
                'data' => $file,
            ];

            return response()->json($response, Response::HTTP_CREATED);
        } catch (QueryException $e) {
            $response = [
                'message' => 'Gagal. ' . $e->errorInfo,
                'data' => [],
            ];

            return response()->json($response);
        }
    }

    public function show($id)
    {
        $file = File::join('locations', 'locations.id', '=', 'files.location_id')
            ->join('rooms', 'rooms.id', '=', 'locations.room_id')
            ->join('storages AS m', 'm.id', '=', 'locations.storage_id')
            ->leftJoin('storages AS s', 's.id', '=', 'locations.sub_storage_id')
            ->join('buildings', 'buildings.id', '=', 'rooms.building_id')
            ->join('users', 'users.id', '=', 'files.user_id')
            ->orderBy('files.created_at', 'DESC')
            ->findOrFail($id, [
                'files.*',
                'users.name AS userName',
                'buildings.name AS building',
                'rooms.name AS roomName',
                'm.name AS primaryStorage',
                's.name AS secondaryStorage'
            ]);

        $response = [
            'message' => 'Data Lokasi Penyimpanan',
            'data' => $file
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {

        $file = File::findOrFail($id);

        $fields = $request->validate([
            'nomor_berkas' => 'required|unique:files,nomor_berkas',
            'tipe_berkas' => 'required',
            'kegiatan' => 'required',
            'pptk' => 'required',
            'jenis_berkas' => 'required',
            'foto' => 'sometimes|image|file|max:1024',
            'location_id' => 'required',
        ]);


        try {
            if ($request->hasFile("foto")) {
                Storage::delete(ltrim($file->foto, url()->asset('storage/')));
                $foto = $request->file('foto')->store('foto_berkas');
                $fields["foto"] = asset('storage/' . $foto);
            } else {
                $fields["foto"] = $file->foto;
            }

            $file->update($fields);

            $response = [
                'message' => 'Data Berkas Berhasil Diubah',
                'data' => $file,
            ];
            return response()->json($response, Response::HTTP_OK);
        } catch (QueryException $e) {
            $response = [
                'message' => 'Gagal. ' . $e->errorInfo,
                'data' => $e->getMessage(),
            ];

            return response()->json($response);
        }
    }

    public function destroy($id)
    {
        $file = File::findOrFail($id);

        try {
            $file->delete();
            Storage::delete(ltrim($file->foto, url()->asset('storage/')));
            $response = [
                'message' => 'Data Berhasil Dihapus',
                'data' => [],
            ];

            return response()->json($response, Response::HTTP_OK);
        } catch (QueryException $e) {
            $response = [
                'message' => 'Gagal. ' . $e->errorInfo,
                'data' => [],
            ];

            return response()->json($response);
        }
    }
}
