<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="assets/img/favicon.ico">
	<title>Register</title>

	<base href="{{asset('')}}">
	<!-- Bootstrap core CSS -->
	<link href="assets/css/bootstrap.min.css" rel="stylesheet">
	<!-- Fonts -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
	<!-- Custom styles for this template -->
	<style>
		#img{
			padding-left: 0px;
			background: url('assets/img/register.jpg') bottom no-repeat;
			-webkit-background-size: 800px 1200px;
			     -o-background-size: 800px 1200px;
			        background-size: 800px 1200px;
		}
	</style>
</head>
<body style="overflow:hidden">
	<div class="container-fluid">
		<div class="row">
			<!-- img-left -->
			<div class="col-md-5" id="img" ></div>
			<!-- form-right -->
			<div class="col-md-7 my-auto">
				<div class="row mx-2">
					<div class="col-md-6">
						<h1 class="my-5">Create new account</h1>
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
	                    @if ($errors->first())
	                        <div class="alert alert-danger">
	                            {{ $errors->first() }}
	                        </div>
	                    @endif
							<form action="" method="POST">
								<input type="hidden" name="_token" value="{{csrf_token()}}">
							  	<div class="form-group">
							    	<label for="email"><strong>Email</strong></label>
							    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" required=""> 	
							  	</div>
							  	<div class="form-group">
							    	<label for="password"><strong>Password</strong></label>
							    	<input type="password" class="form-control" name="password" id="password" placeholder="Password" required="">
							  	</div>
							  	<div class="form-group">
							    	<label for="password_confirmation"><strong>Confirm Password</strong></label>
							    	<input type="password" class="form-control" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" required="">
							  	</div>
							  	<button type="submit" class="btn btn-primary btn-block">Create new account</button>
							</form>
							<hr>
							<p>Already have an account? <a href="login">Sign in</a></p> 
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="assets/js/jquery.min.js"></script>
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