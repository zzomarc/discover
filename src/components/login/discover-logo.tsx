import Image from "next/image";
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
      <Image
        src="/logo/discover-lens.png"
        alt=""
        aria-hidden="true"
        width={62}
        height={65}
        priority
        className="absolute top-[-27px] left-full -translate-x-0.5 select-none"
      />
    </div>
  );
}
