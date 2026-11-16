import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <span className="font-anton text-yellow text-xl tracking-wider">SHARE TRAY</span>
        <div className="flex items-center gap-2">
          <Link
            href="/dev/ui"
            className="text-xs px-2.5 py-1 border border-muted-2 rounded-full text-on-dark-1 hover:text-white"
          >
            UI Kit
          </Link>
          <span className="text-xs px-2 py-0.5 border border-yellow text-yellow rounded-full font-bold">
            EN
          </span>
        </div>
      </div>
      <p className="text-xs text-on-dark-2 uppercase font-semibold tracking-wider mb-2">
        Monday, 12:30 · 28°C · Ba Dinh, Hanoi
      </p>
      <h1 className="font-anton text-4xl text-white mb-6">HUNGRY? GO HERE.</h1>
      
      {/* Red Recommendation Hero Card */}
      <div className="bg-red text-white p-5 rounded-[16px] border border-divider-red shadow-lg mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-pink-soft uppercase tracking-wider mb-2">
          <span>4 MIN WALK</span>
          <span>OPEN UNTIL 14:00</span>
        </div>
        <h2 className="font-anton text-4xl text-yellow mb-1">PHỞ TÁI NẪM</h2>
        <p className="text-pink-soft text-sm mb-3">Rare beef noodle soup with fragrant star anise broth</p>
        <div className="flex items-center justify-between pt-2 border-t border-divider-red/50">
          <div>
            <p className="font-bold text-white text-base">Phở Bà Tâm</p>
            <p className="text-xs text-pink-soft">45,000₫ · about $1.70</p>
          </div>
          <Link
            href="/places/pho-ba-tam"
            className="bg-yellow text-ink font-bold px-4 py-2.5 rounded-[12px] text-sm hover:bg-[#FFD966]"
          >
            Show me this place
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Link
          href="/days/linh-saturday"
          className="bg-ink-2 border border-line-dark p-4 rounded-[12px] block hover:border-yellow transition-colors"
        >
          <p className="font-anton text-base text-yellow">BORROW A DAY</p>
          <p className="text-xs text-on-dark-2 mt-1">Linh&apos;s Saturday in Hanoi</p>
        </Link>
        <Link
          href="/together"
          className="bg-ink-2 border border-line-dark p-4 rounded-[12px] block hover:border-yellow transition-colors"
        >
          <p className="font-anton text-base text-yellow">DON&apos;T EAT ALONE</p>
          <p className="text-xs text-on-dark-2 mt-1">Join 8 open tables now</p>
        </Link>
      </div>

      <div className="mt-8 pt-4 border-t border-line-dark text-center">
        <Link href="/contribute" className="text-xs text-on-dark-1 hover:text-white underline">
          Bạn là người Việt? Thêm quán quen của bạn →
        </Link>
      </div>
    </div>
  );
}
