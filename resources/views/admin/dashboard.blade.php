@extends('admin.layout.index')

@section('content')
	<div class="row " style="height: 300px;">
		<div class="col-md-12 my-auto text-center">
			<h1>Welcome to CMS VCcorp</h1>	
			<p>Choose the feature on sidebar to continue!!</p>
			<a href="/" class="btn btn-primary">Back to Homepage</a>
		</div>	
	</div>
	@yield('error')	

@endsection