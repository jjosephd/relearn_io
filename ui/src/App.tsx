import { Outlet, Route, Routes } from 'react-router';
import './styles/App.css';
import NavBar from './components/NavBar';
import About from './components/About';
import Home from './components/Home/Home';
import Discover from './pages/Discover';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="discover" element={<Discover />} />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden hero-gradient bg-black flex flex-col">
        <div>
          <NavBar />
        </div>
        <main className="relative flex flex-col mt-36 items-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
