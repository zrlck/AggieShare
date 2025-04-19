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
                    About Aggie<span className="text-purple-500">Share</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    We're on a mission to create a more sustainable and connected college community through the sharing
                    of essential goods.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
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
              AggieShare was created at HackDavis with a simple goal: to reduce waste and help college students access
              essential items without financial burden. We believe in the power of community sharing to create a more
              sustainable and supportive campus environment.
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
                  AggieShare began as a hackathon project at HackDavis, where a team of students noticed the waste
                  created at the end of each academic year. Perfectly good items were being discarded as students moved
                  out of dorms and apartments.
                </p>
                <p>
                  At the same time, many students were struggling to afford essential items for their education and
                  daily life. We saw an opportunity to connect these two problems with one solution: a free donation
                  marketplace specifically for college communities.
                </p>
                <p>
                  What started as a weekend project has grown into a platform serving the UC Davis campus, with plans to
                  expand to other UC campuses. Our cute cow mascots represent our commitment to creating a friendly,
                  accessible platform for all students.
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
