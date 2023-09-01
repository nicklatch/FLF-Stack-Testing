import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { verifyUser } from "~/models/user.server";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix Testing" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const isLoggedInAndValid = await verifyUser(request);
  if (!isLoggedInAndValid) {
    throw Error("error");
  }

  throw redirect("/fusion");
};

export default function Index() {
  return (
    <main>
      <h1 className="route-page__headings">Welcome to FastLane Fusion</h1>
      <div className="mx-auto w-full text-center">
        <Link to="/login">Login</Link>
      </div>
    </main>
  );
}
