"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createElement } from "react";

interface NavItemProps {
    href: string;
    title: string;
    icon: React.ElementType;
    showTooltip: boolean;
}

const Nav_items = ({ href, title, icon, showTooltip }: NavItemProps) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            key={href}
            className={cn(
                pathname === href
                    ? " text-blue-700  "
                    : "hover:bg-transparent hover:underline",
                "flex items-center justify-start gap-2"
            )}
        >
            {showTooltip ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                {createElement(icon, {
                                    size: 20,
                                })}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <>
                    <span>
                        {createElement(icon, {
                            size: 20,
                        })}
                    </span>
                    <p className="text-sm font-semibold">{title}</p>
                </>
            )}
        </Link>
    )
}

export default Nav_items
