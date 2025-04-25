import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: '/pastes',
      element: (
        <div>
          <Navbar />
          <Paste />
        </div>
      ),
    },
    {
      path: '/pastes/:id',
      element: (
        <div>
          <Navbar />
          <ViewPaste />
        </div>
      ),
    },
  ]
);

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;