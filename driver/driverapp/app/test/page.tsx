import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
export default async function Testre() {
  const session = await getServerSession(NEXT_AUTH);
  console.log(session);
}
