import { HistoryList } from "@/components/history-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Estimator
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Estimate History</h1>
          <p className="text-gray-600 dark:text-gray-300">View your previous price estimates</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <HistoryList />
        </div>
      </div>
    </main>
  )
}

