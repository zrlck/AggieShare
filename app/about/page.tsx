import PageLayout from "../page-layout"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, Leaf, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-16 pb-16">
        {/* Hero Section */}
        <section className="bg-purple-50 py-16 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    About Aggie<span className="text-blue-300">Share</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  We're creating a stronger college community by making it simple to share essential items with others—no cost, just support.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                  <Image
                    src="XD1.jpg"
                    alt="AggieShare team"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            AggieShare was created at the HackDavis 2025 with a simple goal:  reduce waste and help college students access essential items without financial burden. We believe in the power of community sharing to create a more sustainable and supportive campus environment, and the most important part - it's free!
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-green-100 p-4 dark:bg-green-900">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold">Sustainability</h3>
              <p className="text-gray-500 dark:text-gray-400">
                By extending the lifecycle of goods, we reduce waste and minimize environmental impact on and around our
                campuses.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-purple-100 p-4 dark:bg-purple-900">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We foster connections between students through the sharing of resources, creating stronger campus
                communities.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900">
                <Heart className="h-8 w-8 text-red-600 dark:text-red-300" />
              </div>
              <h3 className="text-xl font-bold">Accessibility</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We believe essential goods should be accessible to all students, regardless of financial circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                AggieShare was born in just 12 hours during HackDavis 2025—an idea sparked by a simple observation: at the end of every school year, so many usable items go to waste while others on campus struggle to afford everyday essentials.
                </p>
                <p>
                We realized we could bridge that gap with a free donation platform made just for college students. What started as a quick weekend project turned into something we’re truly proud of.
                </p>
                <p>
                Thank you to everyone who supported us during HackDavis and believed in our vision. With our friendly cow mascots by our side, we’re excited to keep growing and helping students—starting here at UC Davis and hopefully beyond.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container px-4 md:px-6">
          <div className="rounded-lg bg-purple-50 p-8 dark:bg-gray-800">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Join Our Community</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Ready to start sharing and discovering free items in your college community? Join AggieShare today!
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/browse">
                  <Button size="lg">Browse Items</Button>
                </Link>
                <Link href="/donate">
                  <Button size="lg" variant="outline">
                    Donate an Item
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
