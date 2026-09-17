import { PhoneFrame } from "@/components/chrome/phone-frame";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FilterPills } from "@/components/dashboard/filter-pills";
import { TripCard } from "@/components/dashboard/trip-card";

export default function DashboardPage() {
  return (
    <PhoneFrame>
      <DashboardHeader />
      <FilterPills />

      <div className="flex-1 overflow-hidden px-5">
        <div className="flex flex-col gap-[27px]">
          <TripCard
            title="Camper trip"
            tags={["#where", "#when", "#who"]}
            participants="0/2"
          />
          <TripCard title="Camper trip" tags={["#where", "#where", "#where"]} />
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  );
}
