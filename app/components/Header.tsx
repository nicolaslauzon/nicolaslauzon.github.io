'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'Accueil', href: '#home', section: 'home' },
  { label: 'À propos', href: '#about', section: 'about' },
  { label: 'Formations', href: '#formations', section: 'formations' },
  { label: 'Contact', href: '#contact', section: 'contact' },
  { label: 'Réserver un cours', href: 'https://lvlupmtb.simplybook.me/v2/#book', external: true },
];



function Header() {
	const [showTitle, setShowTitle] = useState(false); // hidden by default
	const [mounted, setMounted] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('home');
	const [hideBurger, setHideBurger] = useState(false);

	// Listen for cert-modal event to hide/show burger menu
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handler = (e: Event) => {
			const custom = e as CustomEvent;
			setHideBurger(!!(custom.detail && custom.detail.open));
		};
		window.addEventListener('cert-modal', handler);
		return () => window.removeEventListener('cert-modal', handler);
	}, []);

	useEffect(() => {
		setMounted(true);
		if (typeof window === 'undefined') return;
		const sectionIds = ['home', 'about', 'formations', 'contact'];

		// Find the scrollable container
		const container = document.querySelector('.main-scroll-container');
		if (!container) return;

		let lastSection = 'home';
		const handleScroll = () => {
			let current = 'home';
			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (el && container) {
					const containerRect = container.getBoundingClientRect();
					const elRect = el.getBoundingClientRect();
					// Calculate the element's top relative to the container
					const relativeTop = elRect.top - containerRect.top;
					const relativeBottom = elRect.bottom - containerRect.top;
					// Use 120px as the reference point inside the container
					if (relativeTop <= 120 && relativeBottom > 120) {
						current = id;
						break;
					}
				}
			}
			setActiveSection(current);
			// Update the URL hash if it changed
			if (current !== lastSection) {
				if (window.location.hash !== `#${current}`) {
					history.replaceState(null, '', `#${current}`);
				}
				lastSection = current;
			}
		};
		container.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

	// Only render the title after mount, and only if not on home section
	const shouldShowTitle = mounted && showTitle;

	return (
		<header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 h-16 bg-transparent">
			<div
				className={`text-white font-semibold text-lg md:text-xl tracking-wide transition-opacity duration-300 ${
					shouldShowTitle ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			>
				Nicolas Lauzon
			</div>
			<nav className="hidden md:flex items-center gap-6 md:gap-8">
				{nav.map((item, idx) =>
					item.label === 'Réserver un cours' ? (
						<a
							key={item.label}
							href={item.href}
							className="text-white font-medium px-4 md:px-6 py-2 border border-white rounded-full transition hover:bg-white/10"
							style={{ marginLeft: idx === 0 ? 0 : '1.5rem' }}
							{...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
						>
							{item.label}
						</a>
					) : (
						<a
							key={item.label}
							href={item.href}
							className={`text-white font-medium transition ${item.section === activeSection ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'}`}
							style={{ marginLeft: idx === 0 ? 0 : '1.5rem' }}
							{...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
						>
							{item.label}
						</a>
					)
				)}
			</nav>
			{/* Mobile menu button */}
			{!hideBurger && (
				<button
					className="md:hidden text-white focus:outline-none"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Menu"
				>
					<svg
						className="w-7 h-7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			)}
			{/* Mobile menu */}
			{menuOpen && (
				<div className="absolute top-16 right-4 bg-neutral-900/95 rounded-xl shadow-lg flex flex-col items-end p-4 gap-4 md:hidden animate-slide-in-right">
					{nav.map((item) => (
						<a
							key={item.label}
							href={item.href}
							className={`text-white font-medium px-4 py-2 rounded transition w-full text-right ${
								item.label === 'Réserver un cours' ? 'border border-white' : ''
							}`}
							onClick={() => setMenuOpen(false)}
							{...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
						>
							{item.label}
						</a>
					))}
				</div>
			)}
		</header>
	);
}

export default Header;
