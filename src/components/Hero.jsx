import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
	const videoRef = useRef();

	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const heroSplit = new SplitText(".title", {
			type: "chars, words",
		});

		const paragraphSplit = new SplitText(".subtitle", {
			type: "lines",
		});

		// Apply text-gradient class once before animating
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

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#hero",
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			})
			.to(".right-planet", { y: 200 }, 0)
			.to(".left-planet", { y: -200 }, 0)
			.to(".arrow", { y: 100 }, 0);

		const startValue = isMobile ? "top 50%" : "center 60%";
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
				/>
				<img
					src="/images/hero-right-planet.png"
					alt="right-planet"
					className="right-planet"
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
					src="/videos/output2.mp4"
				/>
			</div>
		</>
	);
};

export default Hero;