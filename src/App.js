
import './App.css';
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import { Routes, Route } from 'react-router-dom';
import DetailPage from './Component/Detail';
import AddPost from './Component/AddPost';
import Edit from './Component/EditPost';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/post/:id' element={<DetailPage />} />
        <Route path='/Add' element={<AddPost />} />
        <Route path='/Edit/:id' element={<Edit/>} />
      </Routes>
    </div>
  );
}

export default App;
