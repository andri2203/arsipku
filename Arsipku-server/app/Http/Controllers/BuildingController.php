<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class BuildingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $building = Building::orderBy('time', 'DESC')->get();

        $respones = [
            'message' => 'Data Gedung',
            'data' => $building
        ];

        return response()->json($respones, Response::HTTP_OK);
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
            'name' => ['required', 'unique:buildings,name'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $building = Building::create($request->all());
            $response = [
                'message' => 'Data Berhasil Dibuat',
                'data' => $building,
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

        try {
            $building = Building::findOrFail($id);

            $response = [
                'message' => 'Detail Dari Gedung',
                'data' => $building,
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
            $building = Building::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => ['required', 'unique:buildings,name'],
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            try {
                $building->update($request->all());
                $response = [
                    'message' => 'Data Berhasil Diubah',
                    'data' => $building,
                ];

                return response()->json($response, Response::HTTP_OK);
            } catch (QueryException $e) {
                $response = [
                    'message' => 'Gagal. ' . $e->errorInfo,
                    'data' => [],
                ];

                return response()->json($response, Response::HTTP_NOT_FOUND);
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
                'id' => ['unique:rooms,building_id'],
            ], [
                'unique' => "The Data is already connected to other data"
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_NOT_ACCEPTABLE);
            }

            $building = Building::findOrFail($id);

            try {
                $building->delete();
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
