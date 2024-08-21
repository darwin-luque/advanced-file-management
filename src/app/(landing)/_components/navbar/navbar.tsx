import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, NotebookPen } from "lucide-react";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <header className="bg-background sticky top-0 flex h-16 items-center justify-between border-b px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-8 md:text-sm lg:gap-10">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <NotebookPen className="h-6 w-6" />
          <p className="text-sm font-bold lg:text-base">
            Advanced File Manager
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link
            href="/pricing"
            className={buttonVariants({ variant: "ghost" })}
          >
            Pricing
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "ghost" })}>
            About us
          </Link>
          <Link href="/help" className={buttonVariants({ variant: "ghost" })}>
            Help
          </Link>
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <NotebookPen className="h-6 w-6" />
              <p className="text-sm font-bold">Advanced File Manager</p>
            </div>
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "ghost" })}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={buttonVariants({ variant: "ghost" })}
            >
              About us
            </Link>
            <Link href="/help" className={buttonVariants({ variant: "ghost" })}>
              Help
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
          Sign in
        </Link>
        <Link href="/sign-up" className={buttonVariants()}>
          Sign up
        </Link>
        <Separator orientation="vertical" />
        <ModeToggle />
      </div>
    </header>
  );
};
