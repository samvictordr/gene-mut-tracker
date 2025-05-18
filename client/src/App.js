import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MutationList from './components/MutationList';
import MutationForm from './components/MutationForm';
import MutationDetail from './components/MutationDetail';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="bg-gray-800 p-4 shadow-lg">
          <nav className="container mx-auto flex space-x-4">
            <Link className="rounded-xl px-3 py-2 hover:shadow-glow transition bg-gray-700" to="/">Home</Link>
            <Link className="rounded-xl px-3 py-2 hover:shadow-glow transition bg-gray-700" to="/add">Add Mutation</Link>
          </nav>
        </header>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<MutationList />} />
            <Route path="/add" element={<MutationForm />} />
            <Route path="/edit/:id" element={<MutationForm />} />
            <Route path="/detail/:id" element={<MutationDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;