import {useEffect} from "react";
import usePage from "../hooks/usePage";
import LetterRow from "../components/LetterRow";
import styles from '../styles/Form.module.css';
import {toast} from 'react-toastify';

const SoupPage = () => {
    const {letters, soupText, columns, rows, handleChangeSoup, setPage} = usePage();

    useEffect(() => {
        if(letters.length === 0){
            (document.querySelector('#letters') as HTMLElement).focus();
        }
    }, []);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(soupText.trim() === ''){
            toast.error('La sopa de letras es requerida', {
                theme: 'colored'
            });
            return;
        }
        if(soupText.length > 0 && (columns < 4 || rows < 4)){
            toast.error('Mínimo 4 filas y 4 columnas', {
                theme: 'colored'
            });
            return;
        }
        if(columns !== rows){
            toast.error('Debe ser el mismo número de filas y columnas', {
                theme: 'colored'
            });
            return;
        }
        setPage('word');
    }
    return(
        <form 
            className={styles.containerForm}
            onSubmit={handleSubmit}
        >
            <div className={styles.divForm}>
                <div className={styles.userForm}>
                    <div className={styles.titleForm}>
                        <label
                            htmlFor="letters"
                        ><span>1. </span>Sopa de letras (Matríz)<span className={styles.required}>*</span></label>
                        <span className={styles.labelSubtitle}>Separa las filas con enter y las columnas con una coma. Mínimo 4 filas y 4 columnas</span>
                    </div>
                    <textarea 
                        name="letters"
                        id="letters"
                        className={styles.textarea}
                        placeholder="Escribe o pega la sopa de letras"
                        onChange={handleChangeSoup}
                        value={soupText}
                    >
                    </textarea>
                </div>
                <div className={styles.soupForm}>
                    <h2 className={styles.subtitle}>Sopa de letras resultante:</h2>
                    {
                        letters.length > 0 ?
                        <>
                            <span className={styles.subtitleLength}>Filas: {rows} | Columnas: {columns}</span>
                            <div className={styles.soupContainer}>
                                <ul className={styles.soup}>
                                    {
                                        letters.map((letterRow, i) => (
                                            <LetterRow
                                                key={i} 
                                                letterRow={letterRow}
                                            />
                                        ))
                                    }
                                </ul>
                            </div>
                        </>
                        :
                        <span className={styles.notification}>Aún no hay sopa de letras definida</span>
                    }
                </div>
            </div>
            <button
                type="submit"
                className={`${styles.btn} ${styles.btnNext} ${styles.btnUnique}`}
            >Continuar</button>
        </form>
    );
}

export default SoupPage;