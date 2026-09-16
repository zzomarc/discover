import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800"],
});

export function DiscoverLogo() {
  return (
    <div className="relative inline-flex">
      <span
        className={`${poppins.className} text-[33px] leading-none tracking-tight text-black`}
      >
        Discover
      </span>
      <span
        className="absolute top-[-26px] left-full -translate-x-1 rotate-[36deg]"
        aria-hidden="true"
      >
        <span className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full border-[3px] border-neutral-500 bg-white">
          <span className="-rotate-[36deg] text-[19px] leading-none">
            😍
          </span>
        </span>
        <span className="absolute top-[32px] left-[30px] h-[4px] w-[18px] origin-top-left rotate-45 rounded-full bg-neutral-500" />
      </span>
    </div>
  );
}
