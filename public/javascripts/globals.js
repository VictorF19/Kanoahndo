$(window).bind("beforeunload", function() { 
    if ($("#textoRotina").val().length > 0 || $("#textoCT").val().length > 0)
    return "Do you really want to close?";
})