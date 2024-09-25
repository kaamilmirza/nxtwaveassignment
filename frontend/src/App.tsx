import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoList from './pages/TodoList';
import NotFoundPage from './pages/NotFoundPage';
import { RootState } from './redux/store';
import { loginUser, fetchUserByToken } from './redux/authActions';
import { AppDispatch } from './redux/store';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/todo" /> : <LoginPage />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/todo" /> : <SignupPage />} />
          <Route path="/todo" element={<PrivateRoute element={<TodoList />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
