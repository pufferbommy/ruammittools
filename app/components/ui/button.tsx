import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 active:scale-95 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-none [--tw-shadow-color:oklch(from_var(--primary)_calc(l_-_0.125)_c_h)] shadow-[0_-0.125rem_0_inset]",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background hover:bg-accent hover:shadow-none hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 [--tw-shadow-color:oklch(from_var(--border)_l_c_h/0.5)] shadow-[0_-0.125rem_0_inset]",
				outlinePrimary:
					"border border-primary bg-primary/5 text-primary hover:bg-primary/10 hover:shadow-none shadow-[0_-0.125rem_0_inset] [--tw-shadow-color:oklch(from_var(--primary)_l_c_h/0.25)]",
				secondary:
					"border border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-none [--tw-shadow-color:oklch(from_var(--secondary)_calc(l_-_0.0625)_c_h)] shadow-[0_-0.125rem_0_inset]",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				xs: "h-7 px-2 text-xs",
				sm: "h-8 px-3 has-[>svg]:px-2.5",
				lg: "h-10 px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
