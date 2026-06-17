import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchApps, CATEGORIES, STATUS_LABELS } from '../data/apps';
import AppCard from '../components/AppCard';

export default function AppList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const results = searchApps({ query, category }).filter(
    (a) => statusFilter === 'all' || a.status === statusFilter
  );

  const updateSearch = (q, cat) => {
    const params = {};
    if (q) params.q = q;
    if (cat && cat !== 'all') params.category = cat;
    setSearchParams(params);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">アプリ一覧</h1>
        <p className="text-gray-400 text-sm mt-1">{results.length} 件</p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="アプリ名・タグ・説明で検索"
          value={query}
          onChange={(e) => { setQuery(e.target.value); updateSearch(e.target.value, category); }}
          className="bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 flex-1"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-8 scrollbar-hide">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCategory(c.id); updateSearch(query, c.id); }}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === c.id
                ? 'text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={category === c.id ? { backgroundColor: '#196c76' } : {}}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {['all', ...Object.keys(STATUS_LABELS)].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === s
                ? 'border-gray-400 text-gray-900 bg-white shadow-sm'
                : 'border-gray-200 text-gray-400 hover:border-gray-300'
            }`}
          >
            {s === 'all' ? 'すべて' : STATUS_LABELS[s].label}
          </button>
        ))}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-32 text-gray-300">
          <Search size={40} className="mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-400">見つかりませんでした</p>
          <p className="text-sm text-gray-300 mt-1">別のキーワードを試してみてください</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
          {results.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
