import { toast } from 'react-toastify'

const addToaster = (type, message) => {
  switch (type) {
    case 'info':
      toast.info(message)
      break
    case 'success':
      toast.success(message)
      break
    case 'warning':
      toast.warning(message)
      break
    case 'error':
      toast.error(message)
      break
  }
}
export default addToaster
