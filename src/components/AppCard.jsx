import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { STATUS_LABELS } from '../data/apps';

export default function AppCard({ app, featured = false }) {
  const status = STATUS_LABELS[app.status];

  if (featured) {
    return (
      <Link
        to={`/apps/${app.id}`}
        className="group relative rounded-3xl overflow-hidden block aspect-[4/3] bg-gray-100"
      >
        <img
          src={app.thumbnail}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
            {status.label}
          </p>
          <h3 className="text-white text-xl font-bold mb-1">{app.name}</h3>
          <p className="text-white/70 text-sm line-clamp-2">{app.tagline}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* App icon */}
      <Link to={`/apps/${app.id}`} className="shrink-0">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <img src={app.thumbnail} alt={app.name} className="w-full h-full object-cover" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/apps/${app.id}`}>
          <p className="font-semibold text-gray-900 text-sm leading-tight truncate group-hover:text-[#196c76] transition-colors">
            {app.name}
          </p>
        </Link>
        <p className="text-gray-400 text-xs mt-0.5 truncate">{app.tagline}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          {app.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href={app.appUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold transition-colors"
      >
        開く
      </a>
    </div>
  );
}
