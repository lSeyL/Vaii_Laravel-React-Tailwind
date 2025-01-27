<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
{
    // Log the session data before anything else
    Log::info('=== Login attempt started ===');

    // 1. Log the entire session array (be cautious in production; can be verbose)
    Log::info('Session data at start of store method:', $request->session()->all());

    // 2. Log the XSRF header
    $xsrfHeader = $request->header('X-XSRF-TOKEN');
    Log::info('X-XSRF-TOKEN header from request: ' . ($xsrfHeader ?? 'none'));

    // 3. Check if there is a token in the session
    $sessionToken = $request->session()->get('_token');
    Log::info('Session _token: ' . ($sessionToken ?? 'none'));

    // 4. Validate credentials
    $credentials = $request->validate([
        'email'    => 'required|email',
        'password' => 'required|string',
    ]);

    // Attempt to authenticate
    if (!Auth::attempt($credentials)) {
        Log::warning('Login failed for email: ' . $request->email);
        return response()->json(['message' => 'Invalid email or password.'], 401);
    }

    // If successful
    $request->session()->regenerate();
    Log::info('Login successful for email: ' . $request->email);

    return response()->json(['message' => 'Login successful!'], 200);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
