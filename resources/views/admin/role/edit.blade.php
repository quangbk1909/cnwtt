@extends('admin.layout.index')


@section('content')

<!-- Page Content -->
<div class="bg-white p-3">
    <div class="row">
        <div class=" offset-md-1 col-md-9 mr-auto">
            <h1><strong>Role {{$role->name}}</strong>
                <small>Update</small>
            </h1>
        </div>
        <div class="col-md-2 d-flex align-content-center justify-content-center p-2">
            <a href="admin/role/show" class="btn btn-primary">Back to list</a>  
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

    <div class="row ">
        <div class="offset-md-3 col-md-6">
            <form action="admin/role/edit/{{$role->id}}" method="POST">
                @csrf
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" required="" placeholder="Enter role name" value="{{$role->name}}">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" name="description" required="" placeholder="Enter role description" value="{{$role->description}}">
                </div>
                <div class="form-group">
                    <label for="permission">Permission of role</label>
                    <div id="permission">
                        <div class="form-control" style=" height: 200px; overflow-y: scroll;">
                            @foreach ($role->permission as $permission)
                                <input type="checkbox" name="newPermission[]" value="{{$permission->id}}" checked=""> {{$permission->action}} <br>
                            @endforeach
                            @foreach ($permissions->diff($role->permission) as $permission)
                                 <input type="checkbox" name="newPermission[]" value="{{$permission->id}}"> {{$permission->action}}<br>
                            @endforeach
                            </div>        
                    </div>
                </div>    
                                
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="admin/role/show" class="btn btn-light m-2">Back</a>

            </form>    
        </div>
        
        
    </div>

    
</div>

@endsection

