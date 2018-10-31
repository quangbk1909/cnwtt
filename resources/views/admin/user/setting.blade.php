@extends('admin.layout.index')

@section('css')
	<style>
		.btn-file {
		    position: relative;
		   	overflow: hidden;
		}
		.btn-file input[type=file] {
		    position: absolute;
		    top: 0;
		    right: 0;
		    min-width: 100%;
		    min-height: 100%;
		    font-size: 100px;
		    text-align: right;
		    filter: alpha(opacity=0);
		    opacity: 0;
		    outline: none;
		    cursor: inherit;
		    display: block;
		}

		#img-upload{
		    width: auto;
			max-width: 300px;
			height: auto;
			max-height: 300px;
		}
	</style>
@endsection

@section('content')
@if (session('success'))
	<div class="col-md-11 alert alert-success alert-dismissible fade show" role="alert">
  	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    	<span aria-hidden="true">&times;</span>
 	 </button>
 	 {{session('success')}}
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

@if (session('warning'))
	<div class=" col-md-11 alert alert-danger alert-dismissible fade show" role="alert">
  	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    	<span aria-hidden="true">&times;</span>
 	 </button>
 	 {{session('warning')}}
</div>
@endif	


<div class="row">
	<div class="col-md-2">
		<div id="list-example" class="list-group">
			<a class="list-group-item list-group-item-action active" id="update-item">Update profile</a>
			<a class="list-group-item list-group-item-action" id="change-password-item">Change password</a>
		</div>
	</div>

	<!-- Update profile content -->
	<div class="col-md-9 px-0 bg-white border" style="height: 550px;" id="update-content">
		<div class="border-bottom">
			<h2 class="m-3">Public Profile</h2>		
		</div>
		<div class="m-3">
			<form action="user/update-info" method="POST" enctype="multipart/form-data" >
				@csrf
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label for="name">Name</label>
							<input type="text" class="form-control" name="name" id="name" placeholder="Enter your name"	value="{{Auth::user()->name}}">
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" class="form-control" name="email" id="email" value="{{Auth::user()->email}}" disabled="">
						</div>
					</div>
					<div class="col-md-6 d-flex justify-content-center">
						<div class="form-group">
					        <label>Update Avatar</label>
					        <img src="{{Auth::user()->image_link}}" class="form-control" id='img-upload'/>
					        <div class="input-group">
					            <span class="input-group-btn">
					                <span class="btn btn-light my-2 btn-file">
					                    Upload... <input type="file" name="image" id="imgInp" accept="image/*" onchange="readURL(this)">
					                </span>
					            </span>
					        </div>
					        
					    </div>
					</div>
				</div>
				<button class="btn btn-success" type="submit">Update</button>
			</form>	
		</div>	
	</div>
	
	<!-- Change password content -->
	<div class="col-md-9 px-0 bg-white border" style="height: 550px;display: none; " id="change-password-content">
		<div class="border-bottom">
			<h2 class="m-3">Change Password</h2>		
		</div>
		<div class="m-3">
			<form action="user/update-password" method="POST" >
				@csrf
				<div class="row d-flex justify-content-center">
					<div class="col-md-6">
						<div class="form-group">
							<label for="old_password">Old password</label>
							<input type="password" class="form-control" name="old_password" id="old_password" placeholder="Enter your old password" required="" >
						</div>
						<div class="form-group">
							<label for="new_password">New password</label>
							<input type="password" class="form-control" name="new_password" id="new_password" placeholder="Enter your new password"	required="">
						</div>
						<div class="form-group">
							<label for="new_password_confirmation">Confirm new password </label>
							<input type="password" class="form-control" name="new_password_confirmation" id="new_password_confirmation" placeholder="Confirm new password" required="">
						</div>	
						<button class="btn btn-success" type="submit">Change password</button>
					</div>
				</div>
			</form>	
		</div>
	</div>


</div>

@endsection

@section('script')
<script>
	function readURL(input){
		if(input.files && input.files[0]){
			var reader = new FileReader();
			reader.onload = function(e){
				$('#img-upload').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);	
		}
	}

	$(document).ready(function(){
		$('#update-item').click(function(event) {
			$('#update-item').addClass('active');
			$('#change-password-item').removeClass('active');
			$('#update-content').show();
			$('#change-password-content').hide();
		});
		$('#change-password-item').click(function(event) {
			$('#change-password-item').addClass('active');
			$('#update-item').removeClass('active');
			$('#change-password-content').show();
			$('#update-content').hide();
		});

	});
</script>
@endsection