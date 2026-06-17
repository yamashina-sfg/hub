import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ChevronLeft, Star } from 'lucide-react';
import { getAppById, STATUS_LABELS, CATEGORIES, APPS } from '../data/apps';
import AppCard from '../components/AppCard';

export default function AppDetail() {
  const { id } = useParams();
  const app = getAppById(id);

  if (!app) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center text-gray-400">
        <p className="text-xl font-semibold">アプリが見つかりません</p>
        <Link to="/apps" className="mt-4 inline-block text-sm text-[#196c76] hover:underline">一覧に戻る</Link>
      </div>
    );
  }

  const status = STATUS_LABELS[app.status];
  const categoryLabel = CATEGORIES.find((c) => c.id === app.category)?.label;
  const related = APPS.filter((a) => a.category === app.category && a.id !== app.id).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back */}
      <Link to="/apps" className="inline-flex items-center gap-1 text-[#196c76] text-sm font-medium mb-8 hover:opacity-70 transition-opacity">
        <ChevronLeft size={16} /> アプリ
      </Link>

      {/* App header */}
      <div className="flex items-start gap-6 mb-10">
        <div className="w-28 h-28 rounded-[22px] overflow-hidden bg-gray-100 shadow-md shrink-0">
          <img src={app.thumbnail} alt={app.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 pt-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{app.name}</h1>
          <p className="text-gray-400 text-sm mt-1">{app.tagline}</p>
          <div className="flex items-center gap-3 mt-3">
            <a
              href={app.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#196c76' }}
            >
              今すぐ使う <ExternalLink size={12} />
            </a>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
              {status.label}
            </span>
            {app.featured && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-amber-700 bg-amber-50">
                <Star size={10} fill="currentColor" /> おすすめ
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main hero image */}
      <div className="rounded-3xl overflow-hidden bg-gray-100 mb-10 aspect-video">
        <img src={app.thumbnail} alt={app.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Description */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">アプリについて</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{app.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">タグ</h2>
            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/apps?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Meta */}
          <div className="bg-gray-50 rounded-2xl p-5 text-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">カテゴリ</span>
              <Link to={`/apps?category=${app.category}`} className="font-medium text-[#196c76] hover:underline">
                {categoryLabel}
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">最終更新</span>
              <span className="text-gray-700">{app.updatedAt}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">公開日</span>
              <span className="text-gray-700">{app.createdAt}</span>
            </div>
          </div>

          {/* Developer */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">開発者</p>
            <Link to={`/developers/${app.developer.id}`} className="flex items-center gap-3 group">
              <img src={app.developer.avatar} alt={app.developer.name} className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-[#196c76] transition-colors">
                  {app.developer.name}
                </p>
                <p className="text-xs text-gray-400">プロフィールを見る</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">関連アプリ</h2>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
            {related.map((a) => <AppCard key={a.id} app={a} />)}
          </div>
        </section>
      )}
    </div>
  );
}
