const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 relative">
        <div className="absolute w-full h-full border-l-4 border-emerald-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
