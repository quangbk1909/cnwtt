<nav id="sidebar" class="border">
    <div class="sidebar-header text-center border-bottom">
        <h3>HustBlog</h3>
        <strong>VC</strong>
    </div>

    <ul class="list-unstyled components ">
        <li>
            <a href="admin">
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
                    <a href="admin/user/myprofile">My profile</a>
                </li>
                @can('user.view')
                <li>
                    <a href="admin/user/show">List</a>
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
                    <a href="admin/post/show" class="active">List</a>
                </li>
                <li>
                    <a href="admin/post/create">Create</a>
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
                    <a href="admin/category/show" class="active">List</a>
                </li>
                @can('category.create')
                <li>
                    <a href="admin/category/create">Create</a>
                </li>
                @endcan
            </ul>
        </li>
        <li>
            <a href="#authorizationSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="fas fa-key"></i>
                <span>Role</span>
            </a>
            <ul class="collapse list-unstyled" id="authorizationSubmenu">
                <li>
                    <a href="admin/role/show" class="active">List</a>
                </li>
                @can('role.create')
                <li>
                    <a href="admin/role/create">Create</a>
                </li>
                @endcan
            </ul>
        </li>
        <li>
            <a href="admin/statistical">
                <i class="fas fa-chart-line"></i>
                <span>Statistical</span>
            </a>
        </li>
    </ul>
</nav>