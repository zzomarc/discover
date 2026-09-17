import type { ReactNode } from "react";
import { HomeIndicator } from "@/components/chrome/home-indicator";
import { IosStatusBar } from "@/components/chrome/ios-status-bar";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 sm:py-8">
      <div className="flex min-h-screen w-full max-w-[430px] flex-col bg-white sm:min-h-[924px]">
        <IosStatusBar />
        {children}
        <HomeIndicator />
      </div>
    </div>
  );
}
