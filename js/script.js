$(document).ready(function () {
    for (var idx = 1; idx < 150; idx++){
        var element = "<img src=\"http://pokeapi.co/media/img/" + idx + ".png\" id=\"pokemon/" + idx + "/\">"
        $('#imagearea').append(element);
    }
    
    function requestify() {
        var baseurl = "https://pokeapi.co/api/v2/";
        baseurl+= $(this).attr('id');
        $.get(baseurl, function(res) {
            /* Retrieve types and modify the HTML */
            var typesL = "<ul>"
            for (idx = 0; idx < res["types"].length; idx++)
                typesL += "<li>" + res["types"][idx]["type"]["name"] + "</li>";
            typesL+= "</ul>";
            $('#typesarea ul').remove();
            $('#typesarea').append(typesL);
            /* Retrieve height and weight, modiftying the HTML */
            var height = "<p>" + res["height"] + "</p>"; 
            $('#heightarea p').remove();
            $('#heightarea').append(height);
            var weight = "<p>" + res["weight"] + "</p>"; 
            $('#weightarea p').remove();
            $('#weightarea').append(weight);
        });
        $('#iconarea img').remove();
        var img = "<img src=" + $(this).attr("src") + ">";
        $('#iconarea').append(img);
    }
    
    $('img').on('click', requestify);

    
});