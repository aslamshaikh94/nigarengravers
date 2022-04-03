import { loadScript } from '@utils'
import { RAZORPAY_URL } from '@constants'
import addToaster from '@shared/Notification'
import Logo from '@assets/images/logo.svg'

export async function displayRazorpay(paymentData, resData) {
  const { prefill, paymentoptions } = paymentData
  const res = await loadScript(RAZORPAY_URL)
  const { currency, amount, id } = paymentoptions
  const { mobile, name, email } = prefill

  if (!res) {
    return addToaster('error', 'Please check internet connection')
  }

  const options = {
    key: process.env.RPAY_KEY,
    currency,
    amount,
    order_id: id,
    name: 'Expert Bunch',
    description: 'Add Money to your wallet',
    image: Logo,
    handler: function (response) {
      resData(response)
      // alert(response.razorpay_payment_id)
      // alert(response.razorpay_order_id)
      // alert(response.razorpay_signature)
    },
    prefill: {
      name,
      email,
      phone_number: mobile
    }
  }
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}

// checkout_logo: "https://cdn.razorpay.com/logo.png"
// custom_branding: false
// org_logo: ""
// org_name: "Razorpay Software Private Ltd"
// razorpay_order_id: "order_HuCppg3v9KBV3O"
// razorpay_payment_id: "pay_HuCu2wrnEhnZT9"
// razorpay_signature: "ad1e29fb675a3a3d649d4b1b6879d4885ca686862e791520d0188cff7407d38e"
