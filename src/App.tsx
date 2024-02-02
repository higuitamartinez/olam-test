import usePage from "./hooks/usePage"
import ResultPage from "./pages/ResultPage";
import SoupPage from "./pages/SoupPage"
import WordPage from "./pages/WordPage";

function App() {
  const {page} = usePage();
  return (
    <main className="container">
      <h1 className="title">Prueba Olam - Sebastian Higuita</h1>
      <div className="container-portolio">
        <h3>Portafolio:</h3>
        <a href="https://higuitamartinez.com" target="_blank" rel="noopener noreferrer">higuitamartinez.com</a>
      </div>
      {
        page === 'soup' &&
        (<SoupPage />)
      }
      {
        page === 'word' &&
        (<WordPage />)
      }
      {
        page === 'result' &&
        (<ResultPage />)
      }
    </main>
  )
}

export default App
