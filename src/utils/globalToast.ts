import { useToast } from 'wot-design-uni'

export let toastInstance: ReturnType<typeof useToast> | null = null

export const setToastInstance = () => {
  toastInstance = useToast()
}

export const showToast = () => toastInstance
