import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src="/sfg-logo.jpg" alt="SFG HUB" className="h-5 w-auto opacity-40" />
        <p className="text-xs text-gray-400">© 2026 SFG HUB</p>
        <nav className="flex gap-6 text-xs text-gray-400">
          <Link to="/" className="hover:text-gray-700 transition-colors">ホーム</Link>
          <Link to="/apps" className="hover:text-gray-700 transition-colors">アプリ</Link>
          <Link to="/developers" className="hover:text-gray-700 transition-colors">開発者</Link>
          <Link to="/admin" className="hover:text-gray-700 transition-colors">管理</Link>
        </nav>
      </div>
    </footer>
  );
}
