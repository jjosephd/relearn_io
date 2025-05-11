import { Outlet, Route, Routes } from 'react-router';
import './styles/App.css';
import NavBar from './components/NavBar';
import About from './pages/About';
import Home from './pages/Home/Home';
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
      <div
        className="min-h-screen overflow-x-hidden bg-base-100 flex flex-col"
        data-theme="maintheme"
      >
        <nav>
          <NavBar />
        </nav>
        <main className="relative flex flex-col mt-12 items-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
