export default function FloatImage({ src, t, b, l, r, anim,z,w,h}) {
  const style = {
    position: "absolute",
    top: t,
    bottom: b,
    left: l,
    right: r,
    animation: `${anim} 1.1s infinite backwards ease-out alternate-reverse`,
    zIndex: z,
    width: w || "3rem",
    height: h || "4rem"
  };

  return (
    <img
      src={`/assets/${src}`}
      alt={src.split(".")[0]}
      className="techIcon"
      style={style}
    />
  );
}
