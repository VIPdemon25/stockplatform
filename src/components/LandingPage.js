import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const candlesticks = [];
    const candlestickCount = 30; // Increased number of candlesticks for better visuals

    for (let i = 0; i < candlestickCount; i++) {
      candlesticks.push({
        x: (i / candlestickCount) * canvas.width,
        open: Math.random() * canvas.height,
        close: Math.random() * canvas.height,
        high: Math.max(candlesticks[i]?.open || 0, candlesticks[i]?.close || 0) + Math.random() * 50, // Increased randomness
        low:
          Math.min(candlesticks[i]?.open || canvas.height, candlesticks[i]?.close || canvas.height) -
          Math.random() * 20, // Increased randomness
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 2 + 1, // Add speed for smoother animation
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(64, 64, 64, 0.4)"); // Subtle gray gradient
      gradient.addColorStop(1, "rgba(32, 32, 32, 0.2)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      candlesticks.forEach((candlestick, index) => {
        const width = canvas.width / candlestickCount;

        ctx.strokeStyle = "rgba(169, 169, 169, 0.8)"; // Subtle gray wick color
        ctx.lineWidth = 2; // Thicker wick

        // Draw the wick
        ctx.beginPath();
        ctx.moveTo(candlestick.x + width / 2, candlestick.low);
        ctx.lineTo(candlestick.x + width / 2, candlestick.high);
        ctx.stroke();

        // Draw the body
        ctx.fillStyle =
          candlestick.open > candlestick.close ? "rgba(255, 99, 132, 0.8)" : "rgba(75, 192, 192, 0.8)"; // Keep candlestick colors
        ctx.fillRect(
          candlestick.x,
          Math.min(candlestick.open, candlestick.close),
          width,
          Math.abs(candlestick.open - candlestick.close),
        );

        // Animate the candlesticks
        candlestick.open += candlestick.direction * candlestick.speed;
        candlestick.close += candlestick.direction * candlestick.speed;

        // Reverse direction if the candlestick reaches the top or bottom
        if (candlestick.open > canvas.height * 0.9 || candlestick.open < canvas.height * 0.1) {
          candlestick.direction *= -1;
        }

        candlestick.high = Math.max(candlestick.open, candlestick.close) + Math.random() * 30; // Increased randomness
        candlestick.low = Math.min(candlestick.open, candlestick.close) - Math.random() * 30; // Increased randomness

        // Ensure high and low stay within canvas bounds
        candlestick.high = Math.min(candlestick.high, canvas.height);
        candlestick.low = Math.max(candlestick.low, 0);
      });
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="landing-page vh-100 d-flex justify-content-center align-items-center">
      <canvas ref={canvasRef} className="background-animation"></canvas>
      <div className="content text-center">
        <h1 className="display-1 mb-4 text-primary font-weight-bold animate__animated animate__fadeIn">Elevate</h1>
        <p className="lead text-light mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Your gateway to smarter investing
        </p>
      </div>
      <div className="position-absolute top-0 end-0 m-4">
        <Link to="/login" className="btn btn-outline-primary me-3 animate__animated animate__fadeIn">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary animate__animated animate__fadeIn">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;