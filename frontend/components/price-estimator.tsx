"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PriceResult } from "@/components/price-result"
import { useEstimateHistory } from "@/lib/hooks/use-estimate-history"

// Define the form schema with validation
const formSchema = z.object({
  brand: z.string().min(1, { message: "Please select a brand" }),
  category: z.string().min(1, { message: "Please select a category" }),
  originalPrice: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val)
      return !isNaN(num) && num > 0
    },
    { message: "Price must be a positive number" },
  ),
})

// Define the response type
interface EstimateResponse {
  originalPrice: number
  estimatedResalePrice: string
  brand: string
  category: string
  brandFactor: number
  categoryFactor: number
}

export default function PriceEstimator() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<EstimateResponse | null>(null)
  const { saveEstimate } = useEstimateHistory()

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      category: "",
      originalPrice: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: values.brand,
          category: values.category,
          originalPrice: values.originalPrice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to estimate price")
      }

      setResult(data)

      // Save to history
      saveEstimate(data)
    } catch (err) {
      console.error("Error estimating price:", err)
      setError(
        err instanceof Error ? err.message : "Unable to connect to the estimation service. Please try again later.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Gucci">Gucci</SelectItem>
                        <SelectItem value="Prada">Prada</SelectItem>
                        <SelectItem value="Louis Vuitton">Louis Vuitton</SelectItem>
                        <SelectItem value="Chanel">Chanel</SelectItem>
                        <SelectItem value="Calvin Klein">Calvin Klein</SelectItem>
                        <SelectItem value="Tommy Hilfiger">Tommy Hilfiger</SelectItem>
                        <SelectItem value="Ralph Lauren">Ralph Lauren</SelectItem>
                        <SelectItem value="Michael Kors">Michael Kors</SelectItem>
                        <SelectItem value="Zara">Zara</SelectItem>
                        <SelectItem value="H&M">H&M</SelectItem>
                        <SelectItem value="Forever 21">Forever 21</SelectItem>
                        <SelectItem value="ASOS">ASOS</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Outerwear">Outerwear</SelectItem>
                        <SelectItem value="Dresses">Dresses</SelectItem>
                        <SelectItem value="Jeans">Jeans</SelectItem>
                        <SelectItem value="Tops">Tops</SelectItem>
                        <SelectItem value="T-shirts">T-shirts</SelectItem>
                        <SelectItem value="Skirts">Skirts</SelectItem>
                        <SelectItem value="Sweaters">Sweaters</SelectItem>
                        <SelectItem value="Activewear">Activewear</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} type="number" min="0.01" step="0.01" disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Enter the original retail price of the item</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Estimate Resale Price"
            )}
          </Button>
        </form>
      </Form>

      {result && <PriceResult result={result} />}
    </div>
  )
}

