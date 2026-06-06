import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import ConstellationLabels from "./ConstellationLabels";
import ConstellationLines from "./ConstellationLines";
import StarField from "./StarField";

export default function GalaxyExplorer() {
    const orbitControlsRef = useRef();
    const stageRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Quản lý thông tin chòm sao được click chọn trực tiếp trong 3D canvas
    const [selectedConstellation, setSelectedConstellation] = useState(null);

    // Hàm xử lý camera tự động bay và hướng thẳng góc nhìn vào chòm sao được chọn
    const handleSelectConstellation = (constellation) => {
        setSelectedConstellation(constellation);
        updateCameraToConstellation(constellation);
    };

    // Tách riêng logic cập nhật camera để có thể gọi lại khi resize/fullscreen
    const updateCameraToConstellation = (constellation) => {
        if (!constellation || !orbitControlsRef.current) return;

        const controls = orbitControlsRef.current;
        const camera = controls.object;

        controls.reset();

        // Đặt tâm xoay mới của camera chính là tọa độ 3D của chòm sao đó
        controls.target.set(constellation.position[0], constellation.position[1], constellation.position[2]);

        const posX = constellation.position[0];
        const posY = constellation.position[1];
        const posZ = constellation.position[2];

        const length = Math.sqrt(posX * posX + posY * posY + posZ * posZ);
        const zoomFactor = (length + 60) / length;

        camera.position.set(
            posX * zoomFactor,
            posY * zoomFactor,
            posZ * zoomFactor
        );

        if (camera.updateProjectionMatrix) camera.updateProjectionMatrix();
        controls.update();
    };

    // CHÌA KHÓA FIX BUG: Lắng nghe fullscreen đổi để khóa lại góc nhìn, BỎ setCanvasKey
    useEffect(() => {
        const onFullscreenChange = () => {
            const isCurrentlyFull = document.fullscreenElement === stageRef.current;
            setIsFullscreen(isCurrentlyFull);
            
            // Đợi 150ms để trình duyệt hoàn tất việc phóng to/thu nhỏ rồi ghim chặt camera lại
            setTimeout(() => {
                if (selectedConstellation) {
                    updateCameraToConstellation(selectedConstellation);
                }
            }, 150);
        };
        
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, [selectedConstellation]); // Theo dõi selectedConstellation để cập nhật chính xác

    const resetView = () => {
        if (orbitControlsRef.current) {
            const controls = orbitControlsRef.current;
            controls.reset();
            controls.target.set(0, 0, 0);
            controls.object.position.set(0, 0, 400);
            if (controls.object.updateProjectionMatrix) controls.object.updateProjectionMatrix();
            controls.update();
        }
        setSelectedConstellation(null);
    };

    const toggleFullscreen = async () => {
        if (!stageRef.current) return;
        try {
            if (!document.fullscreenElement) {
                await stageRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error("Lỗi fullscreen:", err);
        }
    };

    return (
        <section id="solar-system" className="solar-system-section">
            <div className="solar-system-shell">

                <div className="solar-system-header">
                    <span className="solar-system-badge">360° Space Lab</span>
                    <h2>Quan sát bản đồ chòm sao</h2>
                    <p>Click chuột trực tiếp vào tên hoặc khối của chòm sao để xem thông tin chi tiết.</p>
                </div>

                <div ref={stageRef} className="solar-system-stage">
                    {/* Đã xóa bỏ thuộc tính key={canvasKey} để chống hủy/vẽ lại Canvas ngoài ý muốn */}
                    <Canvas camera={{ position: [0, 0, 400], fov: 60 }}>
                        <ambientLight intensity={1} />
                        <Stars radius={300} depth={100} count={10000} factor={4} />
                        <StarField />
                        <ConstellationLines selectedId={selectedConstellation?.id} />
             
                        <ConstellationLabels
                            onSelect={handleSelectConstellation}
                            selectedId={selectedConstellation?.id}
                        />

                        <OrbitControls
                            ref={orbitControlsRef}
                            enableZoom={true}
                            enablePan={true}
                            enableDamping={true}
                            dampingFactor={0.05}
                            minDistance={80}
                            maxDistance={650}
                        />
                    </Canvas>

                    {selectedConstellation && (
                        <div className="planet-detail-card">
                            <button type="button" className="planet-detail-back" onClick={resetView}>
                                ← Quay lại bản đồ
                            </button>

                            <div className="planet-detail-info">
                                <span style={{ fontSize: "10px", color: "#4ea3ff", textTransform: "uppercase" }}>
                                    Chòm sao ID: {selectedConstellation.id}
                                </span>

                                <h3 style={{ margin: "5px 0", fontSize: "24px" }}>{selectedConstellation.name}</h3>
                                <p style={{ fontStyle: "italic", color: "#ccc" }}>{selectedConstellation.en}</p>

                                <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px" }}>
                                    <div className="detail-item">
                                        <small>Ký hiệu</small>
                                        <p style={{ margin: 0, fontWeight: "bold" }}>{selectedConstellation.desig}</p>
                                    </div>
                                    <div className="detail-item">
                                        <small>Thứ hạng</small>
                                        <p style={{ margin: 0, fontWeight: "bold" }}>{selectedConstellation.rank}</p>
                                    </div>
                                </div>

                                <div style={{ marginTop: "15px", padding: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "5px" }}>
                                    <small>Tên gọi khác (Hán tự):</small>
                                    <p style={{ fontSize: "18px", margin: "5px 0" }}>{selectedConstellation.zh}</p>
                                </div>

                                <ul style={{ listStyle: "none", padding: 0, marginTop: "20px", fontSize: "11px", color: "#888" }}>
                                    <li><b>Tọa độ Thiên cầu X:</b> {selectedConstellation.position[0].toFixed(1)}</li>
                                    <li><b>Tọa độ Thiên cầu Y:</b> {selectedConstellation.position[1].toFixed(1)}</li>
                                    <li><b>Tọa độ Thiên cầu Z:</b> {selectedConstellation.position[2].toFixed(1)}</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="solar-system-controls">
                        <button type="button" onClick={resetView}>Đặt lại góc nhìn</button>
                        <button type="button" onClick={toggleFullscreen}>
                            {isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}