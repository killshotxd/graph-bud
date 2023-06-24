import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Header from "./layouts/Header";

const App = () => {
  return (
    <>
      {/* COMMON COMPONENT */}
      <Header />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </>
  );
};

export default App;
