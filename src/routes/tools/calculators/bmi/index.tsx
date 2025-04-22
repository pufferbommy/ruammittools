import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getOrigin } from "~/lib/get-origin";
import { BmiTableSection } from "~/routes/tools/calculators/bmi/-components/BmiTableSection";
import { BmiDisplaySection } from "~/routes/tools/calculators/bmi/-components/BmiDisplaySection";
import { BmiCalculatorSection } from "~/routes/tools/calculators/bmi/-components/BmiCalculatorSection";
import { IntroSection } from "../../-components/IntroSection";

export const Route = createFileRoute("/tools/calculators/bmi/")({
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

  const [bmi, setBmi] = useState<number | null>(null);

  return (
    <>
      <IntroSection
        title="เครื่องคำนวณดัชนีมวลกาย (BMI)"
        description="กรอกส่วนสูงและน้ำหนักแล้วมาดูกันว่าได้ค่า BMI เท่าไหร่ และอยู่ในเกณฑ์ไหน พร้อมคำแนะนำสุขภาพง่ายๆ 💪"
        url={url}
      />
      <BmiCalculatorSection setBmi={setBmi} />
      <BmiDisplaySection bmi={bmi} />
      <BmiTableSection bmi={bmi} />
    </>
  );
}
