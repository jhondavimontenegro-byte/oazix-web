const phone = "573017365197";
document.querySelectorAll("[data-wa]").forEach((link) => {
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(link.dataset.wa)}`;
  link.target = "_blank";
  link.rel = "noopener";
});
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));
document.querySelector("#year").textContent = new Date().getFullYear();
const prices={sachet:q=>q<=10?6000:q<=20?5800:q<=40?5600:q<=70?5400:5200,bag:q=>q===1?47000:q<=5?45000:q<=10?43000:40000};
const labels={sachet:"Sachet 8 oz",bag:"Bolsa para máquina 6 L"};let cart=[];const drawer=document.querySelector(".cart-drawer"),overlay=document.querySelector(".cart-overlay"),money=v=>`$${v.toLocaleString("es-CO")} COP`;
function openCart(open){drawer.classList.toggle("open",open);overlay.classList.toggle("open",open);drawer.setAttribute("aria-hidden",!open)}
function renderCart(){const totals={sachet:0,bag:0};cart.forEach(i=>totals[i.type]+=i.quantity);let total=0,box=document.querySelector(".cart-items");box.innerHTML=cart.length?cart.map((i,n)=>{const unit=prices[i.type](totals[i.type]),line=unit*i.quantity;total+=line;return `<article class="cart-line"><div class="cart-line-top"><strong>${labels[i.type]}</strong><strong>${money(line)}</strong></div><p>${i.flavor} · ${i.quantity} unidad${i.quantity>1?"es":""} · ${money(unit)} c/u</p><button class="remove-item" data-index="${n}">Quitar</button></article>`}).join(""):'<p class="empty-cart">Tu carrito está vacío. Agrega una presentación para comenzar.</p>';document.querySelector(".cart-total").textContent=money(total);document.querySelectorAll(".cart-count").forEach(e=>e.textContent=cart.reduce((s,i)=>s+i.quantity,0));document.querySelectorAll(".remove-item").forEach(b=>b.addEventListener("click",()=>{cart.splice(+b.dataset.index,1);renderCart()}))}
document.querySelectorAll(".add-cart").forEach(b=>b.addEventListener("click",()=>{const card=b.closest(".product-card"),quantity=Math.max(1,+card.querySelector(".quantity-input").value||1);cart.push({type:b.dataset.product,flavor:card.querySelector(".flavor-select").value,quantity});renderCart();openCart(true)}));
document.querySelector(".cart-button").addEventListener("click",()=>openCart(true));document.querySelector(".close-cart").addEventListener("click",()=>openCart(false));overlay.addEventListener("click",()=>openCart(false));
document.querySelector(".checkout").addEventListener("click",()=>{if(!cart.length)return;const totals={sachet:0,bag:0};cart.forEach(i=>totals[i.type]+=i.quantity);let total=0;const lines=cart.map(i=>{const unit=prices[i.type](totals[i.type]);total+=unit*i.quantity;return `• ${labels[i.type]} — ${i.flavor}: ${i.quantity} x ${money(unit)}`});const message=`Hola Oazix, quiero hacer este pedido:\n\n${lines.join("\n")}\n\nTotal estimado: ${money(total)}\n\n¿Me confirman disponibilidad y entrega?`;window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,"_blank","noopener")});
