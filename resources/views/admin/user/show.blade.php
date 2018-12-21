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
            <h1><strong>User</strong>
                <small>List</small>
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
        <div class=" col-md-11 alert alert-warning alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
         {{session('warning')}}
    </div>
    @endif

    <!-- Table data -->
    <form action="admin/user/delete/all" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="row my-2">
            <div class="col-md-12">
                <button class="btn btn-light" type="button" ><input type="checkbox" id="bulk-all" > <label class="m-0" for="bulk-all">Bulk all</label></button>
                <button type="submit" onclick="return confirm('Are you sure to delete all user bulked?');" class="btn btn-light"><i class="fas fa-trash-alt"></i></button> 
            </div>  
        </div>
        
        <table id="example" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Bulk</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td><input type="checkbox" name="bulked[]" class="sub-chk" value="{{$user->id}}"></td>
                        <td>{{$user->name}}</td>
                        <td>{{$user->email}}</td>
                        <td>
                            @if ($user->verified == 0)
                                Unverified
                            @else
                                Verified
                            @endif
                        </td>
                        <td>{{$user->description}}</td>
                        <td>
                            @if($user->role){
                                {{$user->role->name}}
                            }
                            @endif
                        </td>
                        <td>{{$user->created_at}}</td>
                        <td>{{$user->updated_at}}</td>
                        <td width="150"><a href="admin/user/permission/{{$user->id}}"><i class="fas fa-exclamation-triangle"></i> Authorize</a> | <a href="admin/user/update/{{$user->id}}"><i class="fas fa-pencil-alt"></i> Update</a> | <a href="admin/user/delete/{{$user->id}}" onclick="return confirm('Are you sure to delete user?');"><i class="fas fa-trash-alt"></i> Delete</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </form>
    <!-- Table -->
    
</div>

@endsection

@section('script')
    <script>
        var listSubChk = $('.sub-chk');
        var flagChecked = true;
        
        $(document).ready(function (){
            $('#bulk-all').on('click', function(event) {
                if ($('#bulk-all').prop('checked') == true) {
                    $('.sub-chk').prop('checked', true);
                } else {
                    $('.sub-chk').prop('checked', false);
                }
            });

            var checkBulkAll = function() {
                for (var i = 0; i < listSubChk.length; i++) {
                    //console.log($(listSubChk[i]).prop('checked'));
                    if ($(listSubChk[i]).prop('checked') == false ){
                        flagChecked = false;
                        break;
                    }
                }

                if (flagChecked == true) {
                    return $('#bulk-all').prop('checked', true);
                }else {
                    return $('#bulk-all').prop('checked', false);       
                }
            }
            checkBulkAll();

            $('#example').on('draw.dt', function() {
                listSubChk = $('.sub-chk');
                flagChecked = true;
                checkBulkAll();
            });

            listSubChk.click( function(event) {
                listSubChk = $('.sub-chk');
                flagChecked = true;
                checkBulkAll();
            });
        });

    </script>

@endsection