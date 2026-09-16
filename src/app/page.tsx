import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DiscoverLogo } from "@/components/login/discover-logo";
import { HomeIndicator } from "@/components/login/home-indicator";
import { IosStatusBar } from "@/components/login/ios-status-bar";
import { AppleIcon, GoogleIcon } from "@/components/login/social-icons";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 sm:py-8">
      <div className="flex min-h-screen w-full max-w-[430px] flex-col bg-white sm:min-h-[924px]">
        <IosStatusBar />

        <main className="flex flex-1 flex-col items-center px-9 pt-[119px]">
          <DiscoverLogo />

          <div className="mt-20 flex flex-col items-center gap-3 text-center">
            <h1 className="text-[19px] font-bold leading-none tracking-tight text-black">
              Create an account
            </h1>
            <p className="text-[14px] leading-none text-neutral-500">
              Enter your email to sign up for this app
            </p>
          </div>

          <div className="mt-2.5 flex w-full flex-col gap-[18px]">
            <Input
              type="email"
              placeholder="email@domain.com"
              className="h-[46px] w-full rounded-xl border-neutral-200 px-3.5 text-[14px] placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300"
            />

            <Button className="h-[46px] w-full rounded-xl bg-black text-[15px] font-medium text-white hover:bg-black/90">
              Continue
            </Button>
          </div>

          <div className="mt-6 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-[13px] text-neutral-400">or</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="mt-5 flex w-full flex-col gap-2">
            <Button
              variant="secondary"
              className="h-[46px] w-full rounded-xl bg-neutral-100 text-[14px] font-medium text-black hover:bg-neutral-200"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <Button
              variant="secondary"
              className="h-[46px] w-full rounded-xl bg-neutral-100 text-[14px] font-medium text-black hover:bg-neutral-200"
            >
              <AppleIcon />
              Continue with Apple
            </Button>
          </div>

          <p className="mt-5 max-w-[290px] text-center text-[13px] leading-relaxed text-neutral-400">
            By clicking continue, you agree to our
            <br />
            <a href="#" className="text-black underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-black underline">
              Privacy Policy
            </a>
          </p>
        </main>

        <HomeIndicator />
      </div>
    </div>
  );
}
