let cart = JSON.parse(localStorage.getItem("cart")) || []

async function getAllProducts() {
    document.getElementById('cart-items').innerText = cart.length
    let div = document.getElementById("all-products")
    try {
        let data = await fetch("https://dummyjson.com/products")
        
        data = await data.json()
        
        console.log(data);
        data && data.products?.forEach((ele) => {
            let prod = document.createElement('div')
            let btn = document.createElement('button')
            btn.innerText = "Add to cart"
            btn.className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            btn.addEventListener("click", function () {
                let find = cart.find(item => item.id === ele.id)

                if (find) {
                    showToast("Allready added into cart");
                    return;
                }

                cart.push(ele)
                localStorage.setItem("cart", JSON.stringify(cart))
                document.getElementById("cart-items").innerText = cart.length
                showToast("Added to cart");
            })
            prod.className = "bg-white rounded-2xl shadow-sm overflow-hidden group"
            prod.innerHTML = `<img src="${ele.thumbnail}" alt="${ele.title}" class="w-full h-56 md:h-48 lg:h-56 img-cover" />
        
        </div>

        <div class="p-4">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-sm">${ele.title}</h3>
            <div class="text-sm text-gray-500">Rated 4.7</div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div>
              <div class="text-lg font-semibold">${ele.price}</div>
              <div class="text-xs text-gray-400 line-through">₹2,999</div>
            </div>

            <div class="flex items-center gap-2">
              <button class="p-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">Buy</button>
            </div>
          </div>
        </div>`
        div.appendChild(prod)
        prod.lastChild.appendChild(btn)
        })
    }catch(error){
        console.log(error.massage);
        
    }
}

function showToast(massage){
    const toast =document.getElementById('toast')
    toast.textContent=massage;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100')

    setTimeout(()=>{
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0')
    },3000)
}
