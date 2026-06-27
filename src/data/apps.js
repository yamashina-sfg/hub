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
    id: 'app-life-replay',
    name: 'Life Replay',
    tagline: '人生をやり直せたら、あなたは何を選ぶ？',
    description: 'Life Replay は、人生の岐路に立つキャラクターを操作するライフシミュレーションゲームです。\n\n恋愛・住まい・学業・キャリアの4つの選択肢が分かれ道として現れ、あなたの選択が人生のストーリーを変えていきます。\n\nドット絵で描かれた温かみのある世界で、何度でも人生をやり直しながら、理想のエンディングを目指しましょう。\n\n主な特徴\n・岐路での選択で変わるストーリー分岐\n・恋愛・仕事・住まい・学習の4ルート\n・ドット絵×アイソメトリックな世界観\n・何周でも楽しめるリプレイ性\n・ブラウザでサクッとプレイ可能',
    thumbnail: '/life-replay.png',
    screenshots: ['/life-replay.png'],
    category: 'game',
    tags: ['シミュレーション', '人生', '選択', 'ドット絵', 'カジュアル', 'ストーリー', 'RPG'],
    developer: { id: 'dev-sfg', name: 'SFG', avatar: '/sfg-logo.jpg' },
    appUrl: 'https://life-replay-game.vercel.app',
    status: 'beta',
    featured: false,
    createdAt: '2026-06-27',
    updatedAt: '2026-06-27',
  },
  {
    id: 'app-project-chai',
    name: 'Project CHAI',
    tagline: 'トイレブラシを武器に戦え。最強の清掃戦士、参上。',
    description: 'タイから日本へやってきた青年チャイが、トイレ清掃の仕事を通じて夢を追うアクション清掃ゲーム。\n\n汚れに合わせて道具や洗剤を使い分け、制限時間内にトイレをピカピカにしよう。\n\n清掃で稼いだお金で道具を強化し、トレーニングで成長。\nムエタイ魂で、どんな汚れも吹き飛ばせ！',
    thumbnail: '/project-chai.jpg',
    screenshots: ['/project-chai.jpg'],
    category: 'game',
    tags: ['アクション', '格闘', 'カジュアル', 'ユニーク', 'WebGL'],
    developer: { id: 'dev-sfg', name: 'SFG', avatar: '/sfg-logo.jpg' },
    appUrl: 'https://project-chai-webgl.vercel.app',
    status: 'beta',
    featured: false,
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },
  {
    id: 'app-british-legends',
    name: 'British Legends（ブリティッシュ・レジェンズ）',
    tagline: '文学の英雄たちと冒険する、ドット絵RPG。',
    description: 'British Legends（ブリティッシュ・レジェンズ）は、イギリス文学の名作を舞台にしたドット絵RPGです。\n\nプレイヤーは崩壊した文学世界「Bibliotheca（ビブリオテカ）」を旅し、作品ごとに存在するダンジョンを攻略していきます。\n\nBeowulf、Hamlet、Macbethなど、イギリス文学を代表する主人公たちを仲間にしながら、敵を倒し、素材を集め、キャラクターを進化・強化していきます。\n\nそれぞれの作品世界には独自の敵やボスが存在し、物語を進めることで新たな仲間や時代が解放されます。\n\n学習アプリではなく、まずは純粋なRPGとして楽しめることを重視しています。\n\n遊んでいるうちに自然とイギリス文学の世界観や登場人物に触れられる、新しい文学ファンタジーRPGです。\n\n主な特徴\n・ドラクエ風ターン制バトル\n・素材収集と進化システム\n・作品ごとのダンジョン探索\n・仲間キャラクターの育成\n・ドット絵レトロRPG\n・イギリス文学の世界観を再構築\n・今後も新作品・新キャラクターを追加予定',
    thumbnail: '/british-legends.png',
    screenshots: ['/british-legends.png'],
    category: 'game',
    tags: ['RPG', 'ドット絵', 'ファンタジー', 'イギリス文学', '文学', 'ターン制', '育成', '探索', 'レトロゲーム', 'シングルプレイ'],
    developer: { id: 'dev-sfg', name: 'SFG', avatar: '/sfg-logo.jpg' },
    appUrl: 'https://british-legends.vercel.app',
    status: 'beta',
    featured: true,
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },
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
