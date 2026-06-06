import labels from "../data/constellations.json";
import { celestialToXYZ } from "../utils/celestial";
import { Billboard, Text } from "@react-three/drei";

// Nhận hàm onSelect từ component cha truyền xuống

export default function ConstellationLabels({ onSelect, selectedId }) {
    return (
        <>
            {labels.features.map((feature) => {
                const isSelected = feature.id === selectedId; // Kiểm tra xem chòm sao này có đang được chọn không
                const [lon, lat] = feature.geometry.coordinates;
                const pos = celestialToXYZ(lon, lat, 200);

                return (
                    <Billboard key={feature.id} position={pos}>
                        <Text
                            fontSize={isSelected ? 4.5 : 3}
                            color={isSelected ? "#ff60dd" : "white"}
                            anchorX="center"
                            anchorY="middle"

                            // THÊM ĐOẠN NÀY ĐỂ TẠO VIBE PHÁT SÁNG:
                            outlineWidth={isSelected ? 0.3 : 0}      // Độ dày viền ngoài
                            outlineColor={isSelected ? "#ff60dd" : "transparent"} // Màu viền trùng với màu chữ
                            outlineOpacity={0.4}                     // Độ trong suốt của viền để tạo cảm giác tỏa sáng

                            onClick={(e) => {
                                e.stopPropagation();
                                if (onSelect) {
                                    onSelect({
                                        id: feature.id,
                                        name: feature.properties.name,
                                        desig: feature.properties.desig,
                                        rank: feature.properties.rank,
                                        zh: feature.properties.zh,
                                        en: feature.properties.en,
                                        position: pos
                                    });
                                }
                            }}
                            onPointerOver={(e) => {
                                document.body.style.cursor = "pointer";
                                if (!isSelected) e.object.color.set("#4ea3ff");
                            }}
                            onPointerOut={(e) => {
                                document.body.style.cursor = "auto";
                                if (!isSelected) e.object.color.set("white");
                            }}
                        >
                            {feature.properties.name}
                        </Text>
                    </Billboard>
                );
            })}
        </>
    );
}