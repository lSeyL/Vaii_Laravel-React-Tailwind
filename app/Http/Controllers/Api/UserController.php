<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $users = User::with(['purchasedShopItems', 'orders'])->paginate($perPage);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

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

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user = auth()->user();
        \Log::info("🔄 Updating User ID: " . $user->id, ['data' => $request->all()]);
        $rules = [];

        if ($request->filled('name') && $request->name !== $user->name) {
            $rules['name'] = 'required|string|max:255';
        }
        if ($request->filled('email') && $request->email !== $user->email) {
            $rules['email'] = 'required|email|max:255|unique:users,email,' . $user->id;
        }
        if ($request->filled('new_password')) {
            if (!$request->filled('old_password') || !Hash::check($request->old_password, $user->password)) {
                return response()->json(['message' => 'Old password is incorrect'], 422);
            }
            $rules['new_password'] = 'nullable|string|min:8';
        }

        $validated = $request->validate($rules);
        $updateData = [];

        if (isset($validated['name'])) {
            $updateData['name'] = $validated['name'];
        }
        if (isset($validated['email'])) {
            $updateData['email'] = $validated['email'];
        }
        if (isset($validated['new_password'])) {
            $updateData['password'] = Hash::make($validated['new_password']);
        }
        if (!empty($updateData)) {
            $user->update($updateData);
        }

        return response()->json(['message' => 'User updated successfully', 'user' => new UserResource($user)]);
    }

    public function updateUserAsAdmin(Request $request, $id)
    {
        \Log::info("👽 Received ID: " . $id);
        $admin = auth()->user();
        if ($admin->role->name !== "admin") {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->role->name === "admin") {
            return response()->json(['message' => 'Cannot update admin'], 403);
        }

        \Log::info("🔄 Admin updating User ID: " . $user->id, ['admin_id' => $admin->id, 'data' => $request->all()]);
        $rules = [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'new_password' => 'nullable|string|min:8',
        ];
        $validated = $request->validate($rules);
        $updateData = [];
        if (isset($validated['name'])) {
            $updateData['name'] = $validated['name'];
        }
        if (isset($validated['email'])) {
            $updateData['email'] = $validated['email'];
        }
        if (isset($validated['new_password'])) {
            $updateData['password'] = Hash::make($validated['new_password']);
        }
        if (!empty($updateData)) {
            $user->update($updateData);
        }
        return response()->json([
            'message' => 'User updated successfully by Admin',
            'user' => new UserResource($user),
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->role->name === "admin") {
            return response()->json(['message' => 'Cannot delete an admin!'], 403);
        }
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'You cannot delete yourself'], 403);
        }
        \Log::info("🗑️ Deleting User ID: " . $user->id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function userDelete(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        \Log::info("🗑️ Deleting User ID: " . $user->id . " (" . $user->name . ")");

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function getUser(Request $request)
    {
        return new UserResource($request->user());
    }


}
