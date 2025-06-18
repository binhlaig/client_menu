"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Nav_items from "./Nav_items";



interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
        icon: React.ElementType;
    }[];
    showTooltip: boolean;
}



const SidebarNav = ({
    className,
    items,
    showTooltip,
    ...props
}: SideBarProps) => {
    return (
        <ScrollArea className="mt-8 h-[70vh]">
        <nav className={cn("flex flex-col space-y-6", className)} {...props}>
            {items.map((item) => (
                <Nav_items key={item.href} {...item} showTooltip={showTooltip} />
            ))}
        </nav>
    </ScrollArea>
    )
}

export default SidebarNav
