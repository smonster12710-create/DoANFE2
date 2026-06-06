import { useState, useEffect, useMemo, useRef } from "react";
import constellations from "../data/constellations.lines.json";
import { Line } from "@react-three/drei";
import { celestialToXYZ } from "../utils/celestial";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedLine({ points, isSelected }) {
    // 1. Lưu mảng Vector3 để tính toán
    const vectorPoints = useMemo(() => {
        return points.map(p => new THREE.Vector3(...p));
    }, [points]);

    // Reference lưu trữ tiến trình vẽ hiện tại (chạy từ 0 đến 1)
    const progressRef = useRef(0);
    // State chỉ dùng để ép re-render mảng điểm khi thực sự cần thiết
    const [renderPoints, setRenderPoints] = useState(points);

    // Reset lại tiến trình về 0 mỗi khi chòm sao này ĐƯỢC CHỌN
    useEffect(() => {
        if (isSelected) {
            progressRef.current = 0;
        }
    }, [isSelected]);

    // 2. Vòng lặp render của Three.js - Chạy liên tục mỗi khung hình (60fps+)
    useFrame((state, delta) => {
        if (!isSelected) return;

        // Nếu chưa vẽ xong (progress < 1)
        if (progressRef.current < 1) {
            // delta là thời gian trôi qua giữa 2 khung hình. 
            // progress tăng từ 0 lên 1 mất đúng 2 giây (delta / 2.0)
            progressRef.current = Math.min(1, progressRef.current + delta / 2.0);

            // Tính toán số điểm tương ứng với tiến trình hiện tại (t từ 0 đến số đoạn thẳng)
            const t = progressRef.current * (vectorPoints.length - 1);
            const index = Math.floor(t);
            const fraction = t - index;

            // Cắt mảng các điểm đã đi qua hoàn toàn
            const animatedPoints = vectorPoints.slice(0, index + 1);

            // Nội suy điểm đang vẽ dở ở giữa
            if (index < vectorPoints.length - 1) {
                const currentPoint = vectorPoints[index];
                const nextPoint = vectorPoints[index + 1];
                const interpolatedPoint = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, fraction);
                animatedPoints.push(interpolatedPoint);
            }

            // Cập nhật tọa độ dạng mảng thô để vẽ
            setRenderPoints(animatedPoints.map(v => [v.x, v.y, v.z]));
        }
    });

    // Nếu không được chọn, trả về toàn bộ mảng gốc (hiển thị nét mờ mặc định)
    useEffect(() => {
        if (!isSelected) {
            setRenderPoints(points);
        }
    }, [isSelected, points]);

    return (
        <Line
            points={renderPoints.length >= 2 ? renderPoints : points}
            color={isSelected ? "#ff60dd" : "#ffffff"}
            lineWidth={isSelected ? 3 : 1.5}
            transparent={true}
            opacity={isSelected ? 1 : 0.4}
        />
    );
}

export default function ConstellationLines({ selectedId }) {
    return (
        <>
            {constellations.features.map((feature) => {
                const isSelected = feature.id === selectedId;

                return feature.geometry.coordinates.map((segment, index) => {
                    const points = segment.map(([lon, lat]) =>
                        celestialToXYZ(lon, lat, 200)
                    );

                    return (
                        <AnimatedLine
                            key={`${feature.id}-${index}`}
                            points={points}
                            isSelected={isSelected}
                        />
                    );
                });
            })}
        </>
    );
}