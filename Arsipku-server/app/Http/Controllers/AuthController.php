<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $field = $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'password'=>'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $field['name'],
            'email' => $field['email'],
            'name' => bcrypt($field['password']),
        ]);

        return response()->json([
            'message'=>'register sukses',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], Response::HTTP_OK);
    }

    public function login(Request $request)
    {
        $field = $request->validate([
            'email'=>'required|string',
            'password'=>'required|string',
        ]);

        $user = User::where('email', $field['email'])->get()->first();

        if(!$user || !Hash::check($field['password'], $user->password)){
            return response()->json(['message'=>'Email atau Password salah'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $token = $user->createToken("arsipaptoken")->plainTextToken;

        return response()->json([
            'message'=>'login sukses',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json(['messages' => "logout sukses"], Response::HTTP_OK);
    }
}
