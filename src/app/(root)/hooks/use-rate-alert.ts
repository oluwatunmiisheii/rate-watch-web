import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRateAlert = (email?: string) => {
  const getRateAlerts = useQuery({
    queryKey: ['rate-alerts'],
    queryFn: async () => {
      const response = await fetch(`/api/rate-alert?email=${email}`)
      const jsonRes = await response.json()

      if (!response.ok) {
        throw new Error('Network response was not ok', {
          cause: jsonRes,
        })
      }
      return jsonRes
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

      const jsonRes = await response.json()

      if (!response.ok) {
        throw Error('Network response was not ok', {
          cause: jsonRes,
        })
      }
      return jsonRes
    },
    onSuccess: () => {
      getRateAlerts.refetch()
      toast.success('Rate alert created successfully')
    },
    onError: (error) => {
      const message = (error.cause as any)?.message || error?.message || 'An error occurred'
      toast.error(message)
    },
  })

  const deleteRateAlert = useMutation({
    mutationKey: ['delete-rate-alert'],
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/rate-alert?id=${id}`, {
        method: 'DELETE',
      })

      const jsonRes = await response.json()

      if (!response.ok) {
        throw new Error('Network response was not ok', {
          cause: jsonRes,
        })
      }
      return jsonRes
    },
    onSuccess: () => {
      getRateAlerts.refetch()
      toast.success('Rate alert deleted successfully')
    },
  })

  return {
    getRateAlerts,
    createAlert,
    deleteRateAlert,
  }
}
