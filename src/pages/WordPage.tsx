import { useEffect} from 'react';
import styles from '../styles/Form.module.css';
import usePage from '../hooks/usePage';
import WordRow from '../components/WordRow';
import { toast } from 'react-toastify';

const WordPage = () => {
    const {wordsText, words, setPage, handleChangeWords} = usePage();
    useEffect(() => {
        if(words.length === 0){
            (document.querySelector('#words') as HTMLElement).focus();
        }
    }, []);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(words.length === 0){
            toast.error('Las palabras son requeridas', {
                theme: 'colored'
            });
            return;
        }
        setPage('result');
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
                            htmlFor="words"
                        ><span>2. </span>Palabras<span className={styles.required}>*</span></label>
                        <span className={styles.labelSubtitle}>Separa las palabras con enter</span>
                    </div>
                    <textarea 
                        name="words"
                        id="words"
                        className={styles.textarea}
                        placeholder="Escribe o pega las palabras"
                        onChange={handleChangeWords}
                        value={wordsText}
                    >
                    </textarea>
                </div>
                <div className={styles.soupForm}>
                    <h2 className={styles.subtitle}>Palabras resultantes:</h2>
                    {
                        words.length > 0 ?
                        <>
                            <span className={styles.subtitleLength}>Cantidad: {words.length}</span>
                            <ul className={styles.words}>
                                {
                                    words.map((word, i) => (
                                        <WordRow 
                                            key={i}
                                            word={word}
                                        />
                                    ))
                                }
                            </ul>
                        </>
                        :
                        <span className={styles.notification}>Aún no hay palabras definidas</span>
                    }
                </div>
            </div>
            <div className={styles.containerBtn}>
                <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnNext} ${styles.btnNextContainer}`}
                >Continuar</button>
                <button
                    type="button"
                    className={`${styles.btn} ${styles.btnBack}`}
                    onClick={() => setPage('soup')}
                >Atrás</button>
            </div>
        </form>
    );
}

export default WordPage;