<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $location = Location::join('rooms', 'rooms.id', '=', 'locations.room_id')
            ->join('storages AS m', 'm.id', '=', 'locations.storage_id')
            ->leftJoin('storages AS s', 's.id', '=', 'locations.sub_storage_id')
            ->join('buildings', 'buildings.id', '=', 'rooms.building_id')
            ->orderBy('locations.created_at', 'DESC')
            ->get([
                'locations.id',
                'locations.room_id',
                'locations.storage_id',
                'locations.sub_storage_id',
                'buildings.name AS building',
                'rooms.name AS roomName',
                'm.name AS primaryStorage',
                's.name AS secondaryStorage'
            ]);

        $response = [
            'message' => 'Data Lokasi Penyimpanan',
            'data' => $location
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'room_id' => ['required', 'exists:rooms,id'],
            'storage_id' => ['required', 'exists:storages,id'],
            'sub_storage_id' => [
                'nullable',
                'exists:storages,id',
                'unique:locations,sub_storage_id'
            ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $location = Location::create($request->all());
            $response = [
                'message' => 'Data Berhasil Disimpan',
                'data' => $location
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $location = Location::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'room_id' => ['required', 'exists:rooms,id'],
                'storage_id' => ['required', 'exists:storages,id'],
                'sub_storage_id' => [
                    'nullable',
                    'exists:storages,id',
                    'unique:locations,sub_storage_id,'.$id
                ],
            ]);
    
            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

    
            try {
                $location->update($request->all());

                $response = [
                    'message' => 'Data Berhasil Disimpan',
                    'data' => $location,
                    'input' => $request->sub_storage_id
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $validator = Validator::make(['id' => $id], [
                'id' => ['unique:files,location_id'],
            ], [
                'unique' => "The Data is already connected to other data"
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_NOT_ACCEPTABLE);
            }

            $location = Location::findOrFail($id);

            try {
                $location->delete();
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
