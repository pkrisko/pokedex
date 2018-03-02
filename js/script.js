/* As the document is loaded, 150 different img html tags are created where
  the src value is a slight manipulation each time, utilizing the conveneint
  index from a for loop. */
function createImageElements() {
    for (var idx = 1; idx < 150; idx++) {
        var element = "<img src=\"http://pokeapi.co/media/img/" + idx + ".png\" id=\"pokemon/" + idx + "/\">";
        $('#imagearea').append(element);
    }
}
/* Makes a request to PokeApi v2 and extracts information from the .json
   file response. */
function requestify() {
    var baseurl = "https://pokeapi.co/api/v2/";
    baseurl += $(this).attr('id');
    $.get(baseurl, function (res) {
        /* Retrieve the name, modify it, and add it */
        var pokeName = res["name"];
        pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
        $('#namearea h1').remove();
        $('#namearea').append("<h1>" + pokeName + "</h1>");
        $('#namearea h4').remove();
        $('#namearea').append("<h4>ID: " + res["id"] + "</h4>");
        /* Retrieve types and modify the HTML */
        var typesL = "<ul>"
        for (idx = 0; idx < res["types"].length; idx++)
            typesL += "<li>" + res["types"][idx]["type"]["name"] + "</li>";
        typesL += "</ul>";
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
    /* Even though this code is last, there is no API information being
    manipulated, and therefore this image displays first. */
    $('#iconarea img').remove();
    var img = "<img src=" + $(this).attr("src") + ">";
    $('#iconarea').append(img);
}

$(document).ready(function () {
    createImageElements();
    /* When one of the dynamically created images is clicked, the requestify
    method is called (see above). */
    $('#imagearea img').on('click', requestify);
});