import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../utils/api';
import ChangePassword from './ChangePassword';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userData, setUserData] = useState<{ email: string; fullName: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.login(email, password);
      
      if (result.status === 'success') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        // التحقق من الحاجة لتغيير الباسورد
        const user = result.data.user;
        
        // تحقق شامل من mustChangePassword
        const mustChangePassword = user.mustChangePassword === true 
          || user.mustChangePassword === 'true' 
          || user.mustChangePassword === 1
          || (user.mustChangePassword !== false && user.mustChangePassword !== undefined && user.mustChangePassword !== null);
        
        console.log('🔐 ========== LOGIN SUCCESS ==========');
        console.log('🔐 Full response:', result);
        console.log('🔐 User data:', user);
        console.log('🔐 mustChangePassword value:', user.mustChangePassword);
        console.log('🔐 mustChangePassword type:', typeof user.mustChangePassword);
        console.log('🔐 mustChangePassword === true:', user.mustChangePassword === true);
        console.log('🔐 mustChangePassword == true:', user.mustChangePassword == true);
        console.log('🔐 mustChangePassword !== false:', user.mustChangePassword !== false);
        console.log('🔐 mustChangePassword after check:', mustChangePassword);
        console.log('🔐 Boolean(mustChangePassword):', Boolean(mustChangePassword));
        
        if (Boolean(mustChangePassword)) {
          console.log('🔐 ✅ User MUST change password - showing change password form');
          setUserData({
            email: user.email,
            fullName: user.fullName
          });
          setShowChangePassword(true);
        } else {
          console.log('🔐 ❌ User can proceed normally - no password change required');
          onLogin();
        }
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChanged = () => {
    // تحديث بيانات المستخدم بعد تغيير الباسورد
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.mustChangePassword = false;
    localStorage.setItem('user', JSON.stringify(user));
    
    setShowChangePassword(false);
    setUserData(null);
    onLogin();
  };

  if (showChangePassword && userData) {
    return (
      <ChangePassword
        onPasswordChanged={handlePasswordChanged}
        userEmail={userData.email}
        userName={userData.fullName}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent mb-2 text-center">
        Login to Book Meeting Room
      </h2>
      <p className="text-gray-400 text-center mb-6">Access your meeting room booking dashboard</p>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f37121] transition-colors duration-200"
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#f37121] hover:to-[#e5651a] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform "
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>

    </div>
  );
}