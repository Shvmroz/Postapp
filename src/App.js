
import './App.css';
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import { Routes, Route } from 'react-router-dom';
import Detail from './Component/Detail';



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path="/ReadMore/:id" element={<Detail />} />
      </Routes>

    </div>
  );
}

export default App;
