import { createContext, useState } from "react"

interface Props{
    children: React.ReactNode
}

export interface letterIE{
    letter: string;
    color: boolean;
}

interface context{
    letters: letterIE[][],
    words: string[],
    soupText: string,
    wordsText: string,
    page: string,
    rows:number,
    columns: number,
    resultSuccess: string[],
    resultFail: string[],
    setPage: React.Dispatch<React.SetStateAction<string>>,
    handleChangeSoup: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
    handleChangeWords: (e:React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleResult: () => void,
    handleReload: () => void
}

const defaultState = {
    letters: [],
    words: [],
    page: 'soupt',
    rows: 0,
    columns: 0,
    soupText: '',
    wordsText: '',
    resultSuccess: [],
    resultFail: [],
    setPage: () => {},
    handleChangeSoup: () => {},
    handleChangeWords: () => {},
    handleResult: () => {},
    handleReload: () => {}
}

export const PageContext = createContext<context>(defaultState);
const PageProvider = ({children}: Props) => {
    const [letters, setLetters] = useState<letterIE[][]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [page, setPage] = useState<string>('soup'); //soup, word, result
    const [rows, setRows] = useState<number>(0);
    const [columns, setColumns] = useState<number>(0);
    const [soupText, setSoupText] = useState('');
    const [wordsText, setWordsText] = useState('');
    const [resultSuccess, setResultSuccess] = useState<string[]>([]);
    const [resultFail, setResultFail] = useState<string[]>([]);

    const handleChangeSoup = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setSoupText(e.target.value);
        const copyLetters: string[] = e.target.value.trim().split('\n');
        let copyColumns: number = 0;
        const letterRows: letterIE[][] = [];
        for(let letterRow of copyLetters){
            const letterSplit: string[] = letterRow.split(',');
            const letterColumns: letterIE[] = [];
            for(let letterColumn of letterSplit){
                const format:string = letterColumn.trim().toUpperCase();
                if(format === ''){
                    continue;
                }
                letterColumns.push({
                    letter: format,
                    color: false
                });
            }
            if(letterColumns.length === 0){
                continue;
            }
            if(copyColumns === 0){
                copyColumns = letterColumns.length;
            }else if(letterColumns.length !== copyColumns){
                continue;
            }
            letterRows.push(letterColumns);
        }
        if(letterRows.length > 0 && copyColumns > 0){
            setRows(letterRows.length);
            setColumns(copyColumns);
            setLetters(letterRows);
        }else{
            setLetters([]);
        }
    }

    const handleChangeWords = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setWordsText(e.target.value);
        const copyWords: string[] = e.target.value.trim().split('\n');
        const copyRows = [];
        for(let word of copyWords){
            const format = word.trim().toUpperCase();
            if(format === ''){
                continue;
            }
            copyRows.push(format);
        }
        if(copyRows.length === 0){
            setWords([]);
            return;
        }
        setWords(copyRows);
    }

    const handleResult = () => {
        const copyResult:string[] = [];
        let copyLetters: letterIE[][] = [];
        if(resultSuccess.length > 0){
            for(let letterRow of letters){
                const copyLetter:letterIE[] = [];
                for(let letterColumn of letterRow){
                    copyLetter.push({
                        letter: letterColumn.letter,
                        color: false
                    });
                }
                copyLetters.push(copyLetter);
            };
        }else{
            copyLetters = [...letters];
        }
        for(let i=0; i<rows; i+=1){
            for(let y=0; y<columns; y+=1){
                let word:string = copyLetters[i][y].letter;
                //Abajo
                if(i+1<rows){
                    for(let x=i+1; x<rows; x+=1){
                        word+=copyLetters[x][y].letter;
                        if(words.includes(word) && !copyResult.includes(word)){
                            copyResult.push(word);
                            for(let p=i; p<=x; p+=1){
                                copyLetters[p][y].color = true;
                            }
                        }
                    }
                    word = copyLetters[i][y].letter;
                    //Diagonal derecha
                    if(y+1 < columns){
                        let count = y+1;
                        let limit = rows;
                        if(y > i){
                            limit = rows-(y-i);
                        }
                        for(let j=i+1; j<limit; j+=1){
                            word+=copyLetters[j][count].letter;
                            count += 1;
                            if(words.includes(word) && !copyResult.includes(word)){
                                copyResult.push(word);
                                let countResult = y;
                                for(let p=i; p<=j; p+=1){
                                    copyLetters[p][countResult].color = true;
                                    countResult += 1;
                                }
                            }
                        }
                    }
                }
                word = copyLetters[i][y].letter;
                //Arriba
                if(i>0){
                    for(let x=i-1; x>=0; x-=1){
                        word+=copyLetters[x][y].letter;
                        if(words.includes(word) && !copyResult.includes(word)){
                            copyResult.push(word);
                            for(let p=i; p<=x; p-=1){
                                copyLetters[p][y].color = true;
                            }
                        }
                    }
                    word = copyLetters[i][y].letter;
                    //Diagonal izquierda
                    if(y>0){
                        let count = y-1;
                        let limit = 0;
                        if(i > y){
                            limit = i-y;
                        }
                        for(let j=i-1; j>=limit; j-=1){
                            word+=copyLetters[j][count].letter;
                            count -= 1;
                            if(words.includes(word) && !copyResult.includes(word)){
                                copyResult.push(word);
                                let countResult = y;
                                for(let p=i; p>=j; p-=1){
                                    copyLetters[p][countResult].color = true;
                                    countResult -= 1;
                                }
                            }
                        }
                    }
                }
                word = copyLetters[i][y].letter;
                //Derecha
                if(y+1<columns){
                    for(let x=y+1; x<columns; x+=1){
                        word+=copyLetters[i][x].letter;
                        if(words.includes(word) && !copyResult.includes(word)){
                            copyResult.push(word);
                            for(let p=y; p<=x; p+=1){
                                copyLetters[i][p].color = true;
                            }
                        }
                    }
                }
                word = copyLetters[i][y].letter;
                //Izquierda
                if(y>0){
                    for(let x=y-1; x>=0; x-=1){
                        word+=copyLetters[i][x].letter;
                        if(words.includes(word) && !copyResult.includes(word)){
                            copyResult.push(word);
                            for(let p=y; p>=x; p-=1){
                                copyLetters[i][p].color = true;
                            }
                        }
                    }
                }
            }
        }
        setLetters(copyLetters);
        const copyResultFail:string[] = [];
        words.forEach(word => {
            if(!copyResult.includes(word)){
                copyResultFail.push(word);
            }
        });
        setResultSuccess(copyResult);
        setResultFail(copyResultFail);
    }

    const handleReload = () => {
        setPage('soup');
        setLetters([]);
        setWords([]);
        setSoupText('');
        setWordsText('');
        setColumns(0);
        setRows(0);
        setResultSuccess([]);
        setResultFail([]);
    }

    return(
        <PageContext.Provider
            value={{
                letters,
                words,
                page,
                rows,
                columns,
                soupText,
                wordsText,
                resultSuccess,
                resultFail,
                setPage,
                handleChangeSoup,
                handleChangeWords,
                handleResult,
                handleReload
            }}
        >
            {children}
        </PageContext.Provider>
    )
}

export default PageProvider;