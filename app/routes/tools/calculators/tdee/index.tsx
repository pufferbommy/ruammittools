import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "@/lib/get-origin";
import ToolLayout from "@/components/ToolLayout";
import { TdeeCalculatorSection } from "./-components/TdeeCalculatorSection";
import { TdeeDisplaySection } from "./-components/TdeeDisplaySection";

export const Route = createFileRoute("/tools/calculators/tdee/")({
  component: RouteComponent,
  loader: async (context) => {
    const origin = await getOrigin();
    const pathname = context.location.pathname;
    const url = `${origin}${pathname}`;
    return { url };
  },
});

function RouteComponent() {
  const { url } = Route.useLoaderData();

  const [tdee, setTdee] = useState<number | null>(null);

  return (
    <ToolLayout
      breadcrumbs={[
        {
          label: "เครื่องคำนวณ",
          href: "/tools/calculators",
        },
        {
          label: "คำนวณพลังงานต่อวัน (TDEE)",
          href: "/tools/calculators/bmi",
        },
      ]}
      title="คำนวณพลังงานต่อวัน (TDEE)"
      description="กินเท่าไหร่ถึงจะพอดี? มาคำนวณพลังงานที่คุณใช้ในแต่ละวันกัน! 🔥🥦"
      url={url}
    >
      <TdeeCalculatorSection setTdee={setTdee} />
      <TdeeDisplaySection tdee={tdee} />
    </ToolLayout>
  );
}
