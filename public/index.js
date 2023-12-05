const url = "http://localhost:8000/api/v1";
async function CheckoutFun1(amount) {
  let response = await fetch(`${url}/payment/getkey`);
  let R_key = await response.json();

  response = await fetch(`${url}/payment/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });
  response = await response.json();
  if (response.success && R_key.success) {
    const options = {
      key: R_key.key, // Enter the Key ID generated from the Dashboard
      amount: response.order.amount, // Amount is in currency subunits.
      currency: "INR",
      name: "Mohammed Shahid",
      description: "Test Transaction",
      image:
        "https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png",
      order_id: response.order.id,
      callback_url: `${url}/payment/verify`,
      prefill: {
        name: "user1",
        email: "user1@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }
}
