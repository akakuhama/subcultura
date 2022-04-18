import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import styles from '../styles/teste.module.css'

export default function Teste(){

    const [dados, setDados] = useState({});
    const [base, setBase] = useState({})

    

    var urlBase = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v3.0.1/despesas?anoDotacao=2022&mesDotacao=3&codFuncao=13';
    var myHeaders = new Headers({'Authorization': 'Bearer e48808721e758a773ecafba78fcc4e4'});
    fetch(urlBase, {method: 'GET', headers: myHeaders})
        .then(resp => resp.json())
        .then(dados => setDados(dados['lstDespesas']));
    
    function escolherDados(val){    
        try{
            return dados[val].toLocaleString('pt-br', {style: 'currency', currency:'BRL'})
        } catch {
            'Carrregando'
        }
    }

    

    
    

    return(
        <Layout titulo='Balanço Geral'>
            <h1>Função Cultura</h1>
            <div className={styles.linha}>
                <div style={{margin: '10px'}}>
                    <select name="Selecionar Itens" id="dropdown" placeholder='Selecione um projeto'>
                        <option value="13">Função Cultura</option>
                        <option value="25">Secretaria Municipal de Cultura</option>
                        <option value="??">Theatro Municipal</option>
                        <option value="???">SPCine</option>
                    </select>
                    <button >Consultar</button>
                </div>
            </div>
           <div className={styles.linha}>
                <Card titulo='Valor Liquidado' tamanho='30%'> {escolherDados('valLiquidado')} </Card>
                <Card titulo='Valor Empenhado' tamanho='30%'> {escolherDados('valEmpenhadoLiquido')}</Card>
                <Card titulo='Valor Orçado Atualmente' tamanho='30%'> {escolherDados('valOrcadoAtualizado')} </Card>
            </div>
        </Layout>
    )
}