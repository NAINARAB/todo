import './App.css';
import { BrowserRouter} from "react-router-dom";
import { Routes ,Route } from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Customer from './components/customer';
import Stock from './components/stock';
import Purchase from './components/purchase';
import Sales from './components/sales';
import Myaccount from './components/myaccount';
import Login  from './components/login';
function App() {
  return (
    <div>
     <BrowserRouter>
        <Routes>
          <Route exact path="/"  element={<Login />} />
          <Route path="/dashboard"element={<Dashboard />} />
          <Route path='/customer' element={<Customer/>} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
