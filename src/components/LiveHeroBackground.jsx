import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 120;

const createParticles = (width, height) =>
	Array.from({ length: PARTICLE_COUNT }, () => ({
		x: Math.random() * width,
		y: Math.random() * height,
		vx: 0.15 + Math.random() * 0.45,
		vy: -0.08 + Math.random() * 0.16,
		size: 1 + Math.random() * 2.4,
		alpha: 0.18 + Math.random() * 0.45,
		hue: Math.random() > 0.75 ? '56, 189, 248' : '255, 107, 0',
	}));

const LiveHeroBackground = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		let width = 0;
		let height = 0;
		let particles = [];
		let animationFrame = 0;
		let previousTime = 0;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.offsetWidth;
			height = canvas.offsetHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
			particles = createParticles(width, height);
		};

		const drawGrid = (time) => {
			const gridSize = 54;
			const drift = (time * 0.025) % gridSize;

			context.save();
			context.lineWidth = 1;
			context.strokeStyle = 'rgba(56, 189, 248, 0.12)';

			for (let x = -gridSize + drift; x < width + gridSize; x += gridSize) {
				context.beginPath();
				context.moveTo(x, 0);
				context.lineTo(x + width * 0.12, height);
				context.stroke();
			}

			context.strokeStyle = 'rgba(255, 107, 0, 0.1)';
			for (let y = -gridSize + drift; y < height + gridSize; y += gridSize) {
				context.beginPath();
				context.moveTo(0, y);
				context.lineTo(width, y + height * 0.06);
				context.stroke();
			}
			context.restore();
		};

		const drawSweep = (time) => {
			const sweepX = ((time * 0.09) % (width + 320)) - 160;
			const gradient = context.createLinearGradient(sweepX - 120, 0, sweepX + 120, 0);
			gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
			gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.18)');
			gradient.addColorStop(1, 'rgba(255, 107, 0, 0)');

			context.save();
			context.fillStyle = gradient;
			context.fillRect(sweepX - 120, 0, 240, height);
			context.restore();
		};

		const drawParticles = (delta) => {
			particles.forEach((particle) => {
				particle.x -= particle.vx * delta;
				particle.y += particle.vy * delta;

				if (particle.x < -20) particle.x = width + 20;
				if (particle.y < -20) particle.y = height + 20;
				if (particle.y > height + 20) particle.y = -20;

				context.save();
				context.fillStyle = `rgba(${particle.hue}, ${particle.alpha})`;
				context.shadowColor = `rgba(${particle.hue}, 0.8)`;
				context.shadowBlur = 10;
				context.beginPath();
				context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				context.fill();

				context.strokeStyle = `rgba(${particle.hue}, ${particle.alpha * 0.42})`;
				context.lineWidth = 1;
				context.beginPath();
				context.moveTo(particle.x + 10, particle.y - 2);
				context.lineTo(particle.x + 42, particle.y - 7);
				context.stroke();
				context.restore();
			});
		};

		const render = (time) => {
			const delta = Math.min((time - previousTime) / 16.67 || 1, 2);
			previousTime = time;

			context.clearRect(0, 0, width, height);
			drawGrid(time);
			drawSweep(time);
			drawParticles(delta);

			animationFrame = window.requestAnimationFrame(render);
		};

		resize();
		animationFrame = window.requestAnimationFrame(render);
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
			window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<div className="absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
			<div className="hero-live-image absolute inset-0" />
			<canvas ref={canvasRef} className="absolute inset-0 h-full w-full mix-blend-screen" />
			<div className="hero-live-scanline absolute inset-0" />
			<div className="hero-live-noise absolute inset-0" />
			<div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/85 to-black/25" />
			<div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/30 to-black/20" />
		</div>
	);
};

export default LiveHeroBackground;
