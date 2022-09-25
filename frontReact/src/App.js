import './App.css';
import Formulario from "./Formulario";
import Tabela from "./Tabela";
import {useEffect, useState} from "react";

function App() {

    // Objeto produto
    const produto = {
        codigo : 0,
        nome : '',
        marca : ''
    }

    // useState
    const [btnCadastrar, setBtnCadastrar] = useState(true);

    const [produtos, setProdutos] = useState([]);

    const [objProduto, setObjProduto] = useState(produto);


    // useEffect
    useEffect(()=>{
        fetch("http://localhost:8080/listar")
            .then(retorno => retorno.json())
            .then(retorno_convertido => setProdutos(retorno_convertido));
    },[]);


    // Obtendo os dados do formulário
    const aoDigitar = (e) => {
        {/*  console.log(e.target); */}
        setObjProduto({...objProduto, [e.target.name]:e.target.value});

    }

    // Remover produto
    const remover = () => {
        fetch('http://localhost:8080/remover/'+ objProduto.codigo, {
            method:'delete',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {
               // Mensagem
                alert(retorno_convertido.mensagem);

                // copia do vetor de produtos
                let vetorTemp = [...produtos];

                // Indice
                let indice = vetorTemp.findIndex((prod)=>{
                    return prod.codigo == objProduto.codigo;
                });

                // remover produto do vetor temporal
                vetorTemp.splice(indice, 1);

                // Atualizar o vetor de produtos
                setProdutos(vetorTemp);

                // Limpar formulario
                limparFormulario();

            })
    }

    // alterar produto
    const alterar = () => {
        fetch('http://localhost:8080/alterar/', {
            method:'put',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {

                if(retorno_convertido.mensagem !== undefined){
                    alert(retorno_convertido.mensagem);
                } else{

                    alert('Produto alterado con sucesso');

                    // copia do vetor de produtos
                    let vetorTemp = [...produtos];

                    // Indice
                    let indice = vetorTemp.findIndex((prod)=>{
                        return prod.codigo == objProduto.codigo;
                    });

                    // alterar produto do vetor temporal
                    vetorTemp[indice] = objProduto;

                    // Atualizar o vetor de produtos
                    setProdutos(vetorTemp);

                    limparFormulario();
                }
            })
    }


    // cadastrar produto
    const cadastrar = () => {
        fetch('http://localhost:8080/cadastrar', {
            method:'post',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {
                if(retorno_convertido.mensagem !== undefined){
                    alert(retorno_convertido.mensagem);
                } else{
                    setProdutos([...produtos, retorno_convertido]); // pego todos os produtos , adiciona os produtos que voltan da api
                    alert('Produto cadastrado con sucesso');
                    limparFormulario();
                }
            })
    }

    // Selecionar produto
    const selecionarProduto = ( indice )=>{
        setObjProduto(produtos[indice]); // obtemos un produto concreto
        setBtnCadastrar(false);
    }


    // limpar formulário
    const limparFormulario = ()=>{
        setObjProduto(produto);
        setBtnCadastrar(true);
    }




    // retorno
  return (

    <div>
        {/* <p>{JSON.stringify(objProduto)}</p> */}
        {  /* <p>{JSON.stringify(produtos)}</p> */}
      <Formulario botao = {btnCadastrar} eventoTeclado = {aoDigitar} cadastrar = {cadastrar} obj = { objProduto } cancelar = { limparFormulario } remover = { remover } alterar = { alterar }/>

      <Tabela vetor = { produtos } selecionar = { selecionarProduto } />
    </div>
  );
}

export default App;
