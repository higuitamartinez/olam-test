interface Props{
    word: string;
}

const WordRow = ({word}: Props) => { 
    return(
        <li>{word}</li>
    );
}

export default WordRow;