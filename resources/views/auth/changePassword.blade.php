<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Change Password</title>
	<!-- Bootstrap core CSS -->
	<base href="{{asset('')}}">

	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<!-- Fonts -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
	<!-- Custom styles for this template -->

</head>
<body style="overflow:hidden">
	<div class="container">
		<div class="row  my-5 d-flex align-items-start justify-content-center" style="height: 600px	;">
			<div class="col-md-6">
				<div class="card ">
				  	<div class="card-header">
				  		<h2>Change Password</h2>	
				  	</div>
				  	<div class="card-body">
				  		<div class="m-5">
				  			@if(session('status'))
				  				<p>{{session('status')}}</p>
				  				<p>Click <a href="login">here</a> to login</p>
				  			@else
					  			@if(session('warning'))
					  				<div class="alert alert-warning">
					  					{{session('warning')}}
					  				</div>
					  			@endif
					  			@if($errors->any())
					  				<div class="alert alert-danger">
					  					{{$errors->first()}}
					  				</div>
								@endif
					  			<form action="change-password" method="POST">
					  				@csrf
					  				<input type="hidden" name="token" value="{{$token}}">
					  				<div class="form-group">
								    	<label for="email"><strong>Email</strong></label>
								    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter your email" required=""> 	
								  	</div>
								  	<div class="form-group">
								    	<label for="password"><strong>Password</strong></label>
								    	<input type="password" class="form-control" id="password"  name="password" placeholder="Enter your email" required=""> 	
								  	</div>
								  	<div class="form-group">
								    	<label for="password_confirmation"><strong>Confirm Password</strong></label>
								    	<input type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="Enter your email" required=""> 	
								  	</div>
								  	<button type="submit" class="btn btn-primary btn-block">Change Password</button>
					  			</form>	
					  			<hr>
					  			<p>Already have an account?<a href="login"> Sign in</a></p>	
				  			@endif
				  		</div>			
				  	</div>
				  	<div class="card-footer text-muted">
				    
				  	</div>
				</div>
			</div>

		</div>
		
	</div>
	
	<script src="assets/js/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="assets/js/bootstrap.min.js"></script>
</body>
</html>