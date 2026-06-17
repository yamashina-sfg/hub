import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, GitBranch, Globe } from 'lucide-react';
import { getDeveloperById, getAppsByDeveloper } from '../data/apps';
import AppCard from '../components/AppCard';

export default function DeveloperProfile() {
  const { id } = useParams();
  const dev = getDeveloperById(id);

  if (!dev) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center text-gray-400">
        <p className="text-xl font-semibold">開発者が見つかりません</p>
        <Link to="/developers" className="mt-4 inline-block text-sm text-[#196c76] hover:underline">一覧に戻る</Link>
      </div>
    );
  }

  const apps = getAppsByDeveloper(id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Link to="/developers" className="inline-flex items-center gap-1 text-[#196c76] text-sm font-medium mb-8 hover:opacity-70 transition-opacity">
        <ChevronLeft size={16} /> 開発者
      </Link>

      {/* Profile */}
      <div className="flex items-start gap-6 mb-10">
        <img src={dev.avatar} alt={dev.name} className="w-24 h-24 rounded-3xl bg-gray-100 shadow-sm shrink-0" />
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{dev.name}</h1>
          <p className="text-gray-400 text-sm mt-1 max-w-md">{dev.bio}</p>
          <div className="flex items-center gap-4 mt-3">
            {dev.github && (
              <a href={dev.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                <GitBranch size={13} /> GitHub
              </a>
            )}
            {dev.twitter && (
              <a href={dev.twitter} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                𝕏 Twitter
              </a>
            )}
            {dev.website && (
              <a href={dev.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                <Globe size={13} /> Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Divider with stats */}
      <div className="border-t border-gray-100 pt-8 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          {apps.length} 本のアプリ
        </p>
      </div>

      {apps.length === 0 ? (
        <p className="text-gray-400 text-sm">まだアプリが登録されていません。</p>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
          {apps.map((app) => <AppCard key={app.id} app={app} />)}
        </div>
      )}
    </div>
  );
}
