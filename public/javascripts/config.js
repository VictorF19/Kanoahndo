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

    document.getElementById('newOperationCard').className = "card card-primary collapsed-card";

    if (id != '')
    {    
        //$('#newOperationCard').card('show');     
        $.get(`/operacoes/${id}`, (data) => {
            
            let objRes = '';
            let p = undefined;
            let node;
            let i = 0;
            let element = document.getElementById("operacoes1");

            element.innerHTML = '';
            p = document.createElement('p');
            objRes = JSON.parse(data);
            console.log(objRes);

            objRes.forEach((item ) => {
                let myDiv = document.createElement("div");

                myDiv.innerHTML =   "<div class=\"row\">"
                                    +"<div class=\"col-md-12\">"        
                                        + `<div id=id${item.id} class=\"card collapsed-card \">`
                                            + "<div class=\"card-header\">" 
                                                + "<h5 class=\"card-title\" style=\"font-weight: bold;\"> " + item.nome + "</h5>"
                                                + "<div class=\"card-tools\">"
                                                    + `<button type=\"button\" class=\"btn btn-tool\" data-card-widget=\"collapse\" onclick=\"loadText(${item.id}, ${i})\">`
                                                        + "<i class=\"fas fa-plus\">" + "</i>" 
                                                    + "</button>"                                                 
                                                + "</div>"
                                            + "</div>"
                                            + "<div class=\"card-body\">"
                                                + `<textarea id=\"#textoRotina${i}\" class=\"col-md-12\" rows=\"10\">`
                                                + "</textarea>"
                                            + "</div>"
                                            + "<div class=\"card-footer\">"
                                                + `<button type=\"button\" class=\"btn btn-danger\" style=\"float:right\" onclick="deleteOperation(${item.id})">`
                                                    + "<i class=\"fas fa-trash\">" + "</i>" 
                                                + `<button type=\"button\" class=\"btn btn-primary\" style=\"float:left\" onclick="updateText()"> Salvar texto`
                                            + "</div>"
                                        + "</div>"
                                    + "</div>"
                                + "</div>";

                element.appendChild(myDiv);
                i++;
    
            })
        })
    }
}

function loadText(id, i)
{
    if(id != '')
    {
        var x = document.getElementById(`#textoRotina${i}`).value;

        if(x == ''){

            // faz requisição do texto
            $.get(`/texto/${id}`, (data) => {
                document.getElementById(`#textoRotina${i}`).value = data;
                console.log(data);
            }); 
        }
        
    }
} 


function updateText(){


}

function insertOperation(){

    let operationName = document.getElementById('operationName').value;
    let operationText = document.getElementById('operationText').value;
    let routineId =  parseInt(document.getElementById('comboRotina').value); 
    let url = "/operacoes"
    let textUrl = "/texto"
    let obj = {};
    let strobj = '';
    let error = '';
    let textObj = {};
    let strTextObj = '';

    console.log(operationName + ' '+ routineId);

    obj.id_objeto = routineId;
    obj.nome = operationName;
    strobj = JSON.stringify(obj);

    if(operationName == '' || operationText == ''){

        alert('Verifique se os campos estão preenchidos.');
    }
    else{
        $.ajax({
            type: "POST",
            url: url,
            data: strobj,
            success: function(result){

                textObj.id_operacao =  result.obj.id;
                textObj.texto = operationText;

                strTextObj = JSON.stringify(textObj);
                $.ajax({
                    type: "POST",
                    url: textUrl,
                    data: strTextObj,
                    success: function(result){
                        console.log('Texto da operação gravado com sucesso.');
                    },
                    dataType: 'json',
                    contentType: 'application/json',
                    error: error
                    }); 
             },
            dataType: 'json',
            contentType: 'application/json',
            error: error
            }); 
    }
    return
}

function deleteOperation(id){

    let obj;
    obj = {id:id};
    let strobj = '';
    let success = '';
    let error = '';
    let divRemoved;
    console.log(id);
    $('#deleteOperationModal').modal('show');
    console.log(id);

    strobj = JSON.stringify(obj);   
    
    $('button[name="btnDelete"]').on('click', async function(e) {
        
        $.ajax({
            dataType: 'json',
            contentType: 'application/json',
            url: '/operacoes',
            type: 'DELETE',
            success: function(result){
                $("#id"+id).remove();
                $('#deleteOperationModal').modal('hide');
            },
            error: error,
            data: strobj
        });
    })
}