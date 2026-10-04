import { BrowserRouter, Routes, Route } from "react-router-dom";

import PokemonTeste from "./components/PokemonTeste";
import PokemonDetalhes from "./components/PokemonDetalhes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<PokemonTeste />} />
        <Route
          path="/pokemon/:id"
          element={<PokemonDetalhes />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;