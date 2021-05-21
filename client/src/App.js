import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedAdmin from './components/ProtectedAdmin';
import Forbidden from './pages/Forbidden';
import Category from './pages/admin/Category';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/products/:id' component={SingleProduct} />
        <ProtectedRoutes path='/user/profile' component={Profile} />
        <Route path='/user/signin' component={SignIn} />
        <Route path='/user/signup' component={SignUp} />
        <ProtectedAdmin exact path='/admin' component={Dashboard} />
        <ProtectedAdmin path='/admin/products' component={Products} />
        <ProtectedAdmin path='/admin/users' component={Users} />
        <ProtectedAdmin path='/admin/category' component={Category} />
        <ProtectedRoutes path='/cart' component={Cart}/>
        <Route path='/forbidden' component={Forbidden} />
        <Route path='/checkout' component={Checkout} />
      </Switch>
    </Router>
  );
}

export default App;
