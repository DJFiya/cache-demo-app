import PriceEstimator from "@/components/price-estimator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cache Resale Price Estimator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find out how much your clothing items are worth in the resale market
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <PriceEstimator />
        </div>
      </div>
    </main>
  )
}

