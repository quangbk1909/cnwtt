@extends('admin.layout.index')


@section('content')

<!-- Page Content -->
<div class="bg-white p-3">
    <div class="row">
        <div class=" offset-md-1  mr-auto">
            <h1><strong>Statistical</strong>
            </h1>
        </div>

    </div>
    <hr>


  
    <!-- content -->

    <div class="row">
    	<div class="offset-md-1">
    		<h4>Blog overview chart</h4>
    	</div>
    	<div class="col-md-10 offset-md-1" id="chartContainer" style="height: 370px; width: 100%;"></div>
    </div>
    <hr>
    <div class="row">
    	<div class="offset-md-1 col-md-10">
    		<h4>Average statistics</h4>
    		<br>
    		<div class="row">
    			<div class="col-md-2 offset-md-1">
    				<h5>Common : </h5>
	    			<div class="row">
	    				<h6>Number user register per day : <strong class=" p-md-3 text-danger">{{$userPerDay}}</strong> </h6>
	    			</div>
	    			<div class="row">
	    				<h6>Number post publish per day : <strong class=" p-md-3 text-danger">{{$postPerDay}}</strong> </h6></h6>
	    			</div>
	    		</div>
	    		<div class="col-md-2 offset-md-1">
	    			<h5>Post : </h5>
	    			<div class="row">
	    				<h6>Number  view per post : <strong class=" p-md-3 text-danger">{{$viewPerPost}}</strong> </h6>
	    			</div>
	    			<div class="row">
	    				<h6>Number vote  per post : <strong class=" p-md-3 text-danger">{{$votePerPost}}</strong> </h6></h6>
	    			</div>
	    		</div>
    		</div>
    	</div>
    </div>

	
</div>

@endsection

@section('script')
	<script>
		
		window.onload = function () {
			var dateCreatedUser;
			var dateCreatedPost;
			jQuery.ajaxSetup({async:false});
			$.get('admin/user/data-point', function(data){
				dateCreatedUser = JSON.parse(data);
			});

			$.get('admin/post/data-point', function(data){
				dateCreatedPost = JSON.parse(data);
			});

			dateCreatedUser.forEach(function(cValue){
				cValue.date = new Date(cValue.date);
			});

			dateCreatedPost.forEach(function(cValue){
				cValue.date = new Date(cValue.date);
			});

			
			
			var startDateUser = dateCreatedUser[0].date;
			var startDatePost = dateCreatedPost[0].date;
			var currentDate = new Date();
			var dataChartUser = [];
			var dataChartPost = [];
			var dateCreatedUserIndex = 0;
			var dateCreatedPostIndex = 0;

			for (var i = startDateUser;	 i < currentDate; i.setDate(i.getDate() + 1)){
				//console.log(dateCreatedUser);
				if (dateCreatedUser[dateCreatedUserIndex] != null){
					if (i.getTime() == dateCreatedUser[dateCreatedUserIndex].date.getTime()) {
						dataChartUser.push({x: new Date(dateCreatedUser[dateCreatedUserIndex].date.getTime()), y : dateCreatedUser[dateCreatedUserIndex].number})
						 dateCreatedUserIndex += 1;
					}else{
						dataChartUser.push({x : new Date(i.getTime()), y: 0 });
					} 	
				} else{
						dataChartUser.push({x : new Date(i.getTime()), y: 0 });
					} 						
			}


			for (var i = startDatePost;	 i < currentDate; i.setDate(i.getDate() + 1)){
				//console.log(dateCreatedUser);
				if (dateCreatedPost[dateCreatedPostIndex] != null){
					if (i.getTime() == dateCreatedPost[dateCreatedPostIndex].date.getTime()) {
						dataChartPost.push({x: new Date(dateCreatedPost[dateCreatedPostIndex].date.getTime()), y : dateCreatedPost[dateCreatedPostIndex].number})
						 dateCreatedPostIndex += 1;
					}else{
						dataChartPost.push({x : new Date(i.getTime()), y: 0 });
					} 	
				} else{
						dataChartPost.push({x : new Date(i.getTime()), y: 0 });
					} 	
				
								
			}


			var options = {
				animationEnabled: true,
				theme: "light2",
				title:{
					text: "Number of new user register and post publish"
				},
				axisX:{
					valueFormatString: "DD MMM"
				},
				axisY: {
					title: "Number",
					minimum: 0
				},
				toolTip:{
					shared:true
				},  
				legend:{
					cursor:"pointer",
					verticalAlign: "bottom",
					horizontalAlign: "left",
					dockInsidePlotArea: true,
					itemclick: toogleDataSeries
				},
				data: [{
					type: "line",
					showInLegend: true,
					name: "User",
					markerType: "square",
					xValueFormatString: "DD MMM, YYYY",
					color: "#F08080",
					yValueFormatString: "#,##0",
					dataPoints: dataChartUser
				},
				{
					type: "line",
					showInLegend: true,
					name: "Post",
					lineDashType: "dash",
					yValueFormatString: "#,##0",
					dataPoints: dataChartPost
				}]
			};
			$("#chartContainer").CanvasJSChart(options);

			function toogleDataSeries(e){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}

		}
	</script>
	<script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>

@endsection