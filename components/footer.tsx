import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-hackdavis-blue/80">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="AggieShare Logo" fill className="object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-hackdavis-navy">
                Aggie<span className="text-white">Share</span>
              </h3>
            </div>
            <p className="text-sm text-hackdavis-navy">
              A free donation marketplace for the UC Davis community. Share essentials, reduce waste, and help fellow
              Aggies.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-hackdavis-navy">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-hackdavis-navy hover:text-white">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-hackdavis-navy hover:text-white">
                  Donate Items
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-hackdavis-navy hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-hackdavis-navy hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-hackdavis-navy">UC Davis Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.ucdavis.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hackdavis-navy hover:text-white"
                >
                  UC Davis Main Site
                </a>
              </li>
              <li>
                <a
                  href="https://my.ucdavis.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hackdavis-navy hover:text-white"
                >
                  MyUCDavis
                </a>
              </li>
              <li>
                <a
                  href="https://canvas.ucdavis.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hackdavis-navy hover:text-white"
                >
                  Canvas
                </a>
              </li>
              <li>
                <a
                  href="https://housing.ucdavis.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hackdavis-navy hover:text-white"
                >
                  Student Housing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-hackdavis-navy">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-hackdavis-navy hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-hackdavis-navy hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-hackdavis-navy hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="mt-4 text-sm text-hackdavis-navy">
              Have questions? <br />
              <a href="mailto:contact@aggieshare.org" className="text-white hover:underline">
                contact@aggieshare.org
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6">
          <p className="text-center text-sm text-hackdavis-navy">
            © {new Date().getFullYear()} AggieShare. All rights reserved. Created for HackDavis.
          </p>
          <p className="text-center text-xs text-hackdavis-navy mt-1">
            A HACKDAVIS HUB FOR EVERYONE WHO // creates for social good
          </p>
        </div>
      </div>
    </footer>
  )
}
