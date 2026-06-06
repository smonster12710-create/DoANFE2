import stars from "../data/stars.6.json";
import { celestialToXYZ } from "../utils/celestial";
function getStarColor(bv) {
    if (bv < -0.2) return "royalblue";   // 🔵 Rigel (Xanh dương đậm/đẹp hơn "blue" thuần)
    if (bv < 0.2) return "white";       // ⚪ Sirius (Trắng)
    if (bv < 0.8) return "lightyellow"; // 🟡 Sun-like (Vàng nhạt, nhìn dịu hơn "yellow")
    if (bv < 1.4) return "orange";      // 🟠 Arcturus/Aldebaran (Cam)
    return "tomato";                     // 🔴 Betelgeuse (Đỏ cam, giống màu sao khổng lồ đỏ hơn "red")
}
export default function StarField() {
    return (
        <>
            {stars.features.map((star, index) => {

                const mag =
                    star.properties.mag ?? 5;

                const bv = parseFloat(
                    star.properties.bv ?? 0.65
                );

                const color = getStarColor(bv);
                const [ra, dec] =
                    star.geometry.coordinates;
                const glow =
                    Math.max(
                        1,
                        8 - mag
                    );
                const pos =
                    celestialToXYZ(
                        ra,
                        dec,
                        200
                    );

                const size =
                    Math.max(
                        0.03,
                        0.3 - mag * 0.03
                    );

                return (
                    <mesh
                        key={index}
                        position={pos}
                    >

                        <sphereGeometry
                            args={[size * 2, 8, 8]}
                        />

                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={glow}
                        />
                    </mesh>
                );
            })}
        </>
    );
}