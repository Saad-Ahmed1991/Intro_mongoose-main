import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProductList from "./components/ProductList/ProductList";
import { getAllProducts } from "./redux/actions/actionsProduct";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import Filter from "./components/Filter/Filter";
import EditProduct from "./components/EditProduct/EditProduct";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import DashBoard from "./components/DashBoard/DashBoard";
import { getCurrentUser } from "./redux/actions/actionsUser";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProtectedRoute from "./components/ProtecetedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Filter />
              <ProductList />{" "}
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <PrivateRoute>
                <NavBar />
                <AddProduct />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <NavBar />
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
