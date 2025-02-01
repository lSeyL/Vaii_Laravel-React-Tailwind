<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($request->password),
            'role_id' => 1, // Defaultne na 'user'
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'User registered successfully'
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        \Log::info('Login attempt', $credentials);
        if (!Auth::attempt($credentials)) {
            \Log::warning('Login failed', ['email' => $credentials['email']]);
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function profile(Request $request)
    {
        return new UserResource(Auth::user());
    }
}