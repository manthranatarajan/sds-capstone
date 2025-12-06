import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Calendar from './pages/Calendar';
import Sprints from './pages/Sprints';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
