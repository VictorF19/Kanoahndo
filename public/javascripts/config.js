function btnIncluirRotina()
{
    let textBox = $('#ip1').val();
    let textBox1 = $('#ip2').val();
    let obj = {}
    let strobj = ''
    let url = "/objetos"
    let success = ''
    let error = ''

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
    
    $('#mymodal').modal('hide');

    console.log(strobj);

    return
}

function btnRemoverRotina(id){

    let obj = {}
    let strobj = ''
    let url = "/objetos"
    let success = ''
    let error = ''

    obj.id = id;

    strobj = JSON.stringify(obj)

    if (confirm('Deseja excluir a rotina?')){

        $.ajax({
            type: "DELETE",
            url: url,
            data: strobj,
            success: success,
            dataType: 'json',
            contentType: 'application/json',
            error: error
            }); 

    }  
    else{


    }

    return
}

function alteraRotina(id,nome){

    let obj = {}
    let strobj = ''
    let url = "/objetos"
    let success = ''
    let error = ''

    obj.id = id;
    obj.nome = nome;
    strobj = JSON.stringify(obj)

        $.ajax({
            type: "PUT",
            url: url,
            data: strobj,
            success: success,
            dataType: 'json',
            contentType: 'application/json',
            error: error
            }); 

    return
}

function carregaOperacoes(id){

    var i;
    console.log(id);

    if (id != '')
    {         
        $.get(`/operacoes/${id}`, (data) => {
            
            let objRes = '';

            objRes = JSON.parse(data);

            let p = undefined;
            let node;

            let element = document.getElementById("operacoes1");

            element.innerHTML = '';

            p = document.createElement('p');


            console.log(objRes);
            objRes.forEach((item ) => {

                console.log(item.id);
                console.log(item.nome);

                let myDiv = document.createElement("div");

                let texto = getTexto(item.id);
                myDiv.innerHTML =   "<div class=\"row\">"
                                    +"<div class=\"col-md-12\">"        
                                        + "<div class=\"card collapsed-card \">"
                                            + "<div class=\"card-header\">" 
                                                + "<h5 class=\"card-title\" style=\"font-weight: bold;\"> " + item.nome + "</h5>"
                                                + "<div class=\"card-tools\">"
                                                    + "<button type=\"button\" class=\"btn btn-tool\" data-card-widget=\"collapse\" onclick=teste()>"
                                                        + "<i class=\"fas fa-plus\">" + "</i>" 
                                                    + "</button>"
                                                + "</div>"
                                            + "</div>"
                                            + "<div class=\"card-body\">"
                                                + "<p>" + texto
                                                + "</p>"
                                            + "</div>"
                                        + "</div>"
                                    + "</div>"
                                + "</div>";
                 
                element.appendChild(myDiv);
    
            })
        })
    }
}

function getTexto(id)
{
    if(id != '')
    {
        // faz requisição do texto
        $.get(`/texto/${id}`, {async: false},(data) => {
    
            console.log(data);
            return data;
        });

    }
} 

function teste(){

    alert('a');
}