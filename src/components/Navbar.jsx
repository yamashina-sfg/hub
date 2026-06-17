import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/apps?q=${encodeURIComponent(query)}`);
  };

  const link = (to, label) => {
    const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
    return (
      <Link
        to={to}
        className={`text-sm transition-colors ${active ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/sfg-logo.jpg"
            alt="SFG HUB"
            className="h-7 w-auto"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
          <span className="font-bold text-gray-900 text-base tracking-tight hidden">SFG HUB</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {link('/', 'トップ')}
          {link('/apps', 'アプリ')}
          {link('/developers', '開発者')}
          {link('/admin', '管理')}
        </nav>

        <form onSubmit={handleSearch} className="flex-1 max-w-xs ml-auto">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${focused ? 'bg-white ring-1 ring-gray-300 shadow-sm' : 'bg-gray-100'}`}>
            <Search size={13} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="bg-transparent outline-none w-full text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
