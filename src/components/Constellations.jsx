import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { constellationLists, nebulaLists } from '../../constants/index.js'
import constellations from "../data/constellations.json";
const Constellations = () => {
   useGSAP(() => {
      const parallaxTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: '#constellations',
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: true,
         }
      })

      parallaxTimeline
         .from('#c-left-leaf', {
            x: -100, y: 100
         })
         .from('#c-right-leaf', {
            x: 100, y: 100
         })
   })

   return (
      <section id="constellations" className="noisy">
         <img src="/images/star.png" alt="l-leaf" id="c-left-leaf" />
         <img src="/images/star.png" alt="r-leaf" id="c-right-leaf" />

         <div className="list">
            <div className="popular">
               {/* 1. Đưa tiêu đề và chữ Visibility vào một khối flex/grid để ép chúng sang 2 đầu */}
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
               {/* 2. Làm tương tự cho khối bên cạnh */}
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
   )
}

export default Constellations;