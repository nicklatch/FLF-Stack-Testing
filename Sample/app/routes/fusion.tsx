import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import Header from "~/components/ui/Header";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { verifyUser } from "~/models/user.server";
import SideNav from "~/components/ui/SideNav";
import { useEffect } from "react";
import { cn } from "~/lib/utils";
import { atom, useAtom } from "jotai";

export const overview = atom(false);

export const loader = async ({ request }: LoaderArgs) => {
  const user = await verifyUser(request);

  if (!user) {
    throw redirect("/login");
  }
  return json({ username: user.username });
};

export default function FusionLayoutRoute() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation().pathname;
  const [isOverview, setIsOverview] = useAtom(overview);

  useEffect(() => {
    setIsOverview(location.includes("overview"));
  }, [location, setIsOverview]);

  /**
   * *: removes border radius on top-left corner when 'overview' is selected
   * */
  const radiusTweak = isOverview ? "rounded-tl-none" : "";

  return (
    <>
      <Header username={data.username} />
      <div className="flex flex-col px-4 pb-6 sm:flex-row">
        <SideNav displayProp="hidden sm:flex" />
        <main
          className={cn(
            "radius-[var(--radius)] h-full w-full rounded-md border p-4",
            radiusTweak,
          )}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
