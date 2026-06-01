import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/pricing-section";
import {
  BarChart3,
  CheckCircle2,
  FileText,
  Globe,
  Hash,
  Mail,
  MessageSquare,
  Search,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Turn One Piece of Content into a <br />
            <span className="text-blue-600">Full Marketing Suite</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Stop spending hours manually repurposing your content. Upload one blog post or transcript, 
            and we'll generate social posts, threads, newsletters, and more in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Repurposing for Free
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              6 powerful output types from one source
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI engine understands your brand voice and transforms your content into 
              platform-optimized formats.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="text-blue-700" />}
              title="LinkedIn Posts"
              description="High-engagement LinkedIn content that builds your professional authority."
            />
            <FeatureCard 
              icon={<Hash className="text-blue-400" />}
              title="X (Twitter) Threads"
              description="Compelling threads that break down your content into viral bites."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-green-600" />}
              title="Social Media Posts"
              description="Ready-to-use captions for Instagram, Facebook, and more."
            />
            <FeatureCard 
              icon={<Mail className="text-red-500" />}
              title="Email Newsletters"
              description="Turn blog posts into engaging weekly digests for your subscribers."
            />
            <FeatureCard 
              icon={<Search className="text-orange-500" />}
              title="SEO Summaries"
              description="Meta descriptions and summaries optimized for search visibility."
            />
            <FeatureCard 
              icon={<FileText className="text-gray-700" />}
              title="Blog Excerpts"
              description="Perfect snippets for cross-posting and medium-form teasers."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold text-blue-600 mb-2">RepurposeContent</span>
            <p className="text-gray-500 text-sm">© 2024 RepurposeContent. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-gray-600 text-sm">
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-white">
      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}