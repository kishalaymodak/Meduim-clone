function Skeliton() {
  return (
    <div>
      <div role="status" className=" animate-pulse">
        <div className="border-b-2 pb-6 border-slate-200 w-screen cursor-pointer max-w-screen-md pt-4">
          <div className="flex gap-2 items-center ">
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>

            <div className=" "></div>
            <div className="mb-2">.</div>
            <div className=" text-slate-400">
              <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            </div>
          </div>
          <div className=" pt-2 ">
            <h1 className=" text-3xl font-bold  ">
              <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            </h1>
            <p className=" text-lg  pt-2">
              <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            </p>
          </div>

          <div className=" text-slate-400 text-sm pt-4">
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Skeliton;
