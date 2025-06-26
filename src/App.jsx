import Navbar from './components/navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Home />
      {/* Other content */}
    </div>
  );
}

export default App;