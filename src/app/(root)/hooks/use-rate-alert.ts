import { useQuery, useMutation } from '@tanstack/react-query'

export const useRateAlert = (email?: string) => {
  const getRateAlerts = useQuery({
    queryKey: ['rate-alerts'],
    queryFn: async () => {
      const response = await fetch(`/api/rate-alert?email=${email}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!email,
  })

  const createAlert = useMutation({
    mutationKey: ['create-rate-alert'],
    mutationFn: async (data: any) => {
      const response = await fetch('/api/rate-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: () => {
      getRateAlerts.refetch()
    },
  })

  return {
    getRateAlerts,
    createAlert,
  }
}
