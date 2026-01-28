import { Skeleton } from "@/components/ui/skeleton";

export const BookSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5">
                <Skeleton className="aspect-[3/4] w-full bg-surface" />
            </div>
            <div className="lg:col-span-7 space-y-6">
                <Skeleton className="h-4 w-24 bg-surface" />
                <Skeleton className="h-16 w-full bg-surface" />
                <Skeleton className="h-6 w-1/2 bg-surface" />
                <div className="py-12">
                    <Skeleton className="h-40 w-full bg-surface" />
                </div>
            </div>
        </div>
    );
}