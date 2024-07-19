import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonMessage() {
  return (
    <div className="flex flex-col transition-all duration-500 ease-in-out max-w-[75%] gap-3 rounded-lg  m-3 bg-transparent">
      <Skeleton className="h-4 rounded-full w-[90%] bg-gradient-to-r from-sky-500 via-gray-300 to-gray-600" />
      <Skeleton className="h-4 rounded-full w-[79%] bg-gradient-to-r from-sky-500 via-gray-300 to-gray-600" />
      <Skeleton className="h-4 rounded-full w-[73%] bg-gradient-to-r from-sky-500 via-gray-300 to-gray-600" />
    </div>
  );
}
