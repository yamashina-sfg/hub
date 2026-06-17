/**
 * アプリデータ
 * 将来的に Supabase / Firebase に移行する場合は、このファイルを
 * src/lib/supabase.js や src/lib/firebase.js に置き換えて
 * 同じ shape のオブジェクトを返す関数を export してください。
 *
 * App schema:
 * {
 *   id: string,
 *   name: string,
 *   tagline: string,          // 一行キャッチコピー
 *   description: string,      // 詳細説明
 *   thumbnail: string,        // 画像 URL or /public 内パス
 *   screenshots: string[],    // 詳細ページ用スクリーンショット
 *   category: string,         // カテゴリ ID
 *   tags: string[],
 *   developer: {
 *     id: string,
 *     name: string,
 *     avatar: string,
 *   },
 *   appUrl: string,           // 実際に遷移する WebApp URL
 *   status: 'development' | 'beta' | 'public' | 'maintenance',
 *   featured: boolean,        // おすすめ表示
 *   createdAt: string,        // ISO date string
 *   updatedAt: string,
 * }
 */

export const CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'tool', label: 'ツール' },
  { id: 'game', label: 'ゲーム' },
  { id: 'productivity', label: '生産性' },
  { id: 'creative', label: 'クリエイティブ' },
  { id: 'education', label: '学習' },
  { id: 'utility', label: 'ユーティリティ' },
];

export const STATUS_LABELS = {
  development: { label: '開発中', color: 'bg-yellow-100 text-yellow-800' },
  beta: { label: 'β版', color: 'bg-blue-100 text-blue-800' },
  public: { label: '公開中', color: 'bg-green-100 text-green-800' },
  maintenance: { label: '改修中', color: 'bg-red-100 text-red-800' },
};

export const DEVELOPERS = [];

export const APPS = [];

export function getAppById(id) {
  return APPS.find((a) => a.id === id) || null;
}

export function getDeveloperById(id) {
  return DEVELOPERS.find((d) => d.id === id) || null;
}

export function getAppsByDeveloper(developerId) {
  return APPS.filter((a) => a.developer.id === developerId);
}

export function getFeaturedApps() {
  return APPS.filter((a) => a.featured);
}

export function searchApps({ query = '', category = 'all' } = {}) {
  const q = query.toLowerCase();
  return APPS.filter((a) => {
    const matchCategory = category === 'all' || a.category === category;
    const matchQuery =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.tagline.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });
}
