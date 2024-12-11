import NavbarDefault from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import Films from "./Pages/Films";
import Update from "./Pages/Update";
import SingleFilm from "./Pages/SingleFilm";
import Trash from "./Pages/Trash";

export default function App() {
  return (
    <div>
      <NavbarDefault />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/create" element={<Create />} />
          <Route path="/films/update/:id" element={<Update />} />
          <Route path="/films/single/:id" element={<SingleFilm />} />
          <Route path="/trash" Component={Trash} />
        </Routes>
      </div>
    </div>
  );
}
