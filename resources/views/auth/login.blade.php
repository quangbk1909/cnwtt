<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="shortcut icon" href="assets/img/logo.png" type="image/png">
	<title>Login</title>
	
	<!-- Css -->
	<link rel="stylesheet" href="css/app.css" type="text/css">

	<!-- Fonts -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
	<!-- Custom styles for this template -->
	<style>
		#img{
			padding-left: 0px;
			background: url('assets/img/login.jpg') bottom no-repeat;
			-webkit-background-size: 2000px;
			     -o-background-size: 2000px;
			        background-size: 2000px;
		}
	</style>
</head>
<body style="overflow:hidden">
	<div class="container-fluid">
		<div class="row">
			<!-- img-left -->
			<div class="col-md-8" id="img" ></div>
			<!-- form-right -->
			<div class="col-md-4 my-auto px-5">	
				<h1 class="my-5">Login</h1>
				<p> Please enter your username and password to login</p>
				 @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif
                @if (session('warning'))
                    <div class="alert alert-warning">
                        {{ session('warning') }}
                    </div>
                @endif
                @if (session('danger'))
                    <div class="alert alert-danger">
                        {{ session('danger') }}
                    </div>
                @endif
				<form action="" method="POST">
					<input type="hidden" name="_token" value="{{csrf_token()}}">
				  	<div class="form-group">
				    	<label for="email"><strong>Username</strong></label>
				    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter your username" required=""> 	
				  	</div>
				  	<div class="form-group">
				    	<label for="password"><strong>Password</strong></label>
				    	<input type="password" class="form-control" name="password" id="password" placeholder="Enter your password" required="">
				  	</div>
				  	<div class="form-group form-check">
				    	<label class="form-check-label" for="exampleCheck1">
				    		<input type="checkbox" class="form-check-input" name="remember" id="exampleCheck1">
				    		Keep me signed in
						</label>
				  	</div>
				  	<button type="submit" class="btn btn-primary">Login</button>
				</form>
				<hr>
				<p> Don't have account? <a href="register">Sign up</a></p>
				<a href="reset-account">Forgot password?</a>
			</div>
		</div>
	</div>
	
	<!-- Js -->
	<script src="js/app.js"></script>

	<script>
        function autoResizeDiv()
        {
           $("#img").height($(window).height());
        }
        window.onresize = autoResizeDiv;
        autoResizeDiv();
    </script>
</body>
</html>