<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

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
    public function store(StoreUserRequest $request)
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
    public function show(User $user)
    {
        $user->load(['purchasedShopItems', 'orders']);
            
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user = auth()->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'old_password' => 'nullable|string|min:6',
            'new_password' => 'nullable|string|min:6|different:old_password',
        ]);
    
        if ($request->filled('old_password') && !Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect'], 400);
        }
    
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->filled('new_password') ? Hash::make($request->new_password) : $user->password,
        ]);
    
        return response()->json(['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
