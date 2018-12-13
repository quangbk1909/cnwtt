<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="assets/img/logo.png">
	<title>Login</title>
	
	<base href="{{asset('')}}">
	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
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
				<h1 class="my-5">HustBlog - Login</h1>
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
				    	<label for="username"><strong>Username</strong></label>
				    	<input type="text" class="form-control" id="username" aria-describedby="emailHelp" name="username" placeholder="Enter your username" required=""> 	
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
	
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="assets/js/bootstrap.min.js"></script>
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