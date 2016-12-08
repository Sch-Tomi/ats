$(document).ready(function() {
  var id = window.location.pathname.split('/')[3]

  $.ajaxSetup({
    async: false
  });

  var profile = ""

  $.get("/scripts_loads/profile.htm", function(data) {
    profile = data
  }).done(function() {
    //console.log('HTM LOADED')
  })

  //console.log(profile)

  $("#delete_staff .panel-body").children().hide()


  $.getJSON('/staffs/' + id).done(function(data) {

    $("#delete_staff .panel-body").append("<div class='container-fluid'><div id='pofile_row' class='row'></div></div>")

    $.each(data, function(i, obj) {

      var $current_profile = $(profile)

      $current_profile.find(".panel-footer p").append(obj.firstname + " " + obj.lastname + "\n(" + obj.username + ")")
      $current_profile.find(".panel-footer a").attr('href', '/profile/' + obj.id)
      $current_profile.find(".panel-body a").on('click', function() {

				var id = $($(this).parents('div.panel.panel-default')[0]).find('div.panel-footer a').attr('href').split('/')[2]
				$('#delete_staff_form select').val(id)
				$('#delete_staff_form').submit()
      });

      $current_profile.appendTo("#pofile_row")

    })

  })


  $.ajaxSetup({
    async: true
  });

});
