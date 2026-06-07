import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import { featureLists, goodLists } from '../../constants/index.js'

const Art = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const start = isMobile ? 'top 20%' : 'top top';

		const maskTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '#art',
				start,
				end: 'bottom center',
				scrub: 1.5,
				pin: true
			}
		})

		maskTimeline
			.to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', })
			.to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut ' })
			.to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' })
	})

	return (
		<div id="art">
			<div className="container mx-auto h-full pt-20">
				<h2 className="will-fade">Góc Viễn Vọng</h2>

				<div className="content">
					<ul className="space-y-4 will-fade">
						{goodLists.map((feature, index) => (
							<li key={index} className="flex items-center gap-2">
								<img src="/images/check.png" alt="check" />
								<p>{feature}</p>
							</li>
						))}
					</ul>

					<div className="star-img">
						<img
							src="/images/Catching the star of hope.png"
							alt="star"
							className="abs-center masked-img size-full object-contain"
						/>
					</div>

					<ul className="space-y-4 will-fade">
						{featureLists.map((feature, index) => (
							<li key={index} className="flex items-center justify-start gap-2">
								<img src="/images/check.png" alt="check" />
								<p className="md:w-fit w-60">{feature}</p>
							</li>
						))}
					</ul>
				</div>

				<div className="masked-container">
					<h2 className="will-fade">Vũ Trụ Của Những Kỳ Quan</h2>
					<div id="masked-content">
						<h3>Viết Giữa Ngàn Sao, Vẽ Bằng Nhiệt Huyết</h3>
						<p>Đây không chỉ là màn đêm tăm tối. Đây là khoảnh khắc vũ trụ tuyệt mỹ, được lưu giữ trọn vẹn dành riêng cho bạn.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Art
