/* js/components/search.js — Search panel */
/* search */
function initSearch(){
  const panel=document.getElementById("searchPanel"), input=document.getElementById("searchInput"), res=document.getElementById("searchResults");
  document.getElementById("openSearch").onclick=()=>{panel.classList.add("open");document.getElementById("overlay").classList.add("open");input.focus()};
  input.oninput=()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){res.innerHTML="";return}
    const m=PRODUCTS.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));
    res.innerHTML = m.length ? m.map(p=>`<a href="product.html?id=${p.id}"><span class="t">${productVisual(p)}</span><span>${p.name}</span><span>${fmt(p.price)}</span></a>`).join("") : `<p>No results for "${q}"</p>`;
  };
}
