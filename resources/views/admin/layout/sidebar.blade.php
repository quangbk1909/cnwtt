<nav id="sidebar" class="border">
    <div class="sidebar-header border-bottom">
        <h3>CMS VCcorp</h3>
        <strong>VC</strong>
    </div>

    <ul class="list-unstyled components ">
        <li>
            <a href="dashboard">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="fas fa-user"></i> 
                <span>User</span>
            </a>
            <ul class="collapse list-unstyled" id="userSubmenu">
                <li>
                    <a href="user/myprofile">My profile</a>
                </li>
                @can('user.view')
                    <li>
                        <a href="user/show">Show</a>
                    </li>
                @endcan
                @can('user.create')
                    <li>
                        <a href="#">Create</a>
                    </li>
                @endcan
                
            </ul>
        </li>
        <li >
            <a href="#postSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="fas fa-edit"></i> 
                <span>Post</span>
            </a>
            <ul class="collapse list-unstyled" id="postSubmenu">
                <li>
                    <a href="post/show" class="active">Show</a>
                </li>
                <li>
                    <a href="post/create">Create</a>
                </li>
            </ul>
        </li>
        <li >
            <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="fas fa-list-ul"></i>
                <span>Category</span>
            </a>
            <ul class="collapse list-unstyled" id="categorySubmenu">
                <li>
                    <a href="category/show" class="active">Show</a>
                </li>
                <li>
                    <a href="category/create">Create</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#">
                <i class="fas fa-puzzle-piece"></i>
                <span>Modul</span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fas fa-walking"></i>
                <span>Actions</span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fas fa-book"></i>
                <span>Role</span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fas fa-key"></i>
                <span>Authorization</span>
            </a>
        </li>
    </ul>
</nav>