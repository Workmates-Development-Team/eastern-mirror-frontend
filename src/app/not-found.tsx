import Loader from "@/components/Loader";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/");

  return (
    <div className="h-full justify-center mt-[10%] flex">
      <Loader />
    </div>
  );
}
