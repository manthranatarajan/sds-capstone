import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/store';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Calendar from './pages/Calendar';
import Sprints from './pages/Sprints';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  const { isLoggedIn } = useStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isLoggedIn ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/board" element={<Board />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/sprints" element={<Sprints />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
