import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { featureLists, goodLists } from '../../constants/index.js';

// Đăng ký Plugin ScrollTrigger với GSAP để kích hoạt tính năng cuộn trang
gsap.registerPlugin(ScrollTrigger);

const Art = () => {

	useGSAP(() => {
		let mm = gsap.matchMedia();

		// Cấu hình cuộn trang cho LAPTOP / PC (Màn hình rộng)
		mm.add("(min-width: 768px)", () => {
			const maskTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '#art',
					start: 'top top',
					end: 'bottom center',
					scrub: 1.5,
					pin: true,
					invalidateOnRefresh: true, // SỬA: Ép GSAP xóa cache và tính toán lại khi đổi màn hình
					anticipatePin: 1          // SỬA: Giảm thiểu hiện tượng giật lag khi kích hoạt Pin
				}
			});

			maskTimeline
				.to('.will-fade', { opacity: 0, stagger: 0.1, ease: 'power1.inOut' })
				.to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut' })
				.to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
		});

		// Cấu hình cuộn trang cho ĐIỆN THOẠI (Mobile)
		mm.add("(max-width: 767px)", () => {
			const maskTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '#art',
					start: 'top top',
					end: '+=130%',
					scrub: 1.5,
					pin: true,
					invalidateOnRefresh: true, // SỬA: Ép GSAP xóa cache và tính toán lại khi đổi màn hình
					anticipatePin: 1          // SỬA: Giảm thiểu hiện tượng giật lag khi kích hoạt Pin
				}
			});

			maskTimeline
				.to('.will-fade', { opacity: 0, stagger: 0.1, ease: 'power1.inOut' })
				.to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut' })
				.to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
		});

		// SỬA: Fix triệt để lỗi đổi từ PC sang Mobile trên DevTools không cần F5
		const handleResize = () => {
			// Đợi 200ms để CSS Tailwind áp dụng hoàn toàn vào DOM rồi mới ép ScrollTrigger refresh lại tọa độ
			setTimeout(() => {
				ScrollTrigger.refresh();
			}, 200);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			mm.revert(); // Dọn dẹp bộ nhớ khi component unmount
			window.removeEventListener('resize', handleResize);
		};
	});

	return (
		<div id="art">
			<div className="container">
				{/* PHASE 1: Tiêu đề chính (Sẽ mờ dần khi cuộn) */}
				<h2 className="will-fade">Góc Viễn Vọng</h2>

				{/* PHASE 1: Nội dung lists và Ngôi sao ở giữa */}
				<div className="content">
					{/* Khối danh sách bên trái */}
					<ul className="will-fade">
						{goodLists.map((feature, index) => (
							<li key={index}>
								<img src="/images/check.png" alt="check" />
								<p>{feature}</p>
							</li>
						))}
					</ul>

					{/* Khối ảnh Ngôi sao trung tâm */}
					<div className="star-img">
						<img
							src="/images/Catching the star of hope.png"
							alt="star"
							// w-full h-full object-cover đảm bảo ảnh lấp đầy khung hình 1:1 một cách đẹp nhất
							className="masked-img w-full h-full object-cover"
						/>
					</div>

					{/* Khối danh sách bên phải */}
					<ul className="will-fade">
						{featureLists.map((feature, index) => (
							<li key={index}>
								<img src="/images/check.png" alt="check" />
								<p>{feature}</p>
							</li>
						))}
					</ul>
				</div>

				{/* PHASE 2: Khối chữ nằm ở DƯỚI CÙNG (Sẽ hiển thị khi cuộn xong hiệu ứng zoom ảnh) */}
				<div className="masked-container">
					<div id="masked-content">
						<h2>Vũ Trụ Của Những Kỳ Quan</h2>
						<h3>Viết Giữa Ngàn Sao, Vẽ Bằng Nhiệt Huyết</h3>
						<p>Đây không chỉ là màn đêm tăm tối. Đây là khoảnh khắc vũ trụ tuyệt mỹ, được lưu giữ trọn vẹn dành riêng cho bạn.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Art;