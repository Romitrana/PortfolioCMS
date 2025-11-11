import { motion, useScroll } from "motion/react";
export default function Scroll() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          originX: 0,
          zIndex: 15,
          backgroundColor: "#ff0088",
        }}
      />
    </>
  );
}
