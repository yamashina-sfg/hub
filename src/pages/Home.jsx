import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getFeaturedApps, APPS, CATEGORIES, STATUS_LABELS } from '../data/apps';
import AppCard from '../components/AppCard';

function SectionHeader({ title, subtitle, to }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#196c76] mb-1">{subtitle}</p>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="flex items-center text-sm text-[#196c76] font-medium hover:opacity-70 transition-opacity">
          すべて見る <ChevronRight size={15} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const featured = getFeaturedApps();
  const recent = APPS.slice(0, 8);
  const byCategory = CATEGORIES.filter((c) => c.id !== 'all').slice(0, 4).map((cat) => ({
    ...cat,
    apps: APPS.filter((a) => a.category === cat.id).slice(0, 4),
  })).filter((c) => c.apps.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">

      {/* Hero logo banner */}
      <section className="text-center py-8 border-b border-gray-100">
        <img src="/sfg-logo.jpg" alt="SFG HUB" className="h-16 w-auto mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Web アプリ・ゲーム・ツールを探そう</p>
      </section>

      {/* Hero banner – featured app */}
      {featured[0] && (
        <section>
          <SectionHeader title="今週のおすすめ" subtitle="Featured" to="/apps" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppCard app={featured[0]} featured />
            <div className="grid grid-cols-1 gap-4">
              {featured.slice(1, 3).map((app) => (
                <AppCard key={app.id} app={app} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New apps list */}
      <section>
        <SectionHeader title="新着アプリ" subtitle="New" to="/apps" />
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4 divide-y-0">
          {recent.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* Category sections */}
      {byCategory.map((cat) => (
        <section key={cat.id}>
          <SectionHeader title={cat.label} subtitle="Category" to={`/apps?category=${cat.id}`} />
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
            {cat.apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="rounded-3xl bg-gray-50 border border-gray-100 px-8 py-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#196c76] mb-3">Join</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">あなたの作品を SFG HUB に掲載しませんか</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          誰でも掲載可能。ブラウザで動く Web アプリを登録して、みんなに届けよう。
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#196c76' }}
        >
          アプリを登録する
        </Link>
      </section>
    </div>
  );
}
