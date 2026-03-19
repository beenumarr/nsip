type HeaderProps = {
  totalThreats: number
}

const menuItems = ['File', 'Edit', 'View', 'Add', 'Tools', 'Help']
const actionIcons = ['↶', '↷', '⟲', '⌖', '⋯', '◫', '⌗']

function Header({ totalThreats }: HeaderProps) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[1100] px-3 pt-3">
      <div className="pointer-events-auto rounded-[1.65rem] border border-white/10 bg-[rgba(18,18,18,0.92)] px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,_#8fe9ff,_#3f74ff_58%,_#233b82_100%)] shadow-[0_0_20px_rgba(66,153,225,0.35)]">
              <span className="text-sm font-semibold text-white">NS</span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-white/85 lg:flex">
              {menuItems.map((item) => (
                <button key={item} className="transition hover:text-white">
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex min-w-[240px] max-w-[320px] flex-1 items-center gap-3 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white/60">
              <span className="text-base">⌕</span>
              <span className="truncate">Nigeria</span>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              {actionIcons.map((icon, index) => (
                <button
                  key={`${icon}-${index}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-white">NSIP Live</p>
              <p className="text-xs text-cyan-300">{totalThreats} tracked threats</p>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-600 text-sm font-semibold text-white shadow-[0_0_20px_rgba(192,38,211,0.35)]">
              A
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
