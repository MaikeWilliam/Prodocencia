import "./App.css";

import Header from "./components/Header/Header";
import Metrica from "./components/Metric/Metrica";
import Tensores from "./components/Tensores/Tensores";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <Header />
            <div className="body">
                <Metrica />
                <Tensores />
            </div>
            <Footer />
        </>
    );
}

export default App;
