"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { StatefulButton } from "@/components/ui/stateful-button"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

interface WorkflowStep {
  id: number
  title: string
  description: string
  status: string
  progress: number
  duration: string
  assignee: string
  icon: any
  color: string
  tasks: { name: string; completed: boolean }[]
}

interface WorkflowStepsProps {
  workflowSteps: WorkflowStep[]
  isExecuting: number | null
  onExecuteStep: (stepId: number) => void
}

const statusColors = {
  مكتمل: "default",
  "قيد التنفيذ": "secondary",
  معلق: "outline",
  "لم يبدأ": "secondary",
} as const

const colorVariants = {
  green: "from-green-500/20 to-emerald-500/30",
  blue: "from-blue-500/20 to-cyan-500/30",
  orange: "from-orange-500/20 to-amber-500/30",
  gray: "from-gray-500/20 to-slate-500/30",
}

export default function WorkflowSteps({ 
  workflowSteps, 
  isExecuting, 
  onExecuteStep 
}: WorkflowStepsProps) {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[25rem] gap-4 sm:gap-6">
        {workflowSteps.map((step, index) => {
          const completedTasks = step.tasks.filter(
            (task) => task.completed
          ).length

          return (
            <motion.div
              key={step.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <BentoGridItem
                title={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-${
                          step.color === "green"
                            ? "green"
                            : step.color === "blue"
                            ? "blue"
                            : step.color === "orange"
                            ? "orange"
                            : "gray"
                        }-500/10`}
                      >
                        <step.icon
                          className={`w-5 h-5 text-${
                            step.color === "green"
                              ? "green"
                              : step.color === "blue"
                              ? "blue"
                              : step.color === "orange"
                              ? "orange"
                              : "gray"
                          }-500`}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{step.title}</h3>
                        <Badge
                          variant={
                            statusColors[
                              step.status as keyof typeof statusColors
                            ]
                          }
                          className="text-xs mt-1"
                        >
                          {step.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                }
                description={
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span className="font-bold">{step.progress}%</span>
                      </div>
                      <Progress value={step.progress} className="h-2" />
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>المهام</span>
                        <span className="font-bold">
                          {completedTasks}/{step.tasks.length}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {step.tasks.map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            className="flex items-center gap-2 text-xs"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                task.completed
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                            <span
                              className={
                                task.completed
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Assignee */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">المسؤول:</span>
                      <span className="font-medium">{step.assignee}</span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {step.status === "معلق" || step.status === "لم يبدأ" ? (
                        <StatefulButton
                          onClick={() => onExecuteStep(step.id)}
                          disabled={step.status === "لم يبدأ"}
                          isLoading={isExecuting === step.id}
                          idleText="بدء المرحلة"
                          loadingText="جاري التنفيذ"
                          successText="تم البدء"
                          className="w-full btn-primary text-sm"
                        >
                          <step.icon className="w-4 h-4 ml-2" />
                        </StatefulButton>
                      ) : step.status === "قيد التنفيذ" ? (
                        <Button
                          variant="secondary"
                          className="w-full"
                          disabled
                        >
                          <Icons.spinner className="w-4 h-4 ml-2 animate-spin" />
                          قيد التنفيذ...
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full text-green-600 border-green-200"
                        >
                          <Icons.check className="w-4 h-4 ml-2" />
                          مكتمل
                        </Button>
                      )}
                    </div>
                  </div>
                }
                header={
                  <BackgroundGradient
                    className="rounded-lg p-4 h-full"
                    containerClassName="h-full"
                  >
                    <div
                      className={`w-full h-full bg-gradient-to-br ${
                        colorVariants[
                          step.color as keyof typeof colorVariants
                        ]
                      } rounded-lg flex flex-col items-center justify-center relative overflow-hidden`}
                    >
                      {/* Step Number */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{step.id}</span>
                      </div>

                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale:
                            step.status === "قيد التنفيذ" ? [1, 1.1, 1] : 1,
                          rotate: step.status === "مكتمل" ? [0, 360] : 0,
                        }}
                        transition={{
                          duration: step.status === "قيد التنفيذ" ? 2 : 1,
                          repeat:
                            step.status === "قيد التنفيذ" ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      >
                        <step.icon
                          className={`w-16 h-16 text-${
                            step.color === "green"
                              ? "green"
                              : step.color === "blue"
                              ? "blue"
                              : step.color === "orange"
                              ? "orange"
                              : "gray"
                          }-500/80`}
                        />
                      </motion.div>

                      {/* Connection Line */}
                      {index < workflowSteps.length - 1 && (
                        <div className="absolute -bottom-4 left-1/2 w-0.5 h-8 bg-border transform -translate-x-1/2" />
                      )}
                    </div>
                  </BackgroundGradient>
                }
                className={`${
                  index % 2 === 0 ? "md:col-span-2" : ""
                } card-hover`}
              />
            </motion.div>
          )
        })}
      </BentoGrid>
    </motion.div>
  )
}