import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText, Draggable } from 'gsap/all'; // Đăng ký thêm Draggable
import gsap from 'gsap';

gsap.registerPlugin(Draggable);

const Contact = () => {
	useGSAP(() => {
		const titleSplit = SplitText.create('#contact h2', { type: 'words' });

		// --- HIỆU ỨNG TẠO ANIME XUẤT HIỆN BAN ĐẦU ---
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: '#contact',
				start: 'top center',
			},
			ease: "power1.inOut"
		})

		timeline
			.from(titleSplit.words, {
				opacity: 0, yPercent: 100, stagger: 0.02
			})
			.from('#contact h3, #contact p', {
				opacity: 0, yPercent: 100, stagger: 0.02
			})
			// Thay đổi một chút từ .to thành .from để không xung đột tọa độ neo với Draggable
			.from('#f-right-leaf, #f-left-leaf', {
				y: 50, opacity: 0, duration: 1, ease: 'power1.inOut', stagger: 0.1
			})

		// --- HIỆU ỨNG TỰ ĐỘNG BAY LƠ LỬNG (FLOATING) ---
		const startFloating = (selector) => {
			const isLeft = selector === "#f-left-leaf";
			return gsap.to(selector, {
				y: isLeft ? "+=15" : "-=20",
				rotation: isLeft ? -4 : 3,
				duration: isLeft ? 3.5 : 3,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
			});
		};

		let floatLeft = startFloating("#f-left-leaf");
		let floatRight = startFloating("#f-right-leaf");

		// --- HIỆU ỨNG KÉO THẢ (DRAGGABLE) ---
		const setupDraggable = (selector, getFloatTween, setFloatTween) => {
			Draggable.create(selector, {
				type: "x,y",
				edgeResistance: 0.65,
				cursor: "grab",
				activeCursor: "grabbing",
				zIndexBoost: false, // Ngăn chặn GSAP tự nhảy z-index lên trước chữ khi kéo

				onDragStart: function () {
					getFloatTween().pause();
					gsap.killTweensOf(this.target);
				},
				onRelease: function () {
					const vx = this.pointerX - this.startX;
					const vy = this.pointerY - this.startY;

					const driftX = Math.max(-60, Math.min(60, vx * 0.15));
					const driftY = Math.max(-60, Math.min(60, vy * 0.15));

					const releaseTl = gsap.timeline({
						onComplete: () => {
							setFloatTween(startFloating(selector));
						}
					});

					releaseTl
						.to(this.target, {
							x: `+=${driftX}`,
							y: `+=${driftY}`,
							duration: 0.5,
							ease: "power2.out"
						})
						.to({}, { duration: 0.3 })
						.to(this.target, {
							x: 0,
							y: 0,
							duration: 1.2,
							ease: "power3.inOut"
						});
				}
			});
		};

		setupDraggable("#f-left-leaf", () => floatLeft, (tween) => { floatLeft = tween; });
		setupDraggable("#f-right-leaf", () => floatRight, (tween) => { floatRight = tween; });
	})

	return (
		<footer id="contact">
			{/* Đổi thuộc tính draggable và bổ sung cấu trúc chuẩn */}
			<img src="/images/last.png" alt="leaf-right" id="f-right-leaf" draggable="false" />
			<img src="/images/last2.png" alt="leaf-left" id="f-left-leaf" draggable="false" />

			<div className="content">
				<h2>Thông Tin</h2>

				<div>
					<h3>Ghé Thăm Sảnh Chiêm Tinh</h3>
					<p>Hàm Thuận Nam, Bình Thuận</p>
				</div>

				<div>
					<h3>Kết Nối Với Chúng Tôi</h3>
					<p>(555) 987-6543</p>
					<p>hello@stellalounge.com</p>
				</div>

				<div>
					<h3>Mở Cửa Mỗi Ngày</h3>
					{openingHours.map((time) => (
						<p key={time.day}>
							{time.day} : {time.time}
						</p>
					))}
				</div>

				<div>
					<h3>Mạng Xã Hội</h3>

					<div className="flex-center gap-5">
						{socials.map((social) => (
							<a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.name}
							>
								<img src={social.icon} alt={social.name} />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Contact