import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json()

    // Get the backend URL from environment variables
    const backendUrl = process.env.BACKEND_URL

    if (!backendUrl) {
      console.error("BACKEND_URL environment variable is not set")
      return NextResponse.json({ error: "Backend URL configuration is missing" }, { status: 500 })
    }

    console.log(`Attempting to connect to backend at: ${backendUrl}`)

    // Forward the request to the backend
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      // Add a timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    // If the backend response is not OK, handle the error
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Backend returned an error:", errorData)
      return NextResponse.json({ error: errorData.error || "Backend service error" }, { status: response.status })
    }

    // Get the response from the backend
    const data = await response.json()

    // Return the response
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error forwarding request to backend:", error)

    // Provide more detailed error information
    let errorMessage = "Failed to connect to the backend service"
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

