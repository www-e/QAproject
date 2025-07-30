"use client"

import { motion } from "framer-motion"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatefulButton } from "@/components/ui/stateful-button"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Icons } from "@/components/ui/icons"
import { Test } from "@/types/tests"
import { statusColors, priorityColors } from "@/constants/tests"

interface TestRowProps {
  test: Test
  index: number
  isRunningTest: string | null
  onRunTest: (testId: string) => void
}

export default function TestRow({ test, index, isRunningTest, onRunTest }: TestRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="hover:bg-sidebar-accent/50 transition-colors border-b border-border/30"
    >
      <TableCell className="font-mono text-sm font-medium text-foreground">{test.id}</TableCell>
      <TableCell className="max-w-[200px]">
        <div>
          <div className="font-medium text-foreground truncate" title={test.name}>
            {test.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {test.duration} • {test.environment}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs font-medium">
          {test.type}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={statusColors[test.status]}>
          {test.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={priorityColors[test.priority]} className="text-xs">
          {test.priority}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-border rounded-full h-2 min-w-[60px]">
            <div 
              className="bg-gradient-to-r from-green-500 to-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${test.success}%` }}
            />
          </div>
          <div className="flex items-center gap-1">
            <NumberTicker value={test.success} className="font-bold text-sm min-w-[2rem] text-foreground" />
            <span className="text-muted-foreground text-xs">%</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-medium text-foreground">{test.assignee}</div>
          <div className="text-xs text-muted-foreground">
            {new Date(test.lastRun).toLocaleDateString('ar-EG')}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <StatefulButton
            size="sm"
            onClick={() => onRunTest(test.id)}
            disabled={test.status === "قيد التنفيذ"}
            isLoading={isRunningTest === test.id}
            idleText="تشغيل"
            loadingText="جاري..."
            successText="تم"
            className="text-xs h-8"
          >
            <Icons.play className="w-3 h-3 ml-1" />
          </StatefulButton>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Icons.eye className="w-3 h-3" />
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Icons.settings className="w-3 h-3" />
          </Button>
        </div>
      </TableCell>
    </motion.tr>
  )
}
