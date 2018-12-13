<li>
	<span>
		@if ($category->hasChildren())
			<i class="fas fa-plus"></i>
		@endif	
		{{$category->name}}
	</span>
	@if ($category->hasChildren())
		<ul>
		@foreach ($category->currentChild() as $category)
			@include('admin.category.treeview', $category)
		@endforeach
	</ul>
	@endif
	
</li>