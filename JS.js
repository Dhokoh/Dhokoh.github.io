let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';
let url = 'https://pokeapi.co/api/v2/pokemon'
let url_dos = 'https://pokeapi.co/api/v2/pokemon/'

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

const apinasa = async() =>{
    const llamada = await fetch(nasa_url_globalAPI);
    const datos = await llamada.json()
    let eventos = datos.events
    console.log(eventos)
    eventos.forEach(element => {
        
    });
}

const pokeapi = async () => {
    const llamada = await fetch (url)
    const data = await llamada.json()
    const lista = []
        for (let i = 1; i<= 3; i++){
        const llamada_dos = await fetch(url_dos+i)
        const data_dos = await llamada_dos.json()
        data_dos.types.forEach(e =>{
            debugger
            if (lista.length === 0){
                let objeto ={
                    tipo: e.type.name,
                    cuenta: 1
                }
                lista.push(objeto)
            }
            else{
                if (lista.includes(e.type.name)){
                    lista.cuenta += 1
                } else{
                    let objeto ={
                        tipo: e.type.name,
                        cuenta: 1
                    }
                    lista.push(objeto)
                }
            }
        })
    }
    console.log(lista)
}
pokeapi()