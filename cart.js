let cart = JSON.parse(localStorage.getItem("cart")) || []

function getCartProducts() {
    document.getElementById("cart-items").innerText = cart.length
    let div = document.getElementById("show-cart")


    cart && cart.forEach((ele) => {
        let prod = document.createElement('div');
        prod.className = "bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
        prod.innerHTML = `<img src="${ele.thumbnail}" alt="${ele.title}" class="w-32 h-32 object-cover rounded">
            <div class="flex-1">
                <h2 class="text-lg font-semibold mb-2">${ele.title}</h2>
                <p class="text-gray-600 mb-4">${ele.description}</p>
                <p class="text-gray-800 font-bold mb-4">${Math.ceil(ele.price) * ele.minimumOrderQuantity}</p>
                <button id="${ele.id}" value="${ele.id}" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Remove to Cart
                </button>`
        div.appendChild(prod);

        let total = cart.reduce((prev, curr) => prev + (curr.price * curr.minimumOrderQuantity), 0)
        document.querySelectorAll("#total-amount").forEach(ele => ele.textContent = `${Math.ceil(total)}`)

        document.getElementById(ele.id).addEventListener("click", function (e) {
            let index = cart.findIndex(item => item.id === ele.id)
            cart.splice(index, 1);
            document.getElementById("cart-items").innerText = cart.length
            localStorage.setItem("cart", JSON.stringify(cart));
            prod.remove()
            let total = cart.reduce((prev, curr) => prev + (curr.price * curr.minimumOrderQuantity), 0)
            document.querySelectorAll("#total-amount").forEach(ele => ele.textContent = `${Math.ceil(total)}`)
            showToast("Remove from cart");
        })
    })
}

function showToast(massage) {
    const toast = document.getElementById('toast')
    toast.textContent = massage;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.remove('opacity-100')
        toast.classList.add('opacity-0')
    }, 3000)
}