const Loader = ({width, height, borderWidth, color }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="
          animate-spin
          rounded-full
        "
        style={{ width: width, height: height, borderWidth: borderWidth, borderColor: color || '#CC0000', borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default Loader;