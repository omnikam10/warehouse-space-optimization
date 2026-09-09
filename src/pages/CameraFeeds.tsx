import { useEffect, useRef } from "react";
import { cameras } from "../data/cameras";
import "./camera-feeds.css";

const CameraFeeds = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Attempt to autoplay all camera feeds.
    // muted is required by most browsers for autoplay.
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Browser may block autoplay until user interacts with the page.
        });
      }
    });
  }, []);

  return (
    <section className="camera-feeds-page">
      {/* PAGE HEADER */}
      <div className="camera-page-header">
        <h1>Camera Feeds</h1>

        <p>
          Monitor live video feeds from warehouse cameras
        </p>
      </div>

      {/* CAMERA GRID */}
      <div className="camera-grid">
        {cameras.map((camera, index) => (
          <div className="camera-card" key={camera.id}>
            {/* CARD HEADER */}
            <div className="camera-card-header">
              <h3>{camera.name}</h3>

              <span className="camera-live-badge">
                LIVE
              </span>
            </div>

            {/* ZONE */}
            <p className="camera-zone">
              {camera.zone}
            </p>

            {/* VIDEO */}
            <div className="camera-video-container">
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                controls
                autoPlay
                muted
                loop
                playsInline
                src={camera.video}
              >
                Your browser does not support the video tag.
              </video>

              {/* RECORDING INDICATOR */}
              <span className="camera-rec-badge">
                REC
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CAMERA SYSTEM STATUS */}
      <div className="camera-status-box">
        <h2>Camera System Status</h2>

        <div className="camera-status-grid">
          {/* ACTIVE CAMERAS */}
          <div className="camera-status-item">
            <p>Active Cameras</p>

            <h4>4/4</h4>
          </div>

          {/* RECORDING STATUS */}
          <div className="camera-status-item">
            <p>Recording Status</p>

            <h4 className="camera-status-green">
              Active
            </h4>
          </div>

          {/* STORAGE */}
          <div className="camera-status-item">
            <p>Storage Used</p>

            <h4>42.3 GB</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CameraFeeds;