import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import styles from '../styles/teste.module.css'
import { Chart } from "react-chartjs-2";
import 'chart.js/auto' 
import { stringify } from "querystring";

export default function Teste(){

    const [dados, setDados] = useState({});
    const [parametro, setParametro] = useState('');

    var urlBase = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v3.0.1/despesas?anoDotacao=2022&mesDotacao=4&codFuncao=13';
    var myHeaders = new Headers({'Authorization': 'Bearer e48808721e758a773ecafba78fcc4e4'});
    
    useEffect(()=>{
        fetch(urlBase, {method: 'GET', headers: myHeaders})
            .then(resp => resp.json())
            .then(dados => setDados(dados['lstDespesas']));
    }, []);
    
    function escolherDados(val){    
        try{
            return dados[val].toLocaleString('pt-br', {style: 'currency', currency:'BRL'})
        } catch {
            'Carrregando'
        }
    };

    useEffect(()=>{
        if (parametro){
            var url = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v3.0.1/despesas?anoDotacao=2022&mesDotacao=6&' + parametro;
            fetch(url, {method: 'GET', headers: myHeaders})
            .then(r=>r.json())
            .then(dados => setDados(dados['lstDespesas']));
        }
    }, [parametro]);
    
    var dataChart = {
        labels: [
            'LOA',
            'Orçado Atualmente',
            'Executado'
        ],
        datasets:[{
            label:'Resumo do Orçamento',
            data:[dados['valOrcadoInicial'], dados['valOrcadoAtualizado'], dados['valLiquidado']],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(94, 30, 235)'
            ],
            hoverOffset: 4
        }]
    };

    var pctLiquidado = ((dados['valLiquidado']/dados['valOrcadoInicial'])*100).toFixed(2);
    var pctCongelado = (((dados['valCongelado'] - dados['valDescongelado'])/dados['valOrcadoInicial'])*100).toFixed(2);
    var valDisponivel = (dados['valOrcadoAtualizado'] - (dados['valCongelado'] - dados['valDescongelado']) - dados['valEmpenhadoLiquido']);
    valDisponivel = valDisponivel.toLocaleString('pt-br', {style: 'currency', currency:'BRL'});
    
    return(
        <Layout titulo='Balanço Geral'>
            <h1>{"Cultura"}</h1>
            <div className={styles.linha}>
                <div style={{margin: '10px'}}>
                    <select onChange={(e)=> {setParametro(e.target.value)}} name="Selecionar Itens" id="dropdown" placeholder='Selecione um projeto'>
                        <option selected value="codFuncao=13">Função Cultura</option>
                        <option value="codOrgao=25">Secretaria Municipal de Cultura</option>
                        <option value="codOrgao=85">Theatro Municipal</option>
                        <option value="codOrgao=15">SPCine</option>
                    </select>
                </div>
            </div>
           <div className={styles.linha}>
                <Card titulo='Valor Liquidado' tamanho='30%'> {escolherDados('valLiquidado')} </Card>
                <Card titulo='Valor Empenhado' tamanho='30%'> {escolherDados('valEmpenhadoLiquido')}</Card>
                <Card titulo='Valor Orçado Atualmente' tamanho='30%'> {escolherDados('valOrcadoAtualizado')} </Card>
            </div>
                <div className={styles.linha}>

                <div className={styles.chart}>
                    <Chart type="bar" data={dataChart} className={styles.chart} />
                </div>
                <div className={styles.coluna}>
                    <li>{String(pctLiquidado) + "% do orçamento foi liquidado"}</li>
                    <li>{String(pctCongelado) + "% do orçamento se encontra congelado"}</li>
                    <li>{valDisponivel + " estão disponíveis para execução ainda"}</li>
                </div>
            </div>
        </Layout>
    )
}