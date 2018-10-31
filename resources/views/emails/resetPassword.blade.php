<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
</head>
 
<body>
<h2>CMS-VCcorp</h2>
<br/>
You are receiving this email because we received a password reset request for your account. Click link below to reset your password :
<br/>
<a href="{{url('change-password', $passwordReset->token)}}">Reset Password</a>
</body>
 
</html>