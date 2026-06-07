// import { useRef, useState, useEffect } from "react";

// export default function Upload({ setFile }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [preview, setPreview] = useState(null);
//   const [cameraOn, setCameraOn] = useState(false);
//   const [stream, setStream] = useState(null);

//   // Handle file upload + convert to Base64
//   const handleUpload = (file) => {
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const base64String = reader.result
//         .replace("data:", "")
//         .replace(/^.+,/, "");

//       setFile(base64String);
//       setPreview(URL.createObjectURL(file));
//     };

//     reader.readAsDataURL(file);
//   };

//   // Drag & Drop
//   const handleDrop = (e) => {
//     e.preventDefault();

//     const file = e.dataTransfer.files[0];
//     handleUpload(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Start Camera
//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }

//       setStream(mediaStream);
//       setCameraOn(true);
//     } catch (err) {
//       console.error("Camera error:", err);
//     }
//   };

//   // Stop Camera
//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }

//     setCameraOn(false);
//     setStream(null);
//   };

//   // Capture Image
//   const captureImage = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     canvas.toBlob((blob) => {
//       const file = new File([blob], "capture.png", {
//         type: "image/png",
//       });

//       handleUpload(file);
//       stopCamera();
//     });
//   };

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       stopCamera();

//       if (preview) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   return (
//     <div
//       style={{
//         padding: "40px",
//         maxWidth: "700px",
//         margin: "auto",
//         color: "white",
//       }}
//     >
//       <div
//         style={{
//           background: "#111c33",
//           padding: "30px",
//           borderRadius: "20px",
//           boxShadow: "0 0 40px rgba(108,99,255,0.3)",
//         }}
//       >
//         <h2 style={{ marginBottom: "20px" }}>
//           Upload or Capture Image
//         </h2>

//         {/* Upload Box */}
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           style={{
//             background: "#0b1324",
//             padding: "30px",
//             borderRadius: "16px",
//             textAlign: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <p
//             style={{
//               marginBottom: "20px",
//               fontSize: "18px",
//             }}
//           >
//             Upload your food image
//           </p>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleUpload(e.target.files[0])}
//             style={{
//               background: "#1b2945",
//               padding: "12px",
//               borderRadius: "10px",
//               width: "100%",
//               color: "white",
//             }}
//           />
//         </div>

//         {/* Camera Buttons */}
//         <div style={{ marginBottom: "20px" }}>
//           {!cameraOn ? (
//             <button
//               onClick={startCamera}
//               style={{
//                 padding: "14px 24px",
//                 border: "none",
//                 borderRadius: "12px",
//                 background: "#7b61ff",
//                 color: "white",
//                 fontSize: "16px",
//                 cursor: "pointer",
//               }}
//             >
//               Open Camera
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={captureImage}
//                 style={{
//                   padding: "14px 24px",
//                   border: "none",
//                   borderRadius: "12px",
//                   background: "#7b61ff",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Capture
//               </button>

//               <button
//                 onClick={stopCamera}
//                 style={{
//                   padding: "14px 24px",
//                   border: "none",
//                   borderRadius: "12px",
//                   background: "#ff4d4d",
//                   color: "white",
//                   cursor: "pointer",
//                 }}
//               >
//                 Stop Camera
//               </button>
//             </>
//           )}
//         </div>

//         {/* Video Preview */}
//         {cameraOn && (
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             style={{
//               width: "100%",
//               borderRadius: "16px",
//               marginBottom: "20px",
//             }}
//           />
//         )}

//         {/* Hidden Canvas */}
//         <canvas ref={canvasRef} style={{ display: "none" }} />

//         {/* Image Preview */}
//         {preview && (
//           <div>
//             <h3 style={{ marginBottom: "15px" }}>
//               Preview
//             </h3>

//             <img
//               src={preview}
//               alt="preview"
//               style={{
//                 width: "100%",
//                 borderRadius: "16px",
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useRef, useState, useEffect } from "react";

export default function Upload({ setFile }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  // =========================
  // HANDLE FILE UPLOAD
  // =========================
  const handleUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      // FULL BASE64 STRING
      const base64Image = reader.result;

      // send to backend
      setFile(base64Image);

      // preview
      setPreview(base64Image);
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // DRAG DROP
  // =========================
  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // =========================
  // START CAMERA
  // =========================
  const startCamera = async () => {
    try {
      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);

      setCameraOn(true);

    } catch (err) {
      console.error("Camera Error:", err);
    }
  };

  // =========================
  // STOP CAMERA
  // =========================
  const stopCamera = () => {
    if (stream) {
      stream
        .getTracks()
        .forEach((track) => track.stop());
    }

    setCameraOn(false);

    setStream(null);
  };

  // =========================
  // CAPTURE IMAGE
  // =========================
  const captureImage = () => {
    const video = videoRef.current;

    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    // convert to base64
    const imageData = canvas.toDataURL("image/png");

    // send to backend
    setFile(imageData);

    // preview
    setPreview(imageData);

    stopCamera();
  };

  // =========================
  // CLEANUP
  // =========================
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "auto",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#111c33",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 40px rgba(108,99,255,0.3)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Upload or Capture Image
        </h2>

        {/* UPLOAD BOX */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            background: "#0b1324",
            padding: "30px",
            borderRadius: "16px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "18px",
            }}
          >
            Upload your food image
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleUpload(e.target.files[0])
            }
            style={{
              background: "#1b2945",
              padding: "12px",
              borderRadius: "10px",
              width: "100%",
              color: "white",
            }}
          />
        </div>

        {/* CAMERA BUTTONS */}
        <div style={{ marginBottom: "20px" }}>
          {!cameraOn ? (
            <button
              onClick={startCamera}
              style={{
                padding: "14px 24px",
                border: "none",
                borderRadius: "12px",
                background: "#7b61ff",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Open Camera
            </button>
          ) : (
            <>
              <button
                onClick={captureImage}
                style={{
                  padding: "14px 24px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#7b61ff",
                  color: "white",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Capture
              </button>

              <button
                onClick={stopCamera}
                style={{
                  padding: "14px 24px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#ff4d4d",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Stop Camera
              </button>
            </>
          )}
        </div>

        {/* VIDEO */}
        {cameraOn && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              borderRadius: "16px",
              marginBottom: "20px",
            }}
          />
        )}

        {/* HIDDEN CANVAS */}
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
        />

        {/* PREVIEW */}
        {preview && (
          <div>
            <h3 style={{ marginBottom: "15px" }}>
              Preview
            </h3>

            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "16px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}