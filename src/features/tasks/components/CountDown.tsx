import { Bell } from "@phosphor-icons/react";

function CountDown({ onStart }) {
  return (
    <div className="mx-auto py-6">
      <div className="flex h-56 w-56 flex-col items-center justify-center rounded-full bg-[#F5F5F5]">
        <div className="relative w-full text-center">
          <p className="text-4xl font-semibold">14:32</p>
          <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-full items-center justify-center gap-1 py-2 text-[#A1A1A1]">
            <Bell size={16} className="inline-block" />
            <span className="text-sm">8:35 AM</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-6">
        <button
          onClick={() => onStart(false)}
          className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full border border-black text-xs"
        >
          Cancel
        </button>
        <button className="flex h-[2.1875rem] w-[4.75rem] items-center justify-center rounded-full border border-black bg-black text-xs font-light text-white">
          Start now
        </button>
      </div>
    </div>
  );
}

export default CountDown;
