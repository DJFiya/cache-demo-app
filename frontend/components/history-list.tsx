"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface EstimateResult {
  originalPrice: number
  estimatedResalePrice: string
  brand: string
  category: string
  timestamp: string
}

export function HistoryList() {
  const [history, setHistory] = useState<EstimateResult[]>([])

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("estimateHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse history from localStorage", e)
      }
    }
  }, [])

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("estimateHistory")
  }

  if (history.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Estimates</CardTitle>
          <CardDescription>Your previous price estimates</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={clearHistory}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div>
                <p className="font-medium">
                  {item.brand} {item.category}
                </p>
                <p className="text-sm text-gray-500">{item.timestamp}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600 dark:text-green-400">${item.estimatedResalePrice}</p>
                <p className="text-sm text-gray-500">Original: ${item.originalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

