<!DOCTYPE html>
<html>
<head>
    <title>Verify Account Mail</title>
</head>
 
<body>
<h2>Welcome to the HustBlog</h2>
<br/>
Your registered email-id is {{$user['email']}} , Please click on the below link to verify your email account
<br/>
<a href="{{url('user/verify', $user->verifyUser->token)}}">Verify Email</a>
</body>
 
</html>