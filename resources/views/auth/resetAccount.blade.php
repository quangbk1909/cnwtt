<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<title>Reset Account</title>

	<base href="{{asset('')}}">
	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
	<!-- Fonts -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
	<!-- Custom styles for this template -->
</head>
<body style="overflow:hidden">
	<div class="container">
		<div class="row d-flex align-items-end justify-content-center" style="height: 500px;">
			<div class="col-md-6">
				<div class="card ">
				  	<div class="card-header">
				  		<h2>Reset Account</h2>	
				  	</div>
				  	<div class="card-body">
				  		<div class="m-5">
				  			@if(session('status'))
				  				<p>{{session('status')}}</p>
				  			@else
				  			<form action="" method="POST">
				  				<input type="hidden" name="_token" value="{{csrf_token()}}">
				  				<div class="form-group">
							    	<label for="email"><strong>Email</strong></label>
							    	<input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter your email" required=""> 	
							  	</div>
							  	<button type="submit" class="btn btn-primary btn-block">Send activation link</button>
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
	
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="assets/js/bootstrap.min.js"></script>
</body>
</html>