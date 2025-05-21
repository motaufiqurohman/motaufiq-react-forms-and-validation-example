import bgRegister from "../../../assets/bg-register.png";

export default function RegisterCard({ children, title }) {
  return (
    <div className="flex justify-center items-center h-full bg-amber-500 geometric-shapes-background">
      <div
        className="absolute w-full h-full"
        style={{
          background:
            "linear-gradient(270deg, rgba(0 0 0 / 30%), rgba(255 255 255 / 20%))",
        }}
      ></div>
      <div className="flex bg-white shadow-2xl sm:rounded-2xl w-full md:w-4xl lg:w-5xl xl:w-6xl h-full sm:h-11/12 z-20 overflow-hidden">
        <div className="relative w-1/2 hidden sm:flex justify-center items-center bg-amber-500 line-wave-background">
          <img src={bgRegister} alt="bg-register.png" className="w-9/12" />
          <div
            className="absolute w-full h-full"
            style={{
              background:
                "linear-gradient(25deg, rgb(0 0 0 / 30%), rgb(255 255 255 / 30%))",
            }}
          ></div>
        </div>
        <div className="w-full sm:w-1/2 relative">
          <div className="absolute w-full h-full py-6 flex flex-col">
            <h2 className="pl-9 text-2xl font-semibold text-gray-600 mb-2">
              {title}
            </h2>
            <div className="pl-9 pr-9 pt-6 pb-3 overflow-scroll">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
