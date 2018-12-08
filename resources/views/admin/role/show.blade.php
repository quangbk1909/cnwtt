@extends('admin.layout.index')

@section('css')
    <style>
        #example td a{
            color: #697F85;
        }
         #example td a:hover{
            color: #000;
        }
    </style>
@endsection
@section('content')

<!-- Page Content -->
<div class="bg-white p-3">
    <div class="row">
        <div class=" offset-md-1 col-md-9 mr-auto">
            <h1><strong>Role</strong>
                <small>List</small>
            </h1>
        </div>
        <div class="col-md-2 d-flex align-content-center justify-content-center p-2">
            <a href="admin/role/create" class="btn btn-primary">New role</a>  
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
        <div class=" col-md-11 alert alert-warning alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
         {{session('warning')}}
    </div>
    @endif

    <!-- Table data -->
        <table id="example" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($roles as $role)
                    <tr>
                        <td>{{$role->name}}</td>
                        <td>{{$role->description}}</td>
                        <td ><a href="admin/role/update/{{$role->id}}"><i class="fas fa-pencil-alt"></i> Update</a> | <a href="admin/role/delete/{{$role->id}}" onclick="return confirm('Are you sure to delete user?');"><i class="fas fa-trash-alt"></i> Delete</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </form>
    <!-- Table -->
    
</div>

@endsection
