let btn = document.querySelector(".btn_buscar");
let codigo = document.querySelector("#selec1");
let cambio = document.querySelector("#input");
let producto = 0;
let moneda_selec =0;
let resultado = document.querySelector("#resultado");
let grafico = document.querySelector(".grafica");
let myChart = document.getElementById("myChart");
let primera=0;
const apiURL1 = "https://mindicador.cl/api/";
let apiURL2 ="";


btn.addEventListener("click",function(){
   console.log(codigo.value);
   
   if(primera>0){
    borrar();
   }
   
   primera++;

 //  myChart.clear();
   // getMonedas(codigo.value);
    renderGraf(); 
});


async function getMonedas(cod){
    try
    {
        const res = await fetch(apiURL1+cod);
        const monedas= await res.json();
   
        console.log(monedas);
        console.log(monedas.codigo);
        console.log(monedas.serie[0].valor);
        
        const labels = monedas.serie.map((moneda) => {
            console.log(moneda.fecha);
            const date = moneda.fecha
            return date;
        });

        const data = monedas.serie.map((moneda) => {
            console.log(moneda.valor);
            const diario = moneda.valor;
            return diario;
        });

        const datasets = [
            {label: "Valor", borderColor: "rgb(255,99,132)", data}
        ];

        moneda_selec = monedas.serie[0].valor;
        console.log(moneda_selec);
        producto = Number(cambio.value)/moneda_selec;
        console.log(producto);

        resultado.innerHTML = "Resultado: $" + producto.toLocaleString() + " "+cod;
        
        console.log(labels);
        console.log(datasets);
        return{labels,datasets}

    } catch(e){
        alert(e.message);
    }

    }

    async function renderGraf(){
        const data = await getMonedas(codigo.value);
        console.log(data);
        const config = {
            type:"line",data
        };
        
        myChart.style.backgroundColor = "white";
        new Chart(myChart,config)
    }

    function borrar(){
        let grafica = Chart.getChart("myChart");
        grafica.destroy();
    }