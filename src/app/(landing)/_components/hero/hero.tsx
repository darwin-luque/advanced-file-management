import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { FC } from "react";

export const LandingHero: FC = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
      >
        <div className="from-background/50 to-background h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r blur-3xl" />
        <div className="from-primary-foreground via-primary-foreground to-background h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 rounded-full bg-gradient-to-tl blur-3xl" />
      </div>
      <div className="z-1 relative">
        <div className="container py-10 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p>Elevate your docs</p>
            <div className="mt-5 max-w-2xl">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Advanced File Manager
              </h1>
            </div>
            <div className="mt-5 max-w-3xl">
              <p className="text-muted-foreground text-xl">
                A simple and secure way to manage your files. With our advanced
                workspace system, you can easily organize and share your files
                with anyone.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <Link className={buttonVariants({ size: "lg" })} href="/sign-up">
                Get started
              </Link>
              <Link
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href="/about"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
