import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Forbidden from "./pages/Forbidden";
import ProtectedLogin from "./components/ProtectedLogin";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const SignIn = lazy(() => import("./pages/Signin"));
const SignUp = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Users = lazy(() => import("./pages/admin/Users"));
const Orders = lazy(() => import("./pages/admin/Orders"));
const Products = lazy(() => import("./pages/admin/Products"));
const Category = lazy(() => import("./pages/admin/Category"));
const SearchedProducts = lazy(() => import("./pages/SearchedProducts"));
const FilteredCategoryPage = lazy(() => import("./pages/FilteredCategory"));

function App() {
  return (
    <Router>
      <ToastContainer />
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(182, 186, 189, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              src="https://giphy.com/embed/6036p0cTnjUrNFpAlr"
              width="480"
              height="480"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
              title="loader"
            ></iframe>
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <ProtectedLogin path="/user/signin" component={SignIn} />
          <ProtectedLogin path="/user/signup" component={SignUp} />
          <ProtectedRoutes path="/user/profile" component={Profile} />
          <ProtectedAdmin exact path="/admin" component={Dashboard} />
          <ProtectedAdmin path="/admin/products" component={Products} />
          <ProtectedAdmin path="/admin/users" component={Users} />
          <ProtectedAdmin path="/admin/category" component={Category} />
          <ProtectedAdmin path="/admin/orders" component={Orders} />
          <Route path="/cart" component={Cart} />
          <Route path="/forbidden" component={Forbidden} />
          <ProtectedRoutes path="/checkout" component={Checkout} />
          <Route path="/search" component={SearchedProducts} />
          <Route
            exact
            path="/category/:name"
            component={FilteredCategoryPage}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
