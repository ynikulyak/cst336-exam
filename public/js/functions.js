$(document).ready(function() {
  $("#continue").hide();
  $(".submit").on("click", function() {
  
      var radioValue = $("input[name='seal']:checked").val();
      if (radioValue == "seal2") {
        $(".container").css("background-color", "green");
        $(".container").append("<img src='img/checkmark.png'>");
        $(".container").append("<h1>Right!</h1>");
        $("#score").append("<h1>Partial Score: 5</h1>");
        $("#submit").hide();
        $("#continue").show();
        $("#input-continue").css('background-color', '#00FF00');
        updateDB($('input:email[name=mail]').val(), 5)

      } else {
        $(".container").css("background-color", "red");
        $(".container").append("<img src='img/xmark.png'>");
        $(".container").append("<h1>Wrong!</h1>");
        $("#score").append("<h1>Partial Score: 0</h1>");
        $("#submit").hide();
        $("#continue").show();
        $("#input-continue").css('background-color', '#00FF00');
        updateDB$($('input:email[name=mail]').val(), 0)

      }
    });
  
 
  
  function updateDB(email, score){
	$.ajax({
		method: "get",
		url: "/api/updateDB",
		data: {"email": email,
				"score": score} //params that the rout is expecting
	});
}
});