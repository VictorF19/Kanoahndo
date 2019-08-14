function btnIncluirRotina()
{
    let textBox = $('#ip1').val();
    let textBox1 = $('#ip2').val();
    let obj = {}
    let strobj = ''
    let url = "/objetos"
    let success = function(data){alert(data)}
    let error = function(data){alert(data)}

    if (textBox.trim() == '' || textBox1.trim() == '')
    {
        alert("Verifique se os campos foram preenchidos.")

        return
    }

    obj.nome = textBox + ' - ' + textBox1

    strobj = JSON.stringify(obj)

    $.ajax({
    type: "POST",
    url: url,
    data: strobj,
    success: success,
    dataType: 'json',
    contentType: 'application/json',
    error: error
    }); 
    
    return
}