import { cn } from "~/lib/utils";

export function BmiAdviceAllSections() {
  return (
    <section className="space-y-8">
      <AdviceCard
        className="border-orange-500/50!"
        title="🥬 น้ำหนักน้อย / ผอม (BMI < 18.5)"
        description={[
          "ค่าดัชนีมวลกายของคุณอยู่ในช่วงที่ต่ำกว่ามาตรฐาน อาจบ่งบอกว่าคุณมีมวลกล้ามเนื้อหรือไขมันไม่เพียงพอ ซึ่งเสี่ยงต่อภาวะขาดสารอาหาร ภูมิคุ้มกันต่ำ และกระดูกพรุนในระยะยาว",
        ]}
        recommendations={[
          "เพิ่มปริมาณการรับประทานอาหารให้ครบ 5 หมู่",
          "เลือกอาหารที่มีพลังงานและโปรตีนสูง เช่น ถั่ว ไข่ เนื้อสัตว์ไม่ติดมัน",
          "หลีกเลี่ยงการอดอาหารหรือควบคุมอาหารมากเกินไป",
          "ปรึกษานักโภชนาการหากน้ำหนักไม่เพิ่มแม้พยายามแล้ว",
        ]}
      />
      <AdviceCard
        className="border-green-500/50!"
        title="💪 น้ำหนักปกติ (BMI 18.5 - 22.9)"
        description={[
          "ยินดีด้วย! ค่าดัชนีมวลกายของคุณอยู่ในเกณฑ์ดีต่อสุขภาพ แสดงว่าคุณรักษาสมดุลของร่างกายได้ดี",
        ]}
        recommendations={[
          "รักษาน้ำหนักให้อยู่ในช่วงนี้ต่อไป",
          "ออกกำลังกายสม่ำเสมออย่างน้อยสัปดาห์ละ 3–5 วัน",
          "รับประทานอาหารที่มีประโยชน์ และพักผ่อนให้เพียงพอ",
        ]}
      />
      <AdviceCard
        className="border-warning/50!"
        title="🍔 น้ำหนักเกิน (BMI 23.0 - 24.9)"
        description={[
          "คุณเริ่มอยู่ในช่วงที่น้ำหนักมากกว่าที่เหมาะสม แม้อาจยังไม่ส่งผลชัดเจน แต่ก็เป็นจุดเริ่มต้นของความเสี่ยงสุขภาพในอนาคต",
        ]}
        recommendations={[
          "ควบคุมอาหาร โดยลดอาหารมัน หวาน และแป้งขัดสี",
          "เริ่มออกกำลังกายอย่างน้อย 30 นาทีต่อวัน",
          "หมั่นชั่งน้ำหนักเพื่อติดตามความเปลี่ยนแปลง",
        ]}
      />
      <AdviceCard
        className="border-orange-500/50!"
        title="⚠️ อ้วน (BMI 25.0 - 29.9)"
        description={[
          "ค่าดัชนีมวลกายของคุณสูงเกินกว่าที่เหมาะสม และเสี่ยงต่อโรคเรื้อรัง เช่น เบาหวาน ความดันโลหิตสูง ไขมันในเลือดผิดปกติ และหัวใจ",
        ]}
        recommendations={[
          "ลดพลังงานจากอาหาร โดยเฉพาะไขมัน และน้ำตาล",
          "เพิ่มกิจกรรมทางกาย เช่น เดิน วิ่ง ว่ายน้ำ",
          "ปรึกษาแพทย์หรือนักโภชนาการเพื่อวางแผนลดน้ำหนัก",
        ]}
      />
      <AdviceCard
        className="border-error/50!"
        title="🚨 อ้วนมาก (BMI ≥ 30)"
        description={[
          "ค่าดัชนีมวลกายของคุณอยู่ในระดับที่สูงมาก เสี่ยงต่อโรคร้ายแรง เช่น หัวใจขาดเลือด เบาหวานชนิดที่ 2 และโรคข้อเข่าเสื่อม",
        ]}
        recommendations={[
          "วางแผนลดน้ำหนักอย่างจริงจัง ร่วมกับทีมแพทย์",
          "ปรับเปลี่ยนพฤติกรรมการกินอย่างถาวร",
          "เริ่มออกกำลังกายแบบค่อยเป็นค่อยไป",
          "ตรวจสุขภาพประจำปีเพื่อประเมินความเสี่ยง",
        ]}
      />
    </section>
  );
}

type AdviceCardProps = {
  title: string;
  description: string[];
  recommendations: string[];
  className?: string;
};

function AdviceCard({
  title,
  description,
  recommendations,
  className,
}: AdviceCardProps) {
  return (
    <div className={cn("card card-border", className)}>
      <div className="card-body gap-4">
        <h2 className="text-2xl card-title">{title}</h2>
        {description.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <div>
          <h3 className="font-semibold">คำแนะนำ:</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
