<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['purchasedShopItems', 'orders'])->paginate(10);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->load(['purchasedShopItems', 'orders']);


        return (new UserResource($user))
                ->additional(['message' => 'User created successfully'])
                ->response()
                ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with(['purchasedShopItems', 'orders'])->find($id);
            
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::with(['purchasedShopItems', 'orders'])->find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:8|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        $user->load(['purchasedShopItems', 'orders']);


        return (new UserResource($user))
                ->additional(['message' => 'User updated successfully'])
                ->response()
                ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    
    }
}
