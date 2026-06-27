import { useState } from 'react';
import { Save, PlusCircle, Pencil, Trash2, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { APPS, CATEGORIES, DEVELOPERS, STATUS_LABELS } from '../data/apps';
import { Link } from 'react-router-dom';

const EMPTY_FORM = {
  name: '',
  tagline: '',
  description: '',
  thumbnail: '',
  category: 'tool',
  tags: '',
  developerId: 'dev-1',
  appUrl: '',
  status: 'development',
  featured: false,
};

export default function Admin() {
  const [apps, setApps] = useState(APPS);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const startNew = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const startEdit = (app) => {
    setEditingId(app.id);
    setForm({
      name: app.name,
      tagline: app.tagline,
      description: app.description,
      thumbnail: app.thumbnail,
      category: app.category,
      tags: app.tags.join(', '),
      developerId: app.developer.id,
      appUrl: app.appUrl,
      status: app.status,
      featured: app.featured,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dev = DEVELOPERS.find((d) => d.id === form.developerId);
    const appData = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      developer: { id: dev.id, name: dev.name, avatar: dev.avatar },
      screenshots: [form.thumbnail],
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    if (editingId) {
      setApps((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...appData } : a)));
    } else {
      const newApp = { ...appData, id: `app-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) };
      setApps((prev) => [newApp, ...prev]);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (id) => {
    if (window.confirm('このアプリを削除しますか？')) {
      setApps((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const field = (label, name, type = 'text', props = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/30"
          {...props}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">管理パネル</h1>
          <p className="text-gray-500 text-sm mt-1">アプリの追加・編集・削除</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#196c76' }}
        >
          <PlusCircle size={16} />
          新規追加
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-3xl p-8 mb-10 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? 'アプリを編集' : '新しいアプリを追加'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {field('アプリ名 *', 'name', 'text', { required: true, placeholder: 'FlowTimer' })}
              {field('キャッチコピー *', 'tagline', 'text', { required: true, placeholder: '一行で伝わる説明' })}
            </div>
            {field('詳細説明 *', 'description', 'textarea', { required: true })}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {field('サムネイル URL *', 'thumbnail', 'text', { required: true, placeholder: '/project-chai.jpg または https://...' })}
              {field('アプリ URL *', 'appUrl', 'url', { required: true, placeholder: 'https://...' })}
            </div>
            {field('タグ (カンマ区切り)', 'tags', 'text', { placeholder: 'タイマー, 集中力, ポモドーロ' })}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">カテゴリ</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ステータス</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                >
                  {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Developer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">開発者</label>
                <select
                  value={form.developerId}
                  onChange={(e) => setForm((f) => ({ ...f, developerId: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                >
                  {DEVELOPERS.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured toggle */}
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${form.featured ? 'bg-primary' : 'bg-gray-300'}`}
                  style={form.featured ? { backgroundColor: '#196c76' } : {}}
                />
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.featured ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">おすすめ表示</span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#196c76' }}
              >
                <Save size={15} />
                {editingId ? '変更を保存' : '追加する'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-6 py-2.5 rounded-xl text-gray-600 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-medium animate-bounce">
          ✓ 保存しました
        </div>
      )}

      {/* App table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">掲載アプリ一覧 ({apps.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 font-medium text-gray-500">アプリ名</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">カテゴリ</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">ステータス</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">開発者</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">おすすめ</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {apps.map((app, i) => {
                const status = STATUS_LABELS[app.status];
                const cat = CATEGORIES.find((c) => c.id === app.category)?.label;
                return (
                  <tr key={app.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={app.thumbnail} alt="" className="w-10 h-10 rounded-xl object-cover bg-gray-100 shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{app.name}</p>
                          <p className="text-gray-400 text-xs line-clamp-1">{app.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden sm:table-cell">{cat}</td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden lg:table-cell">{app.developer.name}</td>
                    <td className="px-4 py-4">
                      {app.featured ? (
                        <span className="text-amber-500 text-xs font-semibold">★ おすすめ</span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          to={`/apps/${app.id}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          title="詳細を見る"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          onClick={() => startEdit(app)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          title="編集"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="削除"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
