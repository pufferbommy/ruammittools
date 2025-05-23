import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ToolLayout from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { GENDERS } from "@/constants/genders";
import { loadToolData } from "@/lib/tool/loadToolData";
import { seo } from "@/utils/seo";

export const Route = createFileRoute("/tools/calculate/tdee")({
	component: RouteComponent,
	loader: ({ location }) => loadToolData(location.pathname),
	head: ({ loaderData }) => ({
		meta: [
			...seo({
				title: loaderData.tool.title,
				description: loaderData.tool.description,
				keywords: loaderData.tool.keywords,
				image: `${loaderData.url}.png`.replace("/tools", "/og/tools"),
			}),
		],
		links: [
			{
				rel: "canonical",
				href: loaderData.url,
			},
		],
	}),
});

function RouteComponent() {
	const { url, category, tool } = Route.useLoaderData();
	const [tdee, setTdee] = useState<number | null>(null);

	return (
		<ToolLayout
			breadcrumbs={[
				{
					label: category.title,
					href: "..",
				},
				{
					label: tool.title,
					href: tool.url,
				},
			]}
			title={tool.title}
			description={tool.description}
			url={url}
			items={[
				{
					id: "1",
					title: "วิธีการใช้งาน",
					content: (
						<ol className="list-decimal list-inside space-y-2">
							<li>เลือกเพศของคุณ (ชาย หรือ หญิง)</li>
							<li>กรอกอายุ น้ำหนัก และส่วนสูงของคุณ</li>
							<li>เลือกระดับกิจกรรมที่คุณทำในแต่ละวัน (เบา, ปานกลาง, หนัก ฯลฯ)</li>
							<li>คลิกปุ่ม "คำนวณ" เพื่อดูผลลัพธ์ค่า TDEE ของคุณ</li>
							<li>อยากเริ่มใหม่? คลิก "รีเซ็ต" แล้วลองคำนวณอีกครั้งได้เลย!</li>
						</ol>
					),
				},
			]}
		>
			<TdeeCalculatorSection setTdee={setTdee} />
			<Card className="text-center">
				<CardHeader>
					<CardTitle>ค่าพลังงานที่ร่างกายคุณต้องการต่อวัน (TDEE)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p className="space-x-2">
						<span className="text-8xl text-primary font-semibold">
							{tdee?.toFixed(1) || "?"}
						</span>
						{tdee && <span>แคลอรี่</span>}
					</p>
				</CardContent>
			</Card>
		</ToolLayout>
	);
}

const ACTIVITY_LEVELS = [
	{ value: 1.2, label: "🏢 ไม่ออกกำลังกายเลย (นั่งทำงานทั้งวัน)" },
	{ value: 1.375, label: "🚶‍♂️ ออกกำลังกายเบาๆ (1–2 วัน/สัปดาห์)" },
	{ value: 1.55, label: "🏃‍♂️ ออกกำลังกายปานกลาง (3–5 วัน/สัปดาห์)" },
	{ value: 1.725, label: "💪 ออกกำลังกายหนัก (6–7 วัน/สัปดาห์)" },
	{ value: 1.9, label: "🔥 ออกกำลังกายหนักมาก (เช้า–เย็น หรืองานใช้แรงเยอะ)" },
];

export function TdeeCalculatorSection({
	setTdee,
}: {
	setTdee: (value: number | null) => void;
}) {
	const form = useForm({
		defaultValues: {
			gender: "male",
			age: "" as unknown as number,
			weight: "" as unknown as number,
			height: "" as unknown as number,
			activity: 1.2,
		},
		onSubmit: ({ value }) => {
			const heightMeters = value.height / 100; // Convert cm to m
			const bmr =
				value.gender === "male"
					? 10 * value.weight + 6.25 * heightMeters - 5 * value.age + 5
					: 10 * value.weight + 6.25 * heightMeters - 5 * value.age - 161;
			const tdee = bmr * value.activity;
			return setTdee(tdee);
		},
	});

	const handleResetClick = () => {
		form.reset();
		setTdee(null);
	};

	return (
		<section>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-4"
			>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
					<form.Field name="age">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>อายุ</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
							</div>
						)}
					</form.Field>
					<form.Field name="weight">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>น้ำหนัก (กิโลกรัม)</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
							</div>
						)}
					</form.Field>
					<form.Field name="height">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ส่วนสูง (เซนติเมตร)</Label>
								<Input
									type="number"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
							</div>
						)}
					</form.Field>
					<form.Field name="gender">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>เพศ</Label>
								<RadioGroup
									onValueChange={field.handleChange}
									defaultValue={field.state.value}
									className="flex gap-4"
								>
									{GENDERS.map(({ value, name }) => (
										<div key={value} className="flex items-center gap-2">
											<RadioGroupItem value={value} id={value} />
											<Label htmlFor={value}>{name}</Label>
										</div>
									))}
								</RadioGroup>
							</div>
						)}
					</form.Field>
					<form.Field name="activity">
						{(field) => (
							<div className="flex flex-col gap-2">
								<Label>ระดับกิจกรรม</Label>
								<Select
									defaultValue={field.state.value.toString()}
									onValueChange={(value) =>
										field.handleChange(Number.parseInt(value))
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="เลือกระดับกิจกรรม" />
									</SelectTrigger>
									<SelectContent>
										{ACTIVITY_LEVELS.map((level) => (
											<SelectItem
												key={level.value}
												value={level.value.toString()}
											>
												{level.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					</form.Field>
				</div>
				<div className="space-x-2">
					<Button>คำนวณ TDEE</Button>
					<Button type="button" onClick={handleResetClick} variant="outline">
						รีเซ็ต
					</Button>
				</div>
			</form>
		</section>
	);
}
