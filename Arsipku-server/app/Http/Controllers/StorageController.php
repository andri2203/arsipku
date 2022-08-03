<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Storage;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $storage = Storage::join('storage_types', 'storage_types.id', '=', 'storages.storage_type_id')
            ->orderBy('storages.time', 'DESC')
            ->get(['storages.*', 'storage_types.name AS typeName', 'storage_types.type']);

        $response = [
            'message' => 'Data Penyimpanan',
            'data' => $storage,
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
            'desciption' => ['required'],
            'storage_type_id' => ['required', 'exists:storage_types,id']
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $storage = Storage::create($request->all());
            $response = [
                'message' => 'Data Berhasil Dibuat',
                'data' => $storage,
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
            $storage = Storage::join('storage_types', 'storage_types.id', '=', 'storages.storage_type_id')
                ->orderBy('storages.time', 'DESC')
                ->findOrFail($id, ['storages.*', 'storage_types.name AS typeName', 'storage_types.type']);

            $response = [
                'message' => 'Detail Data Penyimpanan',
                'data' => $storage,
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

    public function showByType($id)
    {
        try {
            $storage = Storage::join('storage_types', 'storage_types.id', '=', 'storages.storage_type_id')
                ->where('storages.storage_type_id', '=', $id)
                ->orderBy('storages.time', 'DESC')
                ->get(['storages.*', 'storage_types.name AS typeName', 'storage_types.type']);

            $response = [
                'message' => 'Data Penyimpanan Berdasarkan Tipe',
                'data' => $storage,
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
            $storage = Storage::join('storage_types', 'storage_types.id', '=', 'storages.storage_type_id')
                ->orderBy('storages.time', 'DESC')
                ->findOrFail($id, ['storages.*', 'storage_types.name AS typeName', 'storage_types.type']);

            $validator = Validator::make($request->all(), [
                'name' => ['required'],
                'desciption' => ['required'],
                'storage_type_id' => ['required', 'exists:storage_types,id']
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            try {
                $storage->update($request->all());
                $response = [
                    'message' => 'Data Berhasil Diubah',
                    'data' => $storage,
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
                'id' => ['unique:locations,storage_id,sub_storage_id'],
            ], [
                'unique' => "The Data is already connected to other data"
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_NOT_ACCEPTABLE);
            }
            
            $storage = Storage::findOrFail($id);

            try {
                $storage->delete();
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
