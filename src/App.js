
import './App.css';
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import { Routes, Route } from 'react-router-dom';
import DetailPage from './Component/Detail';



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path="/ReadMore/:id" element={<DetailPage/>} />
      </Routes>

    </div>
  );
}

export default App;
