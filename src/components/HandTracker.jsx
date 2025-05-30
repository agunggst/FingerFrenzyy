import { useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision"
import handModel from "../models/hand_landmarker.task"

const HandTracker = () => {
  const camRef = useRef(null)
  const canvasRef = useRef(null)
  // const [isHandDetected, setIsHandDetected] = useState(false)
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],      // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8],      // Index
    [0, 9], [9, 10], [10, 11], [11, 12], // Middle
    [0, 13], [13, 14], [14, 15], [15, 16], // Ring
    [0, 17], [17, 18], [18, 19], [19, 20]  // Pinky
  ]

  useEffect(() => {
    let detector
    let rafId

    const initDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      )
      detector = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: handModel },
        numHands: 1,
        runningMode: "video",
      })
      detect()
    }

    const drawPoints = (hands) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const video = camRef.current.video
    
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    
      hands.forEach((landmarks) => {
        ctx.strokeStyle = "lime"
        ctx.lineWidth = 2
    
        connections.forEach(([startIdx, endIdx]) => {
          const start = landmarks[startIdx]
          const end = landmarks[endIdx]
    
          ctx.beginPath()
          ctx.moveTo(start.x * canvas.width, start.y * canvas.height)
          ctx.lineTo(end.x * canvas.width, end.y * canvas.height)
          ctx.stroke()
        })
    
        ctx.fillStyle = "red"
        landmarks.forEach(({ x, y }) => {
          ctx.beginPath()
          ctx.arc(x * canvas.width, y * canvas.height, 5, 0, 2 * Math.PI)
          ctx.fill()
        })
      })
    }    

    const detect = () => {
      const video = camRef.current?.video
    
      if (!video || video.readyState !== 4) {
        rafId = requestAnimationFrame(detect)
        return
      }
    
      const results = detector.detectForVideo(video, performance.now())
      const hasHand = results.landmarks?.length > 0
    
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    
      if (hasHand) {
        drawPoints(results.landmarks)
      }
    
      // setIsHandDetected(results.handednesses.length > 0)
      rafId = requestAnimationFrame(detect)
    }    

    initDetector()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (detector) detector.close()
    }
  }, [])

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Webcam
          ref={camRef}
          mirrored
          style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", transform: "scaleX(-1)" }}
        />
      </div>
    </>
  )
}

export default HandTracker
