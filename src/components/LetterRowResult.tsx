import { letterIE } from '../context/PageProvider';
import styles from '../styles/LetterRow.module.css'

interface Props{
    letterRow: letterIE[]
}

const LetterRowResult = ({letterRow}: Props) => {
    return(
        <li 
            className={styles.letterRow}
        >
            {
                letterRow.map((letterColumn, x) => (
                    <div 
                        key={x}
                        className={`${styles.letterColumn} ${letterColumn.color && styles.letterColor}`}>{letterColumn.letter}
                    </div>
                ))
            }
        </li>
    )
}

export default LetterRowResult;