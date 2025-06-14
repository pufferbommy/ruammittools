import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TOOL_CATEGORY_LIST } from "@/constants/tool-categories";
import { cn } from "@/lib/utils";
import Logo from "./icons/logo";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const location = useLocation();
	const showBorder = location.pathname === "/";

	const filteredCategories = TOOL_CATEGORY_LIST.filter(([, category]) =>
		category.tools.some((tool) =>
			tool.title.toLowerCase().includes(search.toLowerCase()),
		),
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!searchRef.current?.contains(event.target as Node)) {
				setIsFocused(false);
			}
		};

		if (isFocused) document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isFocused]);

	return (
		<header
			className={cn(
				"bg-background sticky top-0 z-50",
				showBorder && "border-b",
			)}
		>
			<div className="container py-4 flex items-center gap-2">
				<div className="flex flex-1 gap-2 items-center">
					<Link to="/" className="inline-flex gap-2 items-center">
						<Logo />
						<span className="font-bold">รวมมิตรเครื่องมือ</span>
					</Link>
					<div ref={searchRef} className="relative flex-1">
						<Input
							placeholder="ค้นหาเครื่องมือ..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onFocus={() => setIsFocused(true)}
							className={cn(
								"peer transition-[padding,width,opacity] pl-[calc(12px+10px)] placeholder:opacity-0 placeholder:transition-opacity",
								isFocused || search
									? "w-full pl-[calc(12px+10px+12px)]	placeholder:opacity-100"
									: "w-9",
							)}
						/>
						<div
							className={cn(
								"absolute scale-0 opacity-0 origin-top-left transition-[scale,opacity] rounded-md p-4 top-[calc(100%+0.5rem)] h-80 overflow-y-auto left-0 w-full bg-background border",
								isFocused && "opacity-100 scale-100",
							)}
						>
							{filteredCategories.length > 0 ? (
								filteredCategories.map(([pathname, category]) => (
									<div key={pathname} className="flex flex-col">
										<Button
											asChild
											variant="ghost"
											className="font-bold justify-start"
											onClick={() => {
												setIsFocused(false);
												setSearch("");
											}}
										>
											<Link key={pathname} to={pathname}>
												{category.title}
											</Link>
										</Button>
										{category.tools
											.filter((tool) =>
												tool.title.toLowerCase().includes(search.toLowerCase()),
											)
											.map((tool) => (
												<Button
													variant="ghost"
													key={tool.url}
													className="justify-start"
													onClick={() => {
														setIsFocused(false);
														setSearch("");
													}}
													asChild
												>
													<Link to={tool.url}>{tool.title}</Link>
												</Button>
											))}
									</div>
								))
							) : (
								<p className="text-sm text-muted-foreground text-center">
									ไม่พบเครื่องมือที่ตรงกับคำค้นหา 🕵️‍♀️
								</p>
							)}
						</div>
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-2.5 flex items-center justify-center peer-disabled:opacity-50">
							<Search size={16} aria-hidden="true" />
						</div>
						<button
							type="button"
							onClick={() => setSearch("")}
							className={cn(
								"text-muted-foreground/80 pointer-events-none peer-focus:pointer-events-auto peer-focus:opacity-100 opacity-0 peer-placeholder-shown:hidden absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50",
								search && "opacity-100 pointer-events-auto",
							)}
						>
							<X size={16} aria-hidden="true" />
						</button>
					</div>
				</div>
				<div className="flex gap-2 flex-1 justify-end">
					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList>
							{TOOL_CATEGORY_LIST.map(([pathname, category]) => (
								<NavigationMenuItem key={pathname} value={pathname}>
									<NavigationMenuTrigger
										onClick={() => {
											navigate({
												to: pathname,
											});
										}}
									>
										{category.title}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
											{category.tools.map((tool) => (
												<li key={tool.url}>
													<NavigationMenuLink asChild>
														<Link
															to={tool.url}
															className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm font-medium"
														>
															{tool.title}
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button
								aria-label="Open menu"
								className="lg:hidden"
								variant="ghost"
								size="icon"
							>
								<Menu />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="px-4">
							{TOOL_CATEGORY_LIST.map(([pathname, category]) => (
								<div key={pathname} className="flex flex-col">
									<Button
										asChild
										onClick={() => setIsDrawerOpen(false)}
										variant="ghost"
										className="font-bold justify-start"
									>
										<Link key={pathname} to={pathname}>
											{category.title}
										</Link>
									</Button>
									{category.tools.map((tool) => (
										<Button
											onClick={() => setIsDrawerOpen(false)}
											variant="ghost"
											key={tool.url}
											className="justify-start"
											asChild
										>
											<Link to={tool.url}>{tool.title}</Link>
										</Button>
									))}
								</div>
							))}
						</DrawerContent>
					</Drawer>
					<ThemeSwitcher />
				</div>
			</div>
		</header>
	);
}
