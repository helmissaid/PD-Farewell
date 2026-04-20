/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PersonPage from './pages/PersonPage';
import { MusicProvider } from './components/MusicPlayer';

export default function App() {
  return (
    <Router>
      <MusicProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
      </MusicProvider>
    </Router>
  );
}
