<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\VerifyUser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use App\Mail\VerifyMail;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|max:100|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ],
        [
            'min' => ':attribute can not be less than :min characters.',
            'max' => ':attribute can not be more than :max characters.',
            'unique' => ':attribute already exists.',
        ],
        [
            'username' => 'Username',
            'email' => 'Email',
            'password' => 'Password',
        ]
    );
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->image_link = 'assets/img/avatar-default.png';
        $user->save();
        $verifyUser = VerifyUser::create([
            'user_id' => $user->id,
            'token' => str_random(40),
        ]);

        Mail::to($user->email)->send(new VerifyMail($user));

        return $user;
    }

    public function getRegistration(){
        return view('auth.register');
    }

    /*validate user with token receive in email*/
    public function verifyUser($token){
        $verifyUser = VerifyUser::where('token',$token)->first();
        if(isset($verifyUser)){
            $user = $verifyUser->user;
            if(!$user->verified){
                $user->verified = 1;
                $user->role_id = 3;
                $user->save();
                $status = "Your email is verified. You can login now.";
            }else{
                $status = "Your email is already verified. You can login now.";
            }
        }else{
            return redirect('login')->with('warning',"Sorry your email cannnot be identified");
        }

        return redirect('login')->with('status',$status);
    }

    /* override method in RegistersUsers. method is exceuted just after user is registerd into application*/
    protected function registered(Request $request, $user)
    {
        $this->guard()->logout();
        return redirect('login')->with('status', 'We sent you an activation code. Check your email and click on the link to verify.');
    }
}
