$(document).ready(function(){

    $("#update").hide();

    assignDataToTable();

    $('table').on('click', 'button[id="delete"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       
       $.ajax({
            type:"DELETE",
            url:"http://localhost:8080/api/users/" + id,
            success: function(data){
                alertUsing("delete.", true);
                assignDataToTable();
            },
            error: function(err) {  
                console.log(err);
                alert(err);
            }
        });

    })

    $('table').on('click', 'button[id="edit"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       var name = $(this).closest('tr').children('td:nth-child(2)').text(); 
       var time = $(this).closest('tr').children('td:nth-child(3)').text(); 
       var visit = $(this).closest('tr').children('td:nth-child(4)').text();
       var vehicle = $(this).closest('tr').children('td:nth-child(5)').text();	   

        $("#name").val(name);
        $("#time").val(time);
        $("#visit").val(visit);
		$("#vehicle").val(vehicle);

        $("#update").show();
        $("#save").hide();

        $("#update").click(function() {

       
            var jsonVar = {
                name: $("#name").val(),
                time: $("#time").val(),
				vehicle:$("#vehicle").val(),
                visit: $("#visit").val()
				
            };

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"http://localhost:8080/api/users/" + id,
                success: function(data){
                    alertUsing("Update.", true);
                    $("#update").hide();
                    $("#save").show();
                    $("#name").val("");
                    $("#time").val("");
                    $("#visit").val("");
					$("#vehicle").val("");
                    assignDataToTable();
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });

    });

    })

    var time = $("#time");

    time.keypress(function(key){
        
    });

    $("#save").click(function() {

        var jsonVar = {
            name: $("#name").val(),
            time: $("#time").val(),
            visit: $("#visit").val(),
			vehicle: $("#vehicle").val()
			
        };

        $.ajax({
            type:"POST",
            url:"http://localhost:8080/api/users",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });

    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:8080/api/users",
          success: function(data) {
            var users = JSON.parse(JSON.stringify(data));
            for (var i in users) {
                $("tbody").
                append("<tr> \
                            <td>" +  users[i].id + "</td> \
                            <td>" +  users[i].name + "</td> \
                            <td>" +  users[i].time + "</td> \
                            <td>" +  users[i].visit + "</td> \
							<td>" +  users[i].vehicle + "</td> \
                            <td> \ <button id='delete' class='btn btn-danger'>delete</button> \
                           <button id='edit' class='btn btn-warning'>Edit</button> \ </td> \
                        </tr>");
            }
          },
          error: function(data) { 
            console.log(data);
            }
        });
       
    }

function alertUsing(text, flag) {

    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }

});