"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBiking, FaFirstAid } from "react-icons/fa";


const certifications = [
	{
		id: 1,
		title: "Entraîneur avancé GSMBC",
		subtitle: "Niveau 3",
		file: "/certifications/gsmbc.pdf",
		preview: "/certifications/gsmbc.png",
	},
	{
		id: 2,
		title: "Secourisme en régions isolées",
		subtitle: "20h",
		file: "/certifications/siriusmedx.pdf",
		preview: "/certifications/siriusmedx.png",
	},
];


export default function CertificationsSection() {
	const [selectedCert, setSelectedCert] = useState<number | null>(null);

	// Notify header to hide/show burger menu on mobile
	useEffect(() => {
		if (typeof window === 'undefined') return;
		// Hide burger menu
		const event = new CustomEvent('cert-modal', { detail: { open: !!selectedCert } });
		window.dispatchEvent(event);
		// Prevent background scroll when modal is open
		if (selectedCert) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [selectedCert]);

	return (
		<section
			id="formations"
			className="relative h-screen flex items-center justify-center snap-start snap-always"
		>
			<Image
				src="/certifications.jpg"
				alt="Background"
				fill
      className="object-cover object-[50%_100%] sm:object-left-bottom"
				quality={100}
			/>
			<div className="absolute inset-0 bg-black/50" />

			<div className="relative z-10 w-full max-w-6xl px-2 sm:px-8">
				   <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white text-center mb-8 sm:mb-12 drop-shadow-2xl">
					   Formations
				   </h1>

				<div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center flex-wrap">
					{certifications.map((cert) => (
						<button
							key={cert.id}
							onClick={() => setSelectedCert(cert.id)}
							className="bg-white/90 rounded-lg p-4 sm:p-6 shadow-2xl transition-all hover:scale-105 w-80 sm:w-96 max-w-full cursor-pointer"
						>
							<div className="flex flex-col items-center gap-3">
								<div className="w-full h-24 sm:h-32  rounded flex items-center justify-center">
									{cert.title.toLowerCase().includes("entraîneur") ? (
										<FaBiking className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
									) : cert.title.toLowerCase().includes("secourisme") ? (
										<FaFirstAid className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
									) : (
										<FaBiking className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
									)}
								</div>
								<h3 className="text-lg sm:text-xl font-bold text-gray-900">
									{cert.title}
								</h3>
								<p className="text-gray-600 text-sm sm:text-base">
									{cert.subtitle}
								</p>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Modal */}
			{selectedCert && (
				<div
					className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-2 sm:p-4"
				>
					{/* Modal content */}
					<div
						className="relative w-full max-w-full sm:max-w-5xl h-[90vh] flex items-center justify-center z-[101]"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedCert(null)}
							className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white rounded-full p-2 shadow-lg hover:bg-gray-800 z-[102] border border-black cursor-pointer"
							style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
									stroke="white"
								/>
							</svg>
						</button>
						<img
							src={
								certifications.find((c) => c.id === selectedCert)?.preview || ""
							}
							alt={
								certifications.find((c) => c.id === selectedCert)?.title + " preview"
							}
							className="max-h-[80vh] max-w-full object-contain z-[100]"
							style={{ pointerEvents: 'auto' }}
						/>
					</div>
					{/* Click outside to close - overlay rendered after modal content so it does not block pointer events */}
					<div
						className="absolute inset-0 z-[99]"
						style={{ pointerEvents: 'auto' }}
						onClick={() => setSelectedCert(null)}
					/>
				</div>
			)}
		</section>
	);
}
