import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      hello from next
      <label>hii</label>
      <UserButton />
    </div>
  );
}
