"use client"

import { useState, useEffect } from "react"

interface EstimateResult {
  originalPrice: number
  estimatedResalePrice: string
  brand: string
  category: string
  brandFactor: number
  categoryFactor: number
  timestamp?: string
}

export function useEstimateHistory() {
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

  // Save a new estimate to history
  const saveEstimate = (result: EstimateResult) => {
    const newResult = {
      ...result,
      timestamp: new Date().toLocaleString(),
    }

    const updatedHistory = [newResult, ...history].slice(0, 10) // Keep only the 10 most recent
    setHistory(updatedHistory)

    // Save to localStorage
    localStorage.setItem("estimateHistory", JSON.stringify(updatedHistory))
  }

  // Clear all history
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("estimateHistory")
  }

  return {
    history,
    saveEstimate,
    clearHistory,
  }
}

