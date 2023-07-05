M.AutoInit();
const btnEnviar = document.querySelectorAll(".addCart");
const qtdMenos = document.querySelectorAll(".qtdMenos");
const qtdMais = document.querySelectorAll(".qtdMais");

var qtd=1;

qtdMais.forEach((val)=>{
  val.addEventListener("click",(event)=>{
    event.preventDefault();
    qtd++;
    let qtModal = event.target.closest("div");
    qtModal.querySelector("p").innerHTML=qtd;
    qtModal.querySelector(".addCart").setAttribute("data-qt",qtd);
  });
});//fim forEach qtdMais

qtdMenos.forEach((val)=>{
  val.addEventListener("click",(event)=>{
    event.preventDefault();
    if (qtd > 1) {
      qtd--;
      let qtModal = event.target.closest("div");
      qtModal.querySelector("p").innerHTML=qtd;
      qtModal.querySelector(".addCart").setAttribute("data-qt",qtd);
    }
  });
});//fim forEach qtdMenos

btnEnviar.forEach((val)=>{
  val.addEventListener("click",(event)=>{
    event.preventDefault();
    let sel = event.target.closest("div").parentNode.querySelector("select")
    let pao = sel.value;
    let nome = event.target.getAttribute("data-nome");
    let unit = event.target.getAttribute("data-valor");
    let qt = event.target.getAttribute("data-qt");
    let valor = parseFloat(unit) * parseInt(qt);
    
    fetch("/",{
      method:'POST',
      body:JSON.stringify({nome,qt,valor,unit,pao}),
      headers:{
        "Content-Type":"application/json"
      }
    });//fimfetch
    alert("Adicionado ao carrinho!");
  });
});//fim forEach btnEnviar
