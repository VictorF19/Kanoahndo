var host = '10.172.66.126';

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
        
        $('#mymodal').modal('hide');
        toastr.error("Verifique se os campos foram preenchidos.")

        return
    }

    obj.nome = textBox + ' - ' + textBox1

    strobj = JSON.stringify(obj)

    $.ajax({
    type: "POST",
    url: url,
    data: strobj,
    success: function(result){
        $('#mymodal').modal('hide');
        //alert('Rotina incluída com sucesso.');
        toastr.success('Rotina incluída com sucesso.');
        window.location.href= 'http://'+host+':3000/config';
    },
    dataType: 'json',
    contentType: 'application/json',
    error: error
    }); 

    console.log(strobj);

    return
}

function btnRemoverRotina(){

    let RoutineId = document.getElementById('comboRotina').value;
    let obj = {}
    let strobj = ''
    let url = "/objetos"
    let success = ''
    let error = ''

    obj.id = parseInt(RoutineId);

    strobj = JSON.stringify(obj);

    if (confirm('Deseja excluir a rotina?')){

        $.ajax({
            type: "DELETE",
            url: url,
            data: strobj,
            success: function(result){
                $('#deleteRoutineModal').modal('hide');
                alert('Rotina e todas suas operações foram excluídas com sucesso.');
                window.location.href= 'http://'+host+':3000/config';

            },
            dataType: 'json',
            contentType: 'application/json',
            error: error
            }); 

    }  
    else{


    }

    return
}

function alteraRotina(){

    let textBox = $('#up1').val();
    let textBox1 = $('#up2').val();
    let RoutineId = document.getElementById('comboRotina').value;
    
    let obj = {}
    let strobj = ''
    let url = "/objetos"
    let success = ''
    let error = ''

    obj.id = parseInt(RoutineId);
    obj.nome = textBox + ' - ' + textBox1;
    strobj = JSON.stringify(obj)

        $.ajax({
            type: "PUT",
            url: url,
            data: strobj,
            success: function(result){
                $('#updateRoutineModal').modal('hide');
                alert('Rotina atualizada com sucesso.');
                window.location.href= 'http://'+host+':3000/config';
            },
            dataType: 'json',
            contentType: 'application/json',
            error: error
            }); 

    return
}

function carregaOperacoes(id){

    if (id != '')
    {    
        //$('#newOperationCard').card('show');     
        $.get(`/operacoes/${id}`, (data) => {
            
            let objRes = '';
            let p = undefined;
            let node;
            let i = 0;
            let element = document.getElementById("operacoes1");
            let newOperation = document.getElementById("newOperationCard");

            let removeRoutine = document.getElementById("btnRemoveRoutine");
            let updateRoutine = document.getElementById("btnUpdateRoutine");

            newOperation.className = "card card-primary collapsed-card";
            newOperation.style = '';

            removeRoutine.style = 'float:right';
            updateRoutine.style = 'float:right';

            element.innerHTML = '';
            p = document.createElement('p');
            objRes = JSON.parse(data);
            console.log(objRes);

            element.appendChild(newOperation);
            document.getElementById("titleBox").appendChild(removeRoutine);
            document.getElementById("titleBox").appendChild(updateRoutine);
            objRes.forEach((item ) => {
                let myDiv = document.createElement("div");

                myDiv.innerHTML =   "<div class=\"row\">"
                                    +"<div class=\"col-md-12\">"        
                                        + `<div id=\"id${item.id}\" class=\"card collapsed-card \">`
                                            + "<div class=\"card-header\">" 
                                                + `<h5 id=\"op${item.id}\" class=\"card-title\" style=\"font-weight: bold;\"> ` + item.nome + "</h5>"
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
                                                + `<button type=\"button\" class=\"btn btn-primary\" style=\"float:left\" onclick="updateOperation(${item.id},${i})"> Salvar texto`
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


function updateOperation(id,i){

    let operationText = document.getElementById(`#textoRotina${i}`).value;
    let operationId = document.getElementById(`op${id}`).innerHTML;
    let routineId =  parseInt(document.getElementById('comboRotina').value); 

    console.log(operationText);
    console.log(operationId);
     
    //let url = "/operacoes"
    let textUrl = "/texto"
    let obj = {};
    let strobj = '';
    let error = '';

    obj.id_operacao = id;
    obj.texto = operationText;

    strobj = JSON.stringify(obj);

    $.ajax({
        type: "PUT",
        url: textUrl,
        data: strobj,
        success: function(result){
            console.log('Texto da operação alterado com sucesso.');
            carregaOperacoes(routineId);    
            toastr.success('Operação alterada com sucesso.');  
        },
        dataType: 'json',
        contentType: 'application/json',
        error: function(result){
            toastr.error('Verifique se o texto da operação foi inserido.');
        }
        }); 

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

        toastr.error('Verifique se os campos estão preenchidos.');
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
                        toastr.success('Operação incluída com sucesso.'); 
                        document.getElementById('operationName').value = '';
                        document.getElementById('operationText').value = '';
                        document.getElementById('newOperationCard').className = 'card card-primary collapsed-card';   
                        carregaOperacoes(routineId);           
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
    let error = '';
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
                toastr.info('Operação excluída com sucesso.'); 
            },
            error: error,
            data: strobj
        });
    })
}
