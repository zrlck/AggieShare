import PageLayout from "./page-layout"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gift, Leaf, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CategoryGrid from "@/components/category-grid"
import HowItWorks from "@/components/how-it-works"

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-16 pb-16">
        {/* Hero Section */}
        <section className="relative pt-16 md:pt-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-hackdavis-navy sm:text-4xl md:text-5xl lg:text-6xl">
                    Aggie<span className="text-white">Share</span>
                  </h1>
                  <p className="max-w-[600px] text-hackdavis-navy md:text-xl">
                    A free marketplace for UC Davis students to donate and discover essential goods. Reduce waste, save
                    money, and help your fellow Aggies.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/browse">
                    <Button size="lg" className="bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white">
                      Browse Items <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/donate">
                    <Button size="lg" variant="outline" className="border-hackdavis-navy text-hackdavis-navy">
                      Donate Items <Gift className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <Image
                    src="/aggie-mascot.png"
                    alt="UC Davis Aggie mascot with donated items"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UC Davis Banner */}
        <div className="w-full py-6 overflow-hidden bg-hackdavis-blue/30">
          <div className="flex justify-center space-x-12">
            <div className="relative w-16 h-16 mascot-icon animate-float">
              <Image src="/mascots/cow.png" alt="UC Davis Cow" fill className="object-contain" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-center text-hackdavis-navy font-medium">
              A HACKDAVIS HUB FOR EVERYONE WHO // creates for social good
            </p>
          </div>
        </div>

        {/* Value Props */}
        <section className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Sustainable</h3>
              <p className="text-center text-gray-500">Give items a second life and reduce campus waste</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="rounded-full bg-hackdavis-blue p-3">
                <Gift className="h-6 w-6 text-hackdavis-navy" />
              </div>
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-center text-gray-500">All items are donated at no cost to recipients</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="rounded-full bg-blue-100 p-3">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Local</h3>
              <p className="text-center text-gray-500">Find items near you on the UC Davis campus for easy pickup</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-hackdavis-navy">Browse Categories</h2>
              <Link href="/browse" className="text-hackdavis-navy hover:underline">
                View all
              </Link>
            </div>
            <CategoryGrid />
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />
      </div>
    </PageLayout>
  )
}
