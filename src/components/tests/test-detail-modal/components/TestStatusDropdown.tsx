import { Button } from "@/components/ui/button";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VariantProps } from "class-variance-authority";
import { Test } from "@/types/tests"; // Import the Test type

// Define the specific status type for clarity
type TestStatus = Test["status"];

interface TestStatusDropdownProps {
  currentStatus: TestStatus;
  onStatusChange: (status: TestStatus) => void;
}

// Define a specific type for badge variants
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const statusOptions: { value: TestStatus; label: string; color: BadgeVariant }[] = [
  { value: "قيد التنفيذ", label: "قيد التنفيذ", color: "secondary" },
  { value: "مكتمل", label: "مكتمل", color: "default" },
  { value: "فشل", label: "فشل", color: "destructive" },
  { value: "معلق", label: "معلق", color: "outline" },
  // Assuming 'ملغي' is a possible status you might add later. 
  // If not, you can remove it. For now, we'll keep the type strict.
];

export default function TestStatusDropdown({
  currentStatus,
  onStatusChange,
}: TestStatusDropdownProps) {
  const currentOption =
    statusOptions.find((s) => s.value === currentStatus) || statusOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0">
          <Badge
            variant={currentOption.color}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {currentStatus}
            <Icons.chevronRight className="w-3 h-3 mr-1" />
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className="cursor-pointer"
          >
            <Badge variant={status.color} className="mr-2">
              {status.label}
            </Badge>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}