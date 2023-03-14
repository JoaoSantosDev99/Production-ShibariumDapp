import warning from "./assets/comingsoon.png";

const Swap = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl p-2 flex flex-col gap-2 justify-center items-center min-h-screen w-full bg-[#FFF4CE]">
        <div className="max-w-xl flex flex-col gap-2 font-bold border-[4px] bg-[#fff1c0] border-[#c29c66] p-10 text-4xl text-[#fff9e3] text-center rounded-xl w-full">
          <img src={warning} alt="dog" />
        </div>
        <div className="max-w-xl flex flex-col gap-2 font-bold bg-[#c29c66] p-10 text-4xl text-[#fff9e3] text-center rounded-xl w-full">
          <h2>Coming Soon!</h2>
        </div>
      </div>
    </section>
  );
};

export default Swap;
