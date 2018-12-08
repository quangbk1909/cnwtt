@extends('admin.layout.index')


@section('content')

<!-- Page Content -->
<div class="bg-white p-3">
    <div class="row">
        <div class=" offset-md-1 col-md-9 mr-auto">
            <h1><strong>Permission</strong>
                <small>{{$user->name}}({{$user->email}})</small>
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

    <div class="row ">
        <div class="col-md-6 offset-md-2">
            <form action="admin/user/permission/{{$user->id}}" method="POST">
                @csrf
                <div class="form-group">
                    <label for="role"><strong>Role</strong></label>
                    <select class="form-control" name="role" id="role">
                        @foreach ($roles as $role)
                            <option value="{{$role->id}}" @if ($user->role->id == $role->id)
                                selected="" 
                            @endif >{{$role->name}}</option>
                        @endforeach

                    </select>
                </div>    
                <div class="form-group">
                    <label for="category_parent"><strong>Add permission</strong></label>
                    <div id="permission">
                        @if ($user->inRole('admin'))
                            <p>Administration has all permission</p>
                        @else
                            <div class="form-control" style=" height: 200px; overflow-y: scroll;">
                            @foreach ($user->permission as $permission)
                                <input type="checkbox" name="newPermission[]" value="{{$permission->id}}" checked=""> {{$permission->action}} <br>
                            @endforeach
                            @foreach ($permissionNotInRole->diff($user->permission) as $permission)
                                 <input type="checkbox" name="newPermission[]" value="{{$permission->id}}"> {{$permission->action}}<br>
                            @endforeach
                            </div>
                        @endif        
                    </div>           
                </div>
                
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="admin/user/show" class="btn btn-light m-2">Back</a>

            </form>    
        </div>
        
        
    </div>

    
</div>

@endsection

@section('script')
    <script>
        $(document).ready(function() {
            var idRole = $('select').val();

            $('select').change(function(event) {
                idRole = $('select').val();
                $.get('admin/user/ajax/changerole',{idUser : {{$user->id}} , idRole : idRole }, function(data) {
                    $('#permission').html(data);
                });
            });
        });

    </script>
@endsection