"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function ContactDonor({ email }: { email: string }) {
  const [showEmail, setShowEmail] = useState(false);

  if (!email) {
    return (
      <Button className="w-full bg-gray-300 text-gray-500 cursor-not-allowed" disabled>
        <MessageCircle className="mr-2 h-4 w-4" />
        No Contact Email Provided
      </Button>
    );
  }

  return showEmail ? (
    <div className="w-full flex items-center justify-center py-3 text-lg font-semibold text-hackdavis-navy border border-hackdavis-navy rounded-lg bg-hackdavis-blue/10">
      {email}
    </div>
  ) : (
    <Button
      className="w-full bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white"
      onClick={() => setShowEmail(true)}
      type="button"
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Contact Donor
    </Button>
  );
}
