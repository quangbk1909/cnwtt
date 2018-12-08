@extends('admin.layout.index')

@section('content')

<div class="bg-white p-3">
    <div class="row">
        <div class=" offset-md-1 col-md-9 mr-auto">
            <h1><strong>User</strong>
                <small>Update</small>
            </h1>
        </div>
        
    </div>
    <hr>
    @if (session('success'))
        <div class="col-md-11 alert alert-success alert-dismissible fade show" role="alert">
	        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	            <span aria-hidden="true">&times;</span>
	         </button>
	         {{session('success')}}
	    </div>
    @endif

    @if (session('warning'))
        <div class=" col-md-11 alert alert-danger alert-dismissible fade show" role="alert">
	        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	            <span aria-hidden="true">&times;</span>
	         </button>
	         {{session('warning')}}
	    </div>
    @endif
    @if ($errors->first())
		<div class=" col-md-11 alert alert-danger alert-dismissible fade show" role="alert">
		  	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		    	<span aria-hidden="true">&times;</span>
		 	 </button>
		 	 {{$errors->first()}}
		</div>
	@endif
	
	<div class="row">
		<div class="col-md-6 offset-md-2">
			<form action="admin/user/update/{{$user->id}}" method="POST"  >
				@csrf
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" class="form-control" name="name" id="name" placeholder="Enter your name"	value="{{$user->name}}">
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" class="form-control" name="email" id="email" value="{{$user->email}}" >
				</div>
				<div class="form-group">
					<input type="checkbox" id="changePassword" name="changePassword" >
					<label for="changePassword"> Change Password</label>
				</div>
				<div id="password">
				</div>
				
				<button class="btn btn-success" type="submit">Update</button>
				<a href="admin/user/show" class="btn btn-primary">Back</a>
			</form>	
		</div>
	</div>



</div>


@endsection

@section('script')
<script>
	$(document).ready(function() {
		$('#changePassword').change(function(event) {
			let htmlChangePw = '<div class="form-group"><label for="newPassword">New password</label><input type="password" class="form-control" name="new_password" id="newPassword" "></div><div class="form-group"><label for="cPassword">Confirm password</label><input type="password" class="form-control" name="new_password_confirmation" id="cPassword" "></div>';
			if ($('#changePassword').is(':checked')) {
				$('#password').html(htmlChangePw);
			} else {
				$('#password').html('');
			}
			
		});
	

	});
	
</script>
@endsection