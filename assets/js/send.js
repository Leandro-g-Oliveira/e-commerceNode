const btn = document.querySelector("#btnEntrega");
const entrega = document.querySelector(".entrega");
const valEntrega = document.querySelector(".total>div");
function mudar (e) {
  e.preventDefault();
  entrega.classList.toggle("hider");
  if (entrega.classList.contains("hider")) {
    e.target.innerHTML = "Retirar no local";
    entrega.innerHTML = `
      <div class="input-field">
        <input type="text" name="nome" id="nome" required/>
        <label for="nome">nome</label>
      </div>
    `;
    valEntrega.innerHTML=``;
  } else {
    e.target.innerHTML = "Entregar";
    entrega.innerHTML = `
          <div class="input-field">
            <input type="text" name="nome" id="nome" required/>
            <label for="nome">nome</label>
          </div>
          <div class="input-field">
            <input type="text" name="endereco" id="endereco" required/>
            <label for="endereco">endereco</label>
          </div>
          <div class="city">
            <div class="input-field">
              <input type="text" name="bairro" id="bairro" required/>
              <label for="bairro">bairro</label>
            </div>
            <div class="input-field">
              <input type="text" name="cidade" id="cidade" required/>
              <label for="cidade">cidade</label>
            </div>
          </div>
    `;
    valEntrega.innerHTML=`
      <p>4 reais entrega</p>
      <input type="hidden" name="entrega" value="4"/>
    `;
  }
}

btn.addEventListener("click",mudar);