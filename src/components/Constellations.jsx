import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all'; // 1. Import Draggable
import { constellationLists, nebulaLists } from '../../constants/index.js';
import constellations from "../data/constellations.json";

// 2. Đăng ký plugin
gsap.registerPlugin(Draggable);

const Constellations = () => {
   useGSAP(() => {
      // --- HIỆU ỨNG 1: SCROLL PARALLAX ---
      const parallaxTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: '#constellations',
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: true,
         }
      });

      // Lưu ý: Đổi từ .from sang .to hoặc tinh chỉnh tọa độ phù hợp 
      // vì Draggable sẽ reset tọa độ x, y về vị trí kéo thả.
      parallaxTimeline
         .to('#c-left-leaf', { y: 150 }, 0)
         .to('#c-right-leaf', { y: -150 }, 0);


      // --- HIỆU ỨNG 2: BAY LƠ LỬNG (FLOATING) ---
      const startFloating = (selector) => {
         const isLeft = selector === "#c-left-leaf";
         return gsap.to(selector, {
            y: isLeft ? "+=15" : "-=20",
            rotation: isLeft ? -4 : 3,
            duration: isLeft ? 3.2 : 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
         });
      };

      let floatLeft = startFloating("#c-left-leaf");
      let floatRight = startFloating("#c-right-leaf");


      const setupDraggable = (selector, getFloatTween, setFloatTween) => {
         Draggable.create(selector, {
            type: "x,y",
            edgeResistance: 0.65,
            cursor: "grab",
            activeCursor: "grabbing",
            zIndexBoost: false, // <-- THÊM DÒNG NÀY: Chặn GSAP tự động tăng z-index khi kéo

            onDragStart: function () {
               getFloatTween().pause();
               gsap.killTweensOf(this.target);
            },
            onRelease: function () {
               // ... giữ nguyên toàn bộ logic xử lý onRelease bên dưới của bạn ...
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

      setupDraggable("#c-left-leaf", () => floatLeft, (tween) => { floatLeft = tween; });
      setupDraggable("#c-right-leaf", () => floatRight, (tween) => { floatRight = tween; });

   });

   return (
      <section id="constellations" className="noisy">
         {/* Thêm thuộc tính draggable="false" để tránh xung đột trình duyệt gốc */}
         <img src="/images/star.png" alt="l-leaf" id="c-left-leaf" draggable="false" />
         <img src="/images/star.png" alt="r-leaf" id="c-right-leaf" draggable="false" />

         <div className="list">
            <div className="popular">
               <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
                  <h2>Tinh Tú Kiệt Tác</h2>
                  <span className="text-sm opacity-60 font-medium uppercase tracking-wider">Tầm nhìn</span>
               </div>

               <ul>
                  {constellationLists.map(({ name, country, detail, visibility }) => (
                     <li key={name}>
                        <div className="md:me-28">
                           <h3>{name}</h3>
                           <p>{country} | {detail}</p>
                        </div>
                        <span>{visibility}</span>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="loved">
               <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
                  <h2>Tinh Vân Sâu Thẳm</h2>
                  <span className="text-sm opacity-60 font-medium uppercase tracking-wider">Bối Cảnh</span>
               </div>

               <ul>
                  {nebulaLists.map(({ name, country, detail, visibility }) => (
                     <li key={name}>
                        <div className="me-28">
                           <h3>{name}</h3>
                           <p>{country} | {detail}</p>
                        </div>
                        <span>{visibility}</span>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>
   );
};

export default Constellations;