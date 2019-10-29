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

    if (id != '')
    {         
        $.get(`/operacoes/${id}`, (data) => {
            let objRes = JSON.parse(data);

            for(i= 0; i < objRes.length; i++){

                document.getElementById('operacoes'+id).innerHTML += objRes[i].nome;

                document.getElementById('operacoes'+id).innerHTML += "<br/>";
                console.log(objRes);
            }

/*             button(type="button" class="btn btn-card-tool" data-card-widget="collapse"  onclick=`carregaOperacoes(${objeto.id})`)
            i(id=`icon${objeto.id}` class="fa fa-plus")  
        button(class="btn btn-box-tool" onclick=`carregaOperacoes(${objeto.id})`)   
             i(class="fa fa-wrench")  
        button(class="btn btn-box-tool" onclick=`btnRemoverRotina(${objeto.id})`)
             i(class="fa fa-times") 
 */
           //return data;

        })
    }
}

function testeaa(){

    alert('aaaaa')
}