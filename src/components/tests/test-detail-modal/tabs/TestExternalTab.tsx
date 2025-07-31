import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { Test } from "@/types/tests"


interface TestExternalTabProps {
  test: Test
}

export default function TestExternalTab({}: TestExternalTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.workflow className="w-5 h-5 text-purple-500" />
              GitHub Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icons.play className="w-4 h-4 ml-2" />
                  عرض Repository
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icons.fileText className="w-4 h-4 ml-2" />
                  Issues المرتبطة
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icons.workflow className="w-4 h-4 ml-2" />
                  Pull Requests
                </a>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h5 className="font-medium mb-2">معلومات Repository</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Branch:</span>
                  <span className="font-mono">main</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commit:</span>
                  <span className="font-mono">a1b2c3d</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.chart className="w-5 h-5 text-blue-500" />
              JIRA Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icons.fileText className="w-4 h-4 ml-2" />
                  عرض Ticket
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icons.users className="w-4 h-4 ml-2" />
                  Sprint Board
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icons.chart className="w-4 h-4 ml-2" />
                  Reports
                </a>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h5 className="font-medium mb-2">معلومات Ticket</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket ID:</span>
                  <span className="font-mono">QA-123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>أدوات إضافية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Slack", icon: Icons.message, color: "text-green-500" },
              { name: "Teams", icon: Icons.users, color: "text-blue-500" },
              { name: "Confluence", icon: Icons.fileText, color: "text-purple-500" },
              { name: "TestRail", icon: Icons.chart, color: "text-orange-500" }
            ].map((tool, index) => (
              <Button key={index} variant="outline" className="h-20 flex-col gap-2" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  <span className="text-sm">{tool.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
