import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AppList from './pages/AppList';
import AppDetail from './pages/AppDetail';
import DeveloperList from './pages/DeveloperList';
import DeveloperProfile from './pages/DeveloperProfile';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<AppList />} />
            <Route path="/apps/:id" element={<AppDetail />} />
            <Route path="/developers" element={<DeveloperList />} />
            <Route path="/developers/:id" element={<DeveloperProfile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
