<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    //protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function getLogin(){
        return view('auth.login');
    }

    public function postLogin(Request $request){
        if(Auth::attempt(['username' => $request->username, 'password' => $request->password], $request->has('remember'))){
            if(Auth::user()->verified){
                return redirect('admin');
            }else{
                Auth::logout();
                return redirect('login')->with('warning', 'You need to confirm your account. We have sent you an activation code, please check your email.');
            }        
        }else{
            return redirect('login')->with('danger', 'Incorrect email or password!');
        }
    
    }

    public function logout(){
        Auth::logout();
        return redirect('login');
    }
}
