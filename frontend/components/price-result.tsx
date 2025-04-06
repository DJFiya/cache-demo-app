"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PriceResultProps {
  result: {
    originalPrice: number
    estimatedResalePrice: string
    brand: string
    category: string
    brandFactor: number
    categoryFactor: number
  }
}

export function PriceResult({ result }: PriceResultProps) {
  const [showDetails, setShowDetails] = useState(false)

  const percentageOfOriginal = Math.round((Number.parseFloat(result.estimatedResalePrice) / result.originalPrice) * 100)

  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Estimated Resale Value</span>
          <span className="text-green-600 dark:text-green-400">${result.estimatedResalePrice}</span>
        </CardTitle>
        <CardDescription>
          {percentageOfOriginal}% of the original price (${result.originalPrice})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Brand:</span>
            <span className="font-medium">{result.brand}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Category:</span>
            <span className="font-medium">{result.category}</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300 mr-1">Brand Factor:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The brand factor represents how well the brand retains value in the resale market.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{result.brandFactor.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300 mr-1">Category Factor:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The category factor represents how well this type of item retains value in the resale market.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">{result.categoryFactor.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300 mr-1">Calculation:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Original Price × Brand Factor × Category Factor = Estimated Resale Price
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-medium">
                ${result.originalPrice} × {result.brandFactor.toFixed(2)} × {result.categoryFactor.toFixed(2)} = $
                {result.estimatedResalePrice}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Calculation Details"}
          <ArrowDownCircle className={`ml-2 h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  )
}

