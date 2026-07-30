import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Input, Label } from '../components/ui/Field';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại.');
    }
  };
  
  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-stone-800/50 backdrop-blur-md rounded-lg shadow-xl w-full max-w-md p-8 border border-line/50">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-stone-100">Đăng nhập quản trị</h2>
        <div className="text-sm bg-amber-900/40 border border-amber-700/50 text-amber-200 p-3 rounded-md mb-6">
            <p>Trang này dành riêng cho Ban tổ chức. Liên hệ quản trị viên nếu bạn cần cấp tài khoản.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              tone="panel"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              tone="panel"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xs text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-stone-600"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;