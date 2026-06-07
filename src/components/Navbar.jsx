import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Thêm dòng này

// Đăng ký plugin ScrollTrigger với GSAP
gsap.registerPlugin(ScrollTrigger);

import { navLinks } from '../../constants/index.js';

const Navbar = () => {
	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: 'nav',
				start: 'bottom top',
				toggleActions: 'play none none reverse' // Cuộn xuống thì đổi màu, cuộn lên thì trong suốt lại
			}
		});

		navTween.fromTo('nav',
			{ backgroundColor: 'transparent', backdropFilter: 'blur(0px)' },
			{
				backgroundColor: '#00000050',  // Đen mờ 50%
				backdropFilter: 'blur(10px)',  // Sửa thành backdropFilter cho đúng chuẩn CSS
				duration: 0.5,                 // 0.5 giây chuyển đổi là vừa mượt
				ease: 'power1.inOut'
			}
		);
	});

	return (
		<nav> {/* Giữ nguyên <nav> sạch như cũ vì CSS đã lo phần fixed/layout */}
			<div>
				<a href="#home" className="flex items-center gap-2">
					<img src="/images/logo1.png" alt="logo" />
					<p>Sảnh Tinh Vân</p>
				</a>

				<ul>
					{navLinks.map((link) => (
						<li key={link.id}>
							<a href={`#${link.id}`}>{link.title}</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}
export default Navbar;