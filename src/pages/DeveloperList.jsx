import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DEVELOPERS, getAppsByDeveloper } from '../data/apps';

export default function DeveloperList() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#196c76] mb-1">People</p>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">開発者</h1>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {DEVELOPERS.map((dev) => {
          const apps = getAppsByDeveloper(dev.id);
          return (
            <Link
              key={dev.id}
              to={`/developers/${dev.id}`}
              className="flex items-center gap-5 px-6 py-5 hover:bg-gray-50 transition-colors group"
            >
              <img src={dev.avatar} alt={dev.name} className="w-14 h-14 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-[#196c76] transition-colors">{dev.name}</p>
                <p className="text-sm text-gray-400 mt-0.5 truncate">{dev.bio}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-gray-900">{apps.length}</p>
                <p className="text-xs text-gray-400">アプリ</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
