<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    //
    public function register(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

     public function usersSummary()
    {
    
        $currentMonth = Carbon::now()->month;
        $lastMonth = Carbon::now()->subMonth()->month;

        $currentMonthOrders = User::whereMonth('created_at', $currentMonth)->count();
        $lastMonthOrders = User::whereMonth('created_at', $lastMonth)->count();
        // Calculate growth percentage
        if ($lastMonthOrders > 0) {
            $growth = (($currentMonthOrders - $lastMonthOrders) / $lastMonthOrders) * 100;
        } else {
            $growth = $currentMonthOrders > 0 ? 100 : 0;
        }

        return response()->json([
            'total_users' => $currentMonthOrders,
            'growth_percentage' => round($growth, 2),
            'comparison_text' => 'vs last month'
        ]);
    }
    
}
