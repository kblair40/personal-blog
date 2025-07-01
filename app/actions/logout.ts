// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

import { deleteSession } from "@/lib/session";

export async function logout() {
  try {
    await deleteSession();
    //   redirect("/login");
    return true;
  } catch (e) {
    console.log("\nFailed to delete session:", e, "\n");
    return false;
  }
}
