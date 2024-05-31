import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

export const useRateAlert = (sessionId: string | null | undefined) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['rate-alerts'],
    queryFn: async () => {
      const response = await fetch(
        '/api/rate-alert?email=oluwatunmiseadenuga@gmail.com',
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!sessionId,
  })

  return {
    refetch,
    data,
    isLoading,
    error,
  }
}
