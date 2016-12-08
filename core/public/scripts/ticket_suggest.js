$( document ).ready(function() {

		$.ajaxSetup({
				async: false
		});

		$.get("/scripts_loads/ticket_suggest.htm", function (data) {
			$('#ticket_info').after(data)
		}).done(function(){console.log('HTM LOADED')})

		var id = window.location.pathname.split( '/' )[2]

		$.getJSON('/suggest_tickets/'+id).done(function(data){
			console.log(data)
			$.each( data, function( i ,obj ) {
				$("#other_tickets ul").append("<li class='list-group-item'><a href='/ticket/"+obj.id+"'>"+obj.name+"</a></li>")
				console.log(obj.name)
			})

		})

		$.ajaxSetup({
        async: true
    });
});
