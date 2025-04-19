import Image from "next/image"

export default function MascotRow() {
  return (
    <div className="w-full py-6 overflow-hidden bg-hackdavis-blue/30">
      <div className="flex justify-center space-x-12">
        <div className="relative w-16 h-16 mascot-icon animate-float">
          <Image src="/mascots/cow.png" alt="UC Davis Cow" fill className="object-contain" />
        </div>
        <div className="relative w-16 h-16 mascot-icon animate-float" style={{ animationDelay: "0.5s" }}>
          <Image src="/mascots/bear.png" alt="UC Berkeley Bear" fill className="object-contain" />
        </div>
        <div className="relative w-16 h-16 mascot-icon animate-float" style={{ animationDelay: "1s" }}>
          <Image src="/mascots/slug.png" alt="UC Santa Cruz Slug" fill className="object-contain" />
        </div>
        <div className="relative w-16 h-16 mascot-icon animate-float" style={{ animationDelay: "1.5s" }}>
          <Image src="/mascots/triton.png" alt="UC San Diego Triton" fill className="object-contain" />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-center text-hackdavis-navy font-medium">
          A HACKDAVIS HUB FOR EVERYONE WHO // creates for social good
        </p>
      </div>
    </div>
  )
}
