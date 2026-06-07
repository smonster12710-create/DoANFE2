import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, Draggable } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(Draggable);

const Hero = () => {
	const videoRef = useRef();
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const heroSplit = new SplitText(".title", { type: "chars, words" });
		const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
		});

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 1,
		});

		const scrollTl = gsap.timeline({
			scrollTrigger: {
				trigger: "#hero",
				start: "top top",
				end: "bottom top",
				scrub: true,
			},
		});
		scrollTl
			.to(".right-planet", { y: 200 }, 0)
			.to(".left-planet", { y: -200 }, 0)
			.to(".arrow", { y: 100 }, 0);

		const startFloating = (selector) => {
			const isLeft = selector === ".left-planet";
			return gsap.to(selector, {
				y: isLeft ? "+=20" : "-=25",
				rotation: isLeft ? -3 : 4,
				duration: isLeft ? 3 : 3.5,
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
			});
		};

		let floatLeft = startFloating(".left-planet");
		let floatRight = startFloating(".right-planet");

		const setupDraggable = (selector, getFloatTween, setFloatTween) => {
			Draggable.create(selector, {
				type: "x,y",
				edgeResistance: 0.65,
				cursor: "grab",
				activeCursor: "grabbing",

				onDragStart: function () {
					getFloatTween().pause();
					gsap.killTweensOf(this.target);
				},
				onRelease: function () {
					const vx = this.pointerX - this.startX;
					const vy = this.pointerY - this.startY;

					const driftX = Math.max(-80, Math.min(80, vx * 0.2));
					const driftY = Math.max(-80, Math.min(80, vy * 0.2));

					const releaseTl = gsap.timeline({
						onComplete: () => {
							setFloatTween(startFloating(selector));
						}
					});

					releaseTl
						.to(this.target, {
							x: `+=${driftX}`,
							y: `+=${driftY}`,
							duration: 0.6,
							ease: "power2.out"
						})
						.to({}, { duration: 0.4 })
						.to(this.target, {
							x: 0,
							y: 0,
							duration: 1.5,
							ease: "power3.inOut"
						});
				}
			});
		};

		setupDraggable(".left-planet", () => floatLeft, (tween) => { floatLeft = tween; });
		setupDraggable(".right-planet", () => floatRight, (tween) => { floatRight = tween; });

		const startValue = isMobile ? "top 50%" : "top 10%";
		const endValue = isMobile ? "120% top" : "bottom top";

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: "video",
				start: startValue,
				end: endValue,
				scrub: true,
				pin: true,
			},
		});

		videoRef.current.onloadedmetadata = () => {
			tl.to(videoRef.current, {
				currentTime: videoRef.current.duration,
			});
		};
	}, []);

	return (
		<>
			<section id="hero" className="noisy">
				<h1 className="title">Sảnh Tinh Vân</h1>

				<img
					src="/images/hero-left-planet.png"
					alt="left-planet"
					className="left-planet"
					draggable="false"
				/>

				<img
					src="/images/hero-right-planet.png"
					alt="right-planet"
					className="right-planet"
					draggable="false"
				/>

				<div className="body">
					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Lặng im. Sâu thẳm. Vĩnh hằng.</p>
							<p className="subtitle">Đi tìm tinh tú <br /> giữa đêm sâu</p>
						</div>

						<div className="view-star">
							<p className="subtitle">
								Mỗi chòm sao trên bầu trời đều mang trong mình một câu chuyện dân gian cổ xưa, được lưu truyền qua bao thế hệ — đang chờ chính đôi mắt bạn đến khám phá.
							</p>
							<a href="#constellations">Khám phá các vì sao</a>
						</div>
					</div>
				</div>
			</section>

			<div className="video absolute inset-0">
				<video
					ref={videoRef}
					muted
					playsInline
					preload="auto"
					src="/videos/output3_1.mp4"
				/>
			</div>
		</>
	);
};

export default Hero;