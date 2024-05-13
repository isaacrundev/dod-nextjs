/**
 * v0 by Vercel.
 * @see https://v0.dev/t/L4M6ZwQhtw2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { JSX, SVGProps } from "react";

export default function HomePage() {
  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] py-12 text-white md:py-24 lg:py-32">
        <div className="container space-y-6 px-4 md:space-y-10 md:px-6">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                Unlock Your Fitness Potential with Diet Tracking
              </h1>
              <p className="max-w-[600px] text-lg md:text-xl">
                Discover the power of diet tracking and transform your health.
                Our intuitive tools make it easy to monitor your nutrition and
                reach your fitness goals.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* <Button className="bg-white text-[#1E40AF] hover:bg-gray-100">
                  Get Started
                </Button> */}
                <Button className="bg-white text-[#1E40AF] hover:bg-gray-100">
                  Learn More
                </Button>
              </div>
            </div>
            {/* <Image
              alt="Hero Image"
              className="object-cover mx-auto rounded-xl"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            /> */}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-6 px-4 md:space-y-10 md:px-6">
          <div className="space-y-4 text-center md:space-y-6">
            <div className="inline-block rounded-full bg-[#1E40AF]/20 px-4 py-1 text-[#1E40AF]">
              Why Track Your Diet?
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Unlock the Benefits of Diet Tracking
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Discover how diet tracking can transform your health and fitness
              journey.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="space-y-4">
              <ClipboardIcon className="h-12 w-12 text-[#1E40AF]" />
              <h3 className="text-xl font-bold">Understand Your Nutrition</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Gain insights into your daily calorie intake, macronutrient
                balance, and nutrient deficiencies.
              </p>
            </div>
            <div className="space-y-4">
              <HeartPulseIcon className="h-12 w-12 text-[#1E40AF]" />
              <h3 className="text-xl font-bold">Improve Your Health</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Make informed decisions to optimize your diet and support your
                overall well-being.
              </p>
            </div>
            <div className="space-y-4">
              <DumbbellIcon className="h-12 w-12 text-[#1E40AF]" />
              <h3 className="text-xl font-bold">Achieve Your Fitness Goals</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Align your diet with your workout routine to reach your desired
                body composition and performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
        <div className="container space-y-6 px-4 md:space-y-10 md:px-6">
          <div className="space-y-4 text-center md:space-y-6">
            <div className="inline-block rounded-full bg-[#1E40AF]/20 px-4 py-1 text-[#1E40AF]">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple Steps to Track Your Diet
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Our intuitive diet tracking tools make it easy to monitor your
              nutrition and reach your fitness goals.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="space-y-4">
              <PlusIcon className="h-12 w-12 text-[#1E40AF]" />
              <h3 className="text-xl font-bold">Log Your Meals</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Easily log your daily meals and snacks using our comprehensive
                food database.
              </p>
            </div>
            <div className="space-y-4">
              <BarChartIcon className="h-12 w-12 text-[#1E40AF]" />
              <h3 className="text-xl font-bold">Track Your Progress</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Monitor your calorie intake, macronutrient balance, and nutrient
                levels over time.
              </p>
            </div>
            <div className="space-y-4">
              <SettingsIcon className="h-12 w-12 text-[#1E40AF]" />
              <h3 className="text-xl font-bold">Optimize Your Diet</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Receive personalized recommendations to improve your diet and
                achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-6 px-4 md:space-y-10 md:px-6">
          <div className="space-y-4 text-center md:space-y-6">
            <div className="inline-block rounded-full bg-[#1E40AF]/20 px-4 py-1 text-[#1E40AF]">
              Get Started
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Start Your Fitness Journey Today
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Sign up now and take the first step towards a healthier, more
              balanced lifestyle.
            </p>
          </div>
          <div className="flex justify-center">
            <form className="w-full max-w-md space-y-4">
              <Input
                className="w-full"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="w-full bg-[#1E40AF] hover:bg-[#2563EB]"
                variant="destructive"
              >
                Get Started
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function BarChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function ClipboardIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function DumbbellIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  );
}

function HeartPulseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
