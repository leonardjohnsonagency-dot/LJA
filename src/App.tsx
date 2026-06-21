import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  Phone, Mail, MapPin, Shield, TrendingUp, Heart, Users,
  Facebook, Instagram, Linkedin, Youtube, ChevronDown, ChevronUp
} from 'lucide-react'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

function buildChartData(start: number) {
  // Historical-style S&P returns (16 years)
  const returns = [0.265, -0.37, 0.265, 0.15, 0.02, 0.16, 0.32, 0.135, 0.014, 0.12, 0.215, -0.045, 0.319, 0.285, -0.185, 0.265]
  let trad = start
  let iul = start
  const data = []
  for (let i = 0; i < returns.length; i++) {
    const r = returns[i]
    trad = trad * (1 + r)
    const iulReturn = Math.min(Math.max(r, 0), 0.12)
    iul = iul * (1 + iulReturn)
    data.push({
      year: `Yr ${i + 1}`,
      Traditional: Math.round(trad),
      IUL: Math.round(iul),
    })
  }
  return { data, tradFinal: Math.round(trad), iulFinal: Math.round(iul) }
}

// ─── Product Card ────────────────────────────────────────────────────────────

interface ProductCardProps {
  icon: React.ReactNode
  title: string
  tagline: string
  description: string
}

