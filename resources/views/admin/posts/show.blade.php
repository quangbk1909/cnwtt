@extends('admin.layout.index')

@section('css')
    <style>
        #example td a{
            color: #697F85;
        }

        #example td p{
            color: #3F3F3F;
            font-size : 1rem;
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
            <h1><strong>Post</strong>
                <small>List</small>
            </h1>
        </div>
        <div class="col-md-2 d-flex align-content-center justify-content-center p-2">
            <a href="admin/post/create" class="btn btn-primary">Create new post</a>  
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

    <!-- Table data -->
    <form action="admin/post/delete/all" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="row my-2">
            <div class="col-md-12">
                <button class="btn btn-light" type="button" ><input type="checkbox" id="bulk-all" > <label class="m-0" for="bulk-all">Bulk all</label></button>
                <button type="submit" class="btn btn-light"><i class="fas fa-trash-alt"></i></button> 
            </div>  
        </div>
        
        <table id="example" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Bulk</th>
                    <th>Name</th>
                    <th>Content</th>
                    <th>Status</th>
                    <th>Vistibility</th>
                    <th>Image</th>
                    <th>Create</th>
                    <th>Update</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($posts as $post)
                    <tr>
                        <td><input type="checkbox" name="bulked[]" class="sub-chk" value="{{$post->id}}"></td>
                        <td>{{$post->title}}</td>
                        <td>{!!substr($post->content,0,100)!!} ...</td>
                        <td>
                            @if ($post->status == 0)
                                Draft
                            @else
                                Complete
                            @endif
                        </td>
                        <td>
                            @switch($post->visibility)
                                @case(0)
                                    Private
                                    @break
                                @case(1)
                                    Public
                                    @break
                                @case(2)
                                    Follower
                                    @break
                            @endswitch   
                        </td>
                        <td><img height="100" width="100" src="{{$post->image_path.$post->image_name}}" alt=""></td>
                        <td>{{$post->created_at}}</td>
                        <td>{{$post->updated_at}}</td>
                        <td width="130"><a href="admin/post/edit/{{$post->id}}"><i class="fas fa-pencil-alt"></i> Edit</a> | <a href="admin/post/delete/{{$post->id}}"  onclick="return confirm('Are you sure to delete this post?');"><i class="fas fa-trash-alt"></i> Delete</a></td>
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