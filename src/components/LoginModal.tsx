
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './IconComponents';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Notă de securitate: Acesta este un exemplu și NU este sigur!
  // Într-o aplicație reală, nu stocați niciodată parolele în codul sursă.
  // Folosiți un sistem de autentificare cu back-end.
  const HARDCODED_USER = 'admin';
  const HARDCODED_PASS = 'parola123';

  useEffect(() => {
      if (isOpen) {
          setUsername('');
          setPassword('');
          setError('');
      }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === HARDCODED_USER && password === HARDCODED_PASS) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Utilizator sau parolă incorectă.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm">
        <header className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Autentificare Admin</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Închide">
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>
        <main className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Utilizator</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"
                required
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-700">Parolă</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green-dark focus:border-brand-green-dark"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-green-dark text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-dark"
            >
              Login
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default LoginModal;
