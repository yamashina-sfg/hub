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

export const DEVELOPERS = [
  {
    id: 'dev-sfg',
    name: 'SFG',
    avatar: '/sfg-logo.jpg',
    bio: 'SFG メンバーによる開発チーム。',
    github: '',
    twitter: '',
    website: 'https://hub-coral-chi.vercel.app',
    apps: ['app-nation-genesis'],
  },
];

export const APPS = [
  {
    id: 'app-nation-genesis',
    name: '国家創世記（Nation Genesis）',
    tagline: '一般人から大統領へ。あなたの決断が国家の未来を変える。',
    description: '国家創世記（Nation Genesis）は、国家のリーダーとなって国を発展させる大統領シミュレーションゲームです。\n\nプレイヤーは突然大統領に選ばれた一般人として、政策決定、外交交渉、経済運営、株式市場への対応など、様々な課題に向き合います。\n\n移民政策や教育改革、税制変更などの重要な決断を行いながら、国民の支持率や国の発展を目指します。\n\nまた、世界恐慌、AI革命、資源価格高騰、外交問題などのイベントが発生し、プレイヤーは国家のトップとして判断を迫られます。\n\n遊びながら政治・経済・国際情勢への理解が深まり、「気づいたらニュースが面白くなる」ことを目指した国家運営RPGです。',
    thumbnail: '/nation-genesis.jpg',
    screenshots: ['/nation-genesis.jpg'],
    category: 'game',
    tags: ['国家運営', 'シミュレーション', '戦略', '政治', '経済', '外交', '株式市場', 'RPG', '教育', '経営'],
    developer: { id: 'dev-sfg', name: 'SFG', avatar: '/sfg-logo.jpg' },
    appUrl: 'https://nation-genesis.vercel.app',
    status: 'beta',
    featured: true,
    createdAt: '2026-06-17',
    updatedAt: '2026-06-17',
  },
];

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
