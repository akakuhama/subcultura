import styles from '../styles/Layout.module.css'
import Cabecalho from './Cabecalho'


export default function Layout(props){

    return(
        <div className={styles.container}>
            <Cabecalho titulo={props.titulo} />
            <div className={styles.corpo}>
                {props.children}
            </div>
            <div className={styles.footer}>
            </div>
        </div>
    )
}