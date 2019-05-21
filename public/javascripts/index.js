function criaOpcoesCombo(id)
{
    if (id != '')
    {     
        var select = $('#comboOperacao');
        select.empty();
    
        $.get(`/operacoes/${id}`, (data) => {
                let option = undefined;
                let objRes = JSON.parse(data);
    
                option = document.createElement('option');
                option.value = '';
                option.text = 'Selecione a operação...';
    
                select.append(option);
                
                objRes.forEach((item ) => {
                    option = document.createElement('option');
                    option.value = item.id;
                    option.text = item.nome;
    
                    select.append(option);
                })
    
            })
    }

}

function selecionaOperacao(id)
{
    if(id != '')
    {
        // faz requisição do texto
        $.get(`/texto/${id}`, (data) => {
    
            let textBox = $('#textoRotina');
            
            textBox.val(data);
    
        });
    }
} 

function btnIncluirParaCT()
{
    let textoRotina = $('#textoRotina')
    let textoRotinaValue = textoRotina.val()

    if (textoRotinaValue.trim())
    {
        let textoCT =  $('#textoCT');
        let textoCTValue = textoCT.val();
        let height = textoCT.prop('scrollHeight');

        textoCT.val(textoCTValue.concat(textoRotinaValue + '\n\n'));

        //posiciona a barra de rolagem embaixo
        textoCT.scrollTop(height);
    }

    $('#btnIncluirParaCT').blur();
}

function btnLimparTudo()
{
    if (confirm("Deseja realmente limpar tudo?"))
    {
        $('#textoCT').val('')
        $('#textoRotina').val('')

        $('#comboRotina').val('')
        $('#comboOperacao').val('')
        
        $("#btnLimparTudo").blur();
    }
}

function btnCopiar()
{
    $('#textoCT').select()
    document.execCommand('copy')
    $("#textoCT").blur();
}