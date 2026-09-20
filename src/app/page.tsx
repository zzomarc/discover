import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/chrome/phone-frame";
import { SignUpForm } from "@/components/auth/signup-form";
import { DiscoverLogo } from "@/components/login/discover-logo";
import { AppleIcon, GoogleIcon } from "@/components/login/social-icons";

export default function Home() {
  return (
    <PhoneFrame>
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

        <SignUpForm />

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

        <p className="mt-4 text-center text-[13px] text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-black underline">
            Log in
          </Link>
        </p>
      </main>
    </PhoneFrame>
  );
}
