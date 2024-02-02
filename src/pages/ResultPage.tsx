import { useEffect } from 'react';
import stylesForm from '../styles/Form.module.css';
import stylesResult from '../styles/ResultPage.module.css';
import usePage from '../hooks/usePage';
import WordRow from '../components/WordRow';
import LetterRowResult from '../components/LetterRowResult';

const ResultPage = () => {
    const {resultSuccess, rows, columns, letters, resultFail, handleResult, setPage, handleReload} = usePage();
    useEffect(() => {
        handleResult();
    }, []);
    return(
        <div className={stylesForm.containerForm}>
            <div className={stylesForm.divForm}>
                <div className={stylesForm.userForm}>
                    <div className={stylesForm.titleForm}>
                        <label
                            htmlFor="words"
                        ><span>3. </span>Resultado</label>
                    </div>
                    <div className={stylesResult.containerWords}>
                        <div>
                            <h3 className={stylesResult.titleResult}>Encontradas:</h3>
                            <span className={stylesResult.subtitleResult}>{resultSuccess.length} Resultados</span>
                            <ul className={stylesResult.words}>
                                {
                                    resultSuccess.map((word, i) => (
                                        <WordRow 
                                            key={i}
                                            word={word}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <h3 className={stylesResult.titleResult}>No Encontradas:</h3>
                            <span className={stylesResult.subtitleResult}>{resultFail.length} Resultados</span>
                            <ul className={stylesResult.words}>
                                {
                                    resultFail.map((word, i) => (
                                        <WordRow 
                                            key={i}
                                            word={word}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={stylesForm.soupForm}>
                    <h2 className={stylesForm.subtitle}>Sopa de letras:</h2>
                    <span className={stylesForm.subtitleLength}>Filas: {rows} | Columnas: {columns}</span>
                    <div className={stylesForm.soupContainer}>
                        <ul className={stylesForm.soup}>
                            {
                                letters.map((letterRow, i) => (
                                    <LetterRowResult
                                        key={i} 
                                        letterRow={letterRow}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className={stylesForm.containerBtn}>
                <button
                    type="button"
                    className={`${stylesForm.btn} ${stylesForm.btnReload} ${stylesForm.btnNextContainer}`}
                    onClick={handleReload}
                >Reiniciar</button>
                <button
                    type="button"
                    className={`${stylesForm.btn} ${stylesForm.btnBack}`}
                    onClick={() => setPage('word')}
                >Atrás</button>
            </div>
        </div>
    );  
}

export default ResultPage;