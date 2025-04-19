import { Camera, Check, MapPin } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="bg-hackdavis-blue/30 py-12 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-hackdavis-navy">How It Works</h2>
          <p className="max-w-[700px] text-hackdavis-navy md:text-lg">
            AggieShare makes it easy to donate and find free items in the UC Davis community
          </p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
            <div className="rounded-full bg-hackdavis-blue p-3 dark:bg-hackdavis-blue/50">
              <Camera className="h-6 w-6 text-hackdavis-navy dark:text-hackdavis-blue" />
            </div>
            <h3 className="text-xl font-bold">1. Snap a Photo</h3>
            <p className="text-center text-gray-500">
              Take a clear photo of the item you want to donate and our AI will help categorize it
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
            <div className="rounded-full bg-hackdavis-blue p-3 dark:bg-hackdavis-blue/50">
              <MapPin className="h-6 w-6 text-hackdavis-navy dark:text-hackdavis-blue" />
            </div>
            <h3 className="text-xl font-bold">2. Set Your Location</h3>
            <p className="text-center text-gray-500">
              Choose your location on campus so fellow Aggies can find your donation easily
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
            <div className="rounded-full bg-hackdavis-blue p-3 dark:bg-hackdavis-blue/50">
              <Check className="h-6 w-6 text-hackdavis-navy dark:text-hackdavis-blue" />
            </div>
            <h3 className="text-xl font-bold">3. Connect & Share</h3>
            <p className="text-center text-gray-500">
              Arrange pickup with interested students through our messaging system
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
