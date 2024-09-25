import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoList from './pages/TodoList';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
