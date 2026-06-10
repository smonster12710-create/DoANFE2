
<div align="center">
  <br />
  <h1 align="center">Sảnh Tinh Vân - Khám Phá Vũ Trụ</h1>
  <h3 align="center">Trải nghiệm tương tác Thiên văn học với React & GSAP</h3>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React-blue?style=for-the-badge&logo=react&logoColor=white" />
    <img src="https://img.shields.io/badge/-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  </div>
</div>

## 📋 Mục lục

1. 🤖 [Giới thiệu](#introduction)
2. ⚙️ [Công nghệ sử dụng](#tech-stack)
3. 🔋 [Tính năng nổi bật](#features)
4. 🤸 [Hướng dẫn cài đặt](#quick-start)

---

## <a name="introduction">🤖 Giới thiệu</a>

**Sảnh Tinh Vân** là một nền tảng web tương tác đưa người dùng vào hành trình khám phá vũ trụ bao la ngay trên trình duyệt. Dự án được thiết kế với phong cách hiện đại, sử dụng hiệu ứng cuộn chuột (scroll-driven experience) mượt mà để dẫn dắt người xem tìm hiểu về các chòm sao, tinh vân cổ xưa và những kiến thức thiên văn học kỳ thú.

Với sự kết hợp giữa thiết kế không gian tối sâu thẳm (dark theme) và các chuyển động tinh tế của GSAP, website mang lại một trải nghiệm thị giác điện ảnh ấn tượng, kích thích sự tò mò của những tâm hồn yêu thích bầu trời đêm.

---

## <a name="tech-stack">⚙️ Công nghệ sử dụng</a>

- **[React](https://react.dev/)**: Thư viện JavaScript chính giúp xây dựng giao diện người dùng theo cấu trúc thành phần (component-based) modular, hỗ trợ quản lý trạng thái mượt mà cho các phần tương tác động.
- **[GSAP (GreenSock)](https://gsap.com/)**: Thư viện animation cốt lõi mạnh mẽ được tích hợp để xử lý các hiệu ứng cuộn trang thông minh (`ScrollTrigger`), kỹ thuật Parallax tạo chiều sâu không gian, các hiệu ứng làm mờ/hiển thị văn bản mượt mà và chuyển cảnh giữa các phân đoạn.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first giúp thiết kế giao diện tùy biến nhanh chóng trực tiếp trong code, tối ưu hóa giao diện hiển thị.
- **[Vite](https://vitejs.dev/)**: Công cụ build thế hệ mới siêu nhanh, giúp tăng tốc độ phản hồi Hot Module Replacement (HMR) khi phát triển dự án và tối ưu hóa mã nguồn khi đóng gói ra mắt sản phẩm.

---

## <a name="features">🔋 Tính năng nổi bật</a>

👉 **Giao diện Không Gian Huyền Ảo**: Thiết kế giao diện tối chuyên sâu, kết hợp hình ảnh các hành tinh, thiên thạch di chuyển sống động tạo cảm giác chân thực dưới màn đêm.

👉 **Hiệu ứng ScrollTrigger & Parallax**: Tạo chuyển động mượt mà cho các tầng nội dung (Tinh Tú Kiệt Tác, Tinh Vân Sâu Thẳm, Góc Viễn Vọng) dựa trên tốc độ cuộn chuột của người dùng.

👉 **Mô phỏng Hệ Mặt Trời 360° (Space Lab)**: Tích hợp phòng thí nghiệm không gian cho phép người dùng quan sát quỹ đạo quay của các hành tinh với đầy đủ tính năng: xem toàn màn hình, tạm dừng, đặt lại góc nhìn và tùy chỉnh tốc độ xoay.

👉 **Trích dẫn truyền cảm hứng**: Lồng ghép các câu nói kinh điển về vũ trụ và ánh sáng từ những nhà khoa học vĩ đại như Albert Einstein một cách nghệ thuật bằng hiệu ứng chữ sinh động.

👉 **Bản đồ Chòm Sao Tương Tác**: Cho phép người dùng click tương tác trực tiếp vào các thiên thể, khối chòm sao để khám phá thông tin và các câu chuyện dân gian cổ xưa.

👉 **Thiết kế Responsive hoàn chỉnh**: Đảm bảo toàn bộ các chuyển động phức tạp của GSAP và giao diện mô phỏng hoạt động mượt mà, tối ưu trên mọi kích thước thiết bị.

---

## <a name="quick-start">🤸 Hướng dẫn cài đặt</a>

Làm theo các bước sau để thiết lập và chạy thử dự án trên máy tính của bạn.

### Điều kiện tiên quyết

Hãy chắc chắn rằng máy bạn đã cài sẵn các công cụ sau:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) hoặc yarn

### Các bước thực hiện

**1. Clone mã nguồn về máy**
```bash
git clone <đường-dẫn-kho-chứa-của-bạn>
cd sanh-tinh-van
2. Cài đặt các gói thư viện phụ thuộc

Bash
npm install
3. Khởi chạy server ở môi trường local

Bash
npm run dev
Mở trình duyệt và truy cập vào đường dẫn: http://localhost:5173 để bắt đầu hành trình khám phá vũ trụ.