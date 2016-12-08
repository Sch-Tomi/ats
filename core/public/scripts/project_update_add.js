$(document).ready(function() {

	$("#add_staff_form select").hide()
	$("#add_staff_form select").after('<input type="text" class="form-control" placeholder="Search for..." id="user_select" list="user_select_list">')
	$("#add_staff_form select").after('<datalist id="user_select_list"></datalist>')
	$("#add_staff_form select option").each(function(id, obj){
		console.log($(obj).text());
		console.log($(obj).val())
		$('#user_select_list').append('<option value-id="'+$(obj).val()+'" value="'+$(obj).text()+'">')
	})

	$('#user_select').bind('input', function () {
		console.log($('#add_staff_form select').find('option:contains("'+$(this).val()+'")').length)

		if($('#add_staff_form select').find('option:contains("'+$(this).val()+'")').length == 1){
			$('#add_staff_form select').val($('#add_staff_form select').find('option:contains("'+$(this).val()+'")').val())
		}
	})

})
