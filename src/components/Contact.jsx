import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import gsap from 'gsap';

const Contact = () => {
	useGSAP(() => {
		const titleSplit = SplitText.create('#contact h2', { type: 'words' });

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
			.to('#f-right-leaf', {
				y: '-50', duration: 1, ease: 'power1.inOut'
			}).to('#f-left-leaf', {
				y: '-50', duration: 1, ease: 'power1.inOut'
			}, '<')
	})

	return (
		<footer id="contact">
			<img src="/images/last.png" alt="leaf-right" id="f-right-leaf" />
			<img src="/images/last2.png" alt="leaf-left" id="f-left-leaf" />

			<div className="content">
				<h2>Nơi Hẹn Ước</h2>

				<div>
					<h3>Ghé Thăm Sảnh Chiêm Tinh</h3>
					<p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
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
								<img src={social.icon} />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Contact
