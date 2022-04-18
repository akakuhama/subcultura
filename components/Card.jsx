import styles from '../styles/Card.module.css'

export default function Card(props){

    function footer(){
        if (props.footer){
            return(
        <div id='footer' className={styles.footer}>
            {props.footer}
        </div>  
            )
        } else {
            return
        }
    }


    return(
        <div style={{width: props.tamanho} ?? ''} className={styles.card}>
            <div id='header' className={styles.header}>
                <h3>{props.titulo}</h3>
            </div>
            <div id='body' className={styles.body}>
                {props.children}
            </div>
            {footer()}
        </div>
    )

}