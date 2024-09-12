import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditProduct from "./Pages/EditProduct";
import ProductDetail from "./Pages/ProductDetail";
import ProductList from "./Pages/ProductLists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
