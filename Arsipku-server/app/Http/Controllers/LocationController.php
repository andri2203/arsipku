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
            ->orderBy('rooms.name', 'DESC')
            ->get([
                'locations.id',
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
