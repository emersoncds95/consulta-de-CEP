function Mudarestado(el) { 
    var display = document.getElementById('campo-resultado').style.display = 'block';
}

document.getElementById('buscar-cep').addEventListener("input", function() { // Faz com que o usuario só possa digitar numeros
    var i = document.getElementById('buscar-cep').value.length;
    var str = document.getElementById('buscar-cep').value
    if (isNaN(Number(str.charAt(i-1)))) {
      document.getElementById('buscar-cep').value = str.substr(0, i-1)
    }
  });

document.addEventListener('keydown', function(event) {  // máscara para o CEP
    if(event.keyCode != 46 && event.keyCode != 8){
      var i = document.getElementById('buscar-cep').value.length; 
      if (i === 5) 
        document.getElementById('buscar-cep').value = document.getElementById('buscar-cep').value + "-";
     
    }
  });

const limparCampos = (endereco) =>{
    document.getElementById('CEP').innerHTML = "";
    document.getElementById('uf').innerHTML = "";
    document.getElementById('cidade').innerHTML = "";
    document.getElementById('endereco').innerHTML = "";
}

const preencherCampos = (endereco) =>{
    document.getElementById('CEP').innerHTML = endereco.cep;
    document.getElementById('uf').innerHTML = endereco.uf;
    document.getElementById('cidade').innerHTML = endereco.localidade;
    document.getElementById('endereco').innerHTML = endereco.logradouro;
}



const cepValido = (cep) => cep.length   >=8;

const pesquisarCep = async() =>{
    limparCampos()

    const cep = document.getElementById('buscar-cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url)
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('aviso-erro').innerHTML = `CEP não encontrado!`
        }else {
             preencherCampos(endereco)
             document.getElementById('aviso-erro').innerHTML = ``
        }
    }else{
        document.getElementById('aviso-erro').innerHTML = `CEP Inválido! Verifique e tente novamente. <br> Exemplo de CEP: 04571-010 `
    }
    
    
}

document.getElementById('buscar-cep')
        .addEventListener('focusout',pesquisarCep);