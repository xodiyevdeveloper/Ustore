let addToCartBtns = document.querySelectorAll('.add_to_cart_button')

addToCartBtns.forEach(item => {
   item.addEventListener('click', async e => {
      const id = e.target.id

      let response = await fetch('/cart/add', {
         headers: {
            "Content-Type": "application/json; charset=utf-8"
         },
         method: "POST",
         body: JSON.stringify({id: id})
      })

      response = await response.json()
      if (response.ok) {
         alert('Added to cart')
      }
   })
})