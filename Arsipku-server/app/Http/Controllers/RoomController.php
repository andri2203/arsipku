<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class RoomController extends Controller
{
    public function index()
    {
        $room = Room::join('buildings', 'buildings.id', '=', 'rooms.building_id')
            ->orderBy('rooms.time', 'DESC')
            ->get(['rooms.*', 'buildings.name AS buildingName']);

        $response = [
            'message' => 'Data Ruangan',
            'data' => $room,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'building_id' => ['required', 'numeric', 'exists:buildings,id'],
            'name' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $room = Room::create($request->all());
            $response = [
                'message' => 'Data Berhasil Dibuat',
                'data' => $room,
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

        try {
            $room = Room::join('buildings', 'buildings.id', '=', 'rooms.building_id')
                ->findOrFail($id, ['rooms.*', 'buildings.name AS buildingName']);

            $response = [
                'message' => 'Detail Dari Ruangan',
                'data' => $room,
            ];

            return response()->json($response, Response::HTTP_OK);
        } catch (ModelNotFoundException $th) {
            $response = [
                'message' => 'Gagal. ' . $th->getMessage(),
                'data' => [],
            ];

            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
    }

    public function showByBuilding($id)
    {
        try {
            $room = Room::join('buildings', 'buildings.id', '=', 'rooms.building_id')
                ->where('rooms.building_id', '=', $id)
                ->orderBy('rooms.time', 'DESC')
                ->get(['rooms.*', 'buildings.name AS buildingName']);

            $response = [
                'message' => 'Data Ruangan Berdasarkan Gedung',
                'data' => $room,
            ];

            return response()->json($response, Response::HTTP_OK);
        } catch (ModelNotFoundException $th) {
            $response = [
                'message' => 'Gagal. ' . $th->getMessage(),
                'data' => [],
            ];

            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $room = Room::join('buildings', 'buildings.id', '=', 'rooms.building_id')
                ->findOrFail($id, ['rooms.*', 'buildings.name AS buildingName']);

            $validator = Validator::make($request->all(), [
                'building_id' => ['required', 'numeric', 'exists:buildings,id'],
                'name' => ['required']
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            try {

                $room->update($request->all());
                $response = [
                    'message' => 'Data Berhasil Diubah',
                    'data' => $room,
                ];

                return response()->json($response, Response::HTTP_OK);
            } catch (QueryException $e) {
                $response = [
                    'message' => 'Gagal. ' . $e->errorInfo,
                    'data' => [],
                ];

                return response()->json($response);
            }
        } catch (ModelNotFoundException $th) {
            $response = [
                'message' => 'Gagal. ' . $th->getMessage(),
                'data' => [],
            ];

            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
    }

    public function destroy($id)
    {
        try {
            $room = Room::findOrFail($id);

            try {
                $room->delete();
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
        } catch (ModelNotFoundException $th) {
            $response = [
                'message' => 'Gagal. ' . $th->getMessage(),
                'data' => [],
            ];

            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
    }
}
