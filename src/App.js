import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { MusicListPage } from "./pages/musicList";

function App() {
  return (
    <Routes>
      <Route exact path="/playlist" element={<MusicListPage/>}/>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
