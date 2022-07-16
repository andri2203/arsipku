<?php

namespace App\Http\Controllers;

use App\Models\StorageType;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class StorageTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $storageType = StorageType::orderBy('time', 'DESC')->get();

        $response = [
            'message' => 'Data Tipe Penyimpanan',
            'data' => $storageType,
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
            'name' => ['required'],
            'type' => ['required', 'in:main,second'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $storageType = StorageType::create($request->all());
            $response = [
                'message' => 'Data Berhasil Dibuat',
                'data' => $storageType,
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
            $storageType = StorageType::findOrFail($id);

            $response = [
                'message' => 'Detail Data Tipe Penyimpanan',
                'data' => $storageType,
            ];

            return response()->json($response, Response::HTTP_OK);
        } catch (ModelNotFoundException $th) {
            $response = [
                'message' => 'Gagal. ' . $th->getMessage(),
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
            $storageType = StorageType::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => ['required'],
                'type' => ['required', 'in:main,second'],
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            try {
                $storageType->update($request->all());
                $response = [
                    'message' => 'Data Berhasil Diubah',
                    'data' => $storageType,
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

            return response()->json($response);
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
            $storageType = StorageType::findOrFail($id);

            try {
                $storageType->delete();
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

            return response()->json($response);
        }
    }
}
