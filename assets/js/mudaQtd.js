const qtdMais = document.querySelectorAll(".btnMais");
const qtdMenos = document.querySelectorAll(".btnMenos");

qtdMais.forEach((val)=>{
  val.addEventListener("click",(event)=>{
    event.preventDefault();
    let name = event.target.getAttribute("data-name");
    let op = event.target.getAttribute("data-op");
    let unit = event.target.getAttribute("data-val");
    let qtd = event.target.getAttribute("data-qt");
    qtd++;
    event.target.setAttribute("data-qt",qtd);
    let pao = event.target.getAttribute("data-pao");
    let tr = event.target.closest("tr");
    tr.querySelector(".btnMenos").setAttribute("data-qt",qtd);
    tr.querySelector("#qt").innerHTML=qtd;
    tr.querySelector("#val").innerHTML=`R$ ${qtd*unit}`;
    fetch("/client/cart",{
      method:'POST',
      body:JSON.stringify({name,op,unit,pao}),
      headers:{
        "Content-Type":"application/json"
      }
    });//endFetch
  });
});

qtdMenos.forEach((val)=>{
  val.addEventListener("click",(event)=>{
    event.preventDefault();
    let targetEl = event.target.closest("div");
    let name = event.target.getAttribute("data-name");
    let op = event.target.getAttribute("data-op");
    let unit = event.target.getAttribute("data-val");
    let qtd = event.target.getAttribute("data-qt");
    qtd--;
    let pao = event.target.getAttribute("data-pao");
    event.target.setAttribute("data-qt",qtd);
    let tr = event.target.closest("tr");
    tr.querySelector(".btnMais").setAttribute("data-qt",qtd);
    if (qtd > 0) {
      tr.querySelector("#qt").innerHTML=qtd;
      tr.querySelector("#val").innerHTML=`R$ ${qtd*unit}`;
    } else {
      tr.style.display="none";
    }
    
    fetch("/client/cart",{
      method:'POST',
      body:JSON.stringify({name,op,unit,pao}),
      headers:{
        "Content-Type":"application/json"
      }
    });//endFetch
  });
});