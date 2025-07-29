"use client"

import { motion } from "framer-motion"
import { LandingHeader } from "@/components/landing/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesShowcase } from "@/components/landing/features-showcase"
import { StatsSection } from "@/components/landing/stats-section"
import { TechStackSection } from "@/components/landing/tech-stack-section"
import { CTASection } from "@/components/landing/cta-section"
import { LandingFooter } from "@/components/landing/landing-footer"
import { pageTransitions } from "@/lib/animations"

export default function LandingPage() {
  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageTransitions}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Fixed Header with Your Day-Night-Switch */}
      <LandingHeader />

      {/* Hero Section - First Impression */}
      <HeroSection />

      {/* Features Showcase - Your Components in Action */}
      <FeaturesShowcase />

      {/* Statistics - Impressive Numbers */}
      <StatsSection />

      {/* Technology Stack - Modern Components */}
      <TechStackSection />

      {/* Call to Action - Path to Dashboard */}
      <CTASection />

      {/* Professional Footer */}
      <LandingFooter />
    </motion.div>
  )
}