function ProductCard({ icon, title, tagline, description }: ProductCardProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
      <p className="text-amber-600 font-medium text-sm">{tagline}</p>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${open ? 'Collapse' : 'Expand'} details for ${title}`}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600 transition-colors mt-auto"
      >
        Learn More {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <p className="text-gray-600 text-sm leading-relaxed border-t pt-3 mt-1">
          {description}
        </p>
      )}
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [startBalance, setStartBalance] = useState(100000)
  const { data: chartData, tradFinal, iulFinal } = buildChartData(startBalance)

  return (
    <div className="min-h-screen font-sans">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2" aria-label="Leonard Johnson Agency – Home">
              {/* FIX: alt="" on decorative logo image */}
              <img src="/assets/shield-icon.png" alt="" className="h-8 w-8 object-contain" />
              <div className="leading-tight">
                <span className="font-bold text-gray-900 text-sm">Leonard Johnson</span>
                <span className="block text-xs text-gray-500 uppercase tracking-widest">Agency</span>
              </div>
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#home" className="hover:text-amber-600 transition-colors">Home</a>
              <a href="#products" className="hover:text-amber-600 transition-colors">Products</a>
              <a href="#calculator" className="hover:text-amber-600 transition-colors">Calculator</a>
              <a href="#appointment" className="hover:text-amber-600 transition-colors">Book a Session</a>
              <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
              <a href="tel:8437045047" className="flex items-center gap-1 text-amber-600 font-semibold hover:text-amber-700">
                <Phone size={14} aria-hidden="true" /> (843) 704-5047
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          {/* FIX: Use WebP for hero image */}
          <picture>
            <source srcSet="/assets/hero-family.webp" type="image/webp" />
            <img
              src="/assets/hero-family.jpg"
              alt="Diverse family building wealth together"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full border border-white/20">
              <Shield size={14} aria-hidden="true" /> Licensed in 30 States
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Build Wealth.<br />
              <span className="text-amber-400">Protect Legacy.</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The Leonard Johnson Agency helps families, retirees, and coaches secure their financial future
              with proven insurance and wealth-building strategies.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#appointment"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Book a Strategy Session →
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 transition-colors backdrop-blur-sm"
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet Leonard ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Meet Your Advisor</p>
            <h2 className="text-4xl font-bold text-gray-900">Meet <span className="text-amber-500">Leonard Johnson</span></h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Hear directly from Leonard about how the agency can help you build wealth and protect your legacy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* FIX: Use WebP headshot — 1.5 MB → 22 KB */}
              <picture>
                <source srcSet="/assets/leonard-headshot.webp" type="image/webp" />
                <img
                  src="/assets/leonard-headshot.png"
                  alt="Leonard Johnson, Financial Strategist"
                  loading="lazy"
                  className="rounded-2xl shadow-xl w-full max-w-sm mx-auto object-cover"
                />
              </picture>
            </div>
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-gray-900">Leonard Johnson</h2>
              <p className="text-gray-600 leading-relaxed">
                Leonard Johnson is a dedicated financial strategist committed to helping families, retirees, and
                professional coaches build lasting wealth and protect the people they love. With licenses across
                30+ states, Leonard brings a personalized, no-pressure approach to every client relationship.
              </p>
              <p className="text-gray-600 leading-relaxed">
                His mission is simple: make financial planning accessible, understandable, and actionable — so
                you can focus on living your life while your money works for you.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: <Shield size={16} />, label: 'Licensed in 30+ States' },
                  { icon: <TrendingUp size={16} />, label: 'Certified Financial Strategist' },
                  { icon: <Users size={16} />, label: 'Families, Retirees & Coaches' },
                  { icon: <MapPin size={16} />, label: 'Based in South Carolina' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-amber-500" aria-hidden="true">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* YouTube Video */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/I0ugk-Fuzmw"
                title="Meet Leonard Johnson – Financial Strategist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Product Education Center</p>
            <h2 className="text-4xl font-bold text-gray-900">
              Solutions Built Around <span className="text-amber-500">Your Goals</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We offer a focused suite of financial products designed to protect your family and grow your wealth — with zero market risk.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              icon={<TrendingUp size={22} />}
              title="Indexed Universal Life (IUL)"
              tagline="Grow Tax-Free. Protect What Matters."
              description="An IUL policy lets your cash value grow linked to a market index (like the S&P 500) with a 0% floor — meaning you never lose money when the market drops, but you participate in gains up to a cap."
            />
            <ProductCard
              icon={<Shield size={22} />}
              title="Fixed Indexed Annuities"
              tagline="Guaranteed Income. Zero Market Risk."
              description="Fixed indexed annuities provide a guaranteed stream of income you cannot outlive. Your principal is protected from market downturns while still having the potential to earn interest."
            />
            <ProductCard
              icon={<Heart size={22} />}
              title="Final Expense Insurance"
              tagline="Leave Love, Not Bills."
              description="Final expense insurance covers funeral costs, medical bills, and other end-of-life expenses so your family isn't burdened financially during an already difficult time."
            />
            <ProductCard
              icon={<Users size={22} />}
              title="Medicare Supplements"
              tagline="Fill the Gaps. Keep Your Doctors."
              description="Medicare supplement (Medigap) plans cover costs that Original Medicare doesn't — like copayments, coinsurance, and deductibles — so you can keep seeing the doctors you trust."
            />
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section id="calculator" className="py-20 bg-[#1a2744] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">"Zero is the Hero"</p>
            <h2 className="text-4xl font-bold">
              See How a <span className="text-amber-400">0% Floor</span> Protects You
            </h2>
            <p className="text-gray-300 mt-3 max-w-xl mx-auto">
              When the market drops, a traditional index investment goes negative. With an IUL's 0% floor,
              you never lose a penny. Enter a starting balance to compare.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <label htmlFor="startBalance" className="block text-sm font-medium text-gray-300 mb-2">
                  Starting Balance
                </label>
                <input
                  id="startBalance"
                  type="number"
                  value={startBalance}
                  onChange={e => setStartBalance(Number(e.target.value) || 0)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  min={1000}
                  step={1000}
                  aria-label="Enter your starting investment balance"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">Traditional Index</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(tradFinal)}</p>
                </div>
                <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-amber-300 mb-1">IUL (0% Floor)</p>
                  <p className="text-2xl font-bold text-amber-400">{formatCurrency(iulFinal)}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Based on a 16-year simulation with historical-style returns. IUL capped at 12% gain, 0% floor.
                This is for illustration only and not a guarantee of future performance.
              </p>
            </div>
            <div className="lg:col-span-2 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => formatCurrency(v)}
                    contentStyle={{ background: '#1a2744', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8 }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#d1d5db' }}
                  />
                  <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} />
                  <Bar dataKey="Traditional" fill="#6b7280" radius={[3, 3, 0, 0]} name="Traditional" />
                  <Bar dataKey="IUL" fill="#f59e0b" radius={[3, 3, 0, 0]} name="IUL (0% Floor)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Client Stories</p>
            <h2 className="text-4xl font-bold text-gray-900">Trusted by Families, Retirees &amp; Coaches</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Leonard made life insurance feel simple — not scary. He walked us through every option and helped us pick the right plan for our family's future.",
                name: 'Marcus & Tiana W.',
                role: 'Young Family, Charlotte NC',
              },
              {
                quote: "As a retired teacher, I needed guaranteed income I couldn't outlive. Leonard set me up with a fixed annuity that gives me peace of mind every single month.",
                name: 'Dorothy H.',
                role: 'Retiree, Columbia SC',
              },
              {
                quote: "I coach high school football and never thought about wealth building until Leonard broke it down for me. Now I have an IUL policy growing tax-free for my kids.",
                name: 'Coach Ray J.',
                role: 'Football Coach, Myrtle Beach SC',
              },
            ].map(({ quote, name, role }) => (
              <figure key={name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <blockquote className="text-gray-600 leading-relaxed mb-4 italic">"{quote}"</blockquote>
                <figcaption>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking ── */}
      <section id="appointment" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Book Your Session</p>
            <h2 className="text-4xl font-bold text-gray-900">
              Let's Build Your <span className="text-amber-500">Financial Game Plan</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Whether you're a family looking to protect your loved ones, a retiree securing guaranteed income,
              or a coach building generational wealth — we'll create a custom strategy just for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <picture>
                <img
                  src="/assets/planning-meeting.jpg"
                  alt="Financial planning meeting with Leonard Johnson"
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
              </picture>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Schedule a Strategy Session</h3>
              <p className="text-gray-600">
                Pick a time that works for you. We'll discuss your goals, answer your questions, and build a
                personalized financial game plan — no pressure, no obligation.
              </p>
              <a
                href="https://app.usemotion.com/meet/leonard-johnson/Insurance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Book My Session →
              </a>
              <p className="text-xs text-gray-400">Powered by Motion · Choose a time that fits your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-10">
            Ready to Start? <span className="text-amber-500">Let's Talk.</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="tel:8437045047"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors">
                <Phone size={20} aria-hidden="true" />
              </div>
              <p className="font-semibold text-gray-900">Call Us</p>
              <p className="text-amber-600 font-medium">(843) 704-5047</p>
            </a>
            <a
              href="mailto:LeonardJohnsonAgency@gmail.com"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors">
                <Mail size={20} aria-hidden="true" />
              </div>
              <p className="font-semibold text-gray-900">Email Us</p>
              <p className="text-amber-600 font-medium text-sm break-all">LeonardJohnsonAgency@gmail.com</p>
            </a>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <p className="font-semibold text-gray-900">Coverage</p>
              <p className="text-gray-600 text-sm">Licensed in 30 States</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0f1a30] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">

            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {/* FIX: alt="" for decorative logo */}
                <img src="/assets/shield-icon.png" alt="" className="h-8 w-8 object-contain" />
                <div>
                  <p className="text-white font-bold">Leonard Johnson Agency</p>
                  <p className="text-xs text-gray-500">Wealth Building &amp; Legacy Protection</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Helping families, retirees, and coaches build lasting wealth and protect their legacy.
                Licensed in 30+ states across the United States.
              </p>
              {/* FIX: Social media links added */}
              <div className="flex items-center gap-3 pt-1">
                <a href="https://www.facebook.com/leonardjohnsonagency" target="_blank" rel="noopener noreferrer" aria-label="Leonard Johnson Agency on Facebook" className="hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/leonardjohnsonagency" target="_blank" rel="noopener noreferrer" aria-label="Leonard Johnson Agency on Instagram" className="hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/in/leonardjohnsonagency" target="_blank" rel="noopener noreferrer" aria-label="Leonard Johnson Agency on LinkedIn" className="hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.youtube.com/@LeonardJohnsonInsuranceAgency" target="_blank" rel="noopener noreferrer" aria-label="Leonard Johnson Agency on YouTube" className="hover:text-white transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-white font-semibold mb-3">Quick Links</p>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2 text-sm">
                  {['Home', 'Products', 'Calculator', 'Book a Session', 'Contact'].map(item => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/ /g, '')}`}
                        className="hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* FIX: Trust signals — NPN, address, licensing info */}
            <div>
              <p className="text-white font-semibold mb-3">Licensing &amp; Compliance</p>
              <address className="not-italic text-sm space-y-2">
                <p>Based in South Carolina</p>
                <p>Licensed in 30+ States</p>
                <p>
                  National Producer Number (NPN):{' '}
                  <span className="text-gray-300 font-medium">
                    {/* Replace with actual NPN */}
                    [Your NPN Here]
                  </span>
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mt-3">
                  Insurance products and services offered by Leonard Johnson Agency.
                  Products may not be available in all states. This website is for
                  informational purposes only and does not constitute financial advice.
                </p>
              </address>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} Leonard Johnson Agency. All rights reserved. Licensed in 30 states.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
