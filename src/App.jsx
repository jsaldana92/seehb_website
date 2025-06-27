import Navbar from './components/navbar';
import Home from './pages/home';


function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Home />
      {/* Other content */}
    </div>
  );
}

export default App;