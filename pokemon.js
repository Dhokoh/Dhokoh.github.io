
let url = 'https://pokeapi.co/api/v2/pokemon'
let url_dos = 'https://pokeapi.co/api/v2/pokemon/'

const showLoading = () => {
    var loader = document.getElementById("Loader")
    loader.style.display = 'block'
}

const hideLoading = () => {
    var loader = document.getElementById("Loader")
    loader.style.display = 'none'
}
const pokeapi = async () => {
    showLoading()
    const llamada = await fetch (url)
    const data = await llamada.json()
    const lista = []
    const eje_x = []
    const eje_y = []
        for (let i = 1; i<= 20; i++){
        const llamada_dos = await fetch(url_dos+i)
        const data_dos = await llamada_dos.json()
        data_dos.types.forEach(e =>{
            if (lista.length === 0){
                let objeto ={
                    tipo: e.type.name,
                    cuenta: 1
                }
                lista.push(objeto)
            }
            else{
                const resultado = lista.find( (elemento,index) => {
                    if(elemento.tipo === e.type.name){
                        lista[index].cuenta +=1
                    return true
                    } 
                })
                if (!resultado) {
                    let objeto ={
                        tipo: e.type.name,
                        cuenta: 1
                    }
                    lista.push(objeto)
                }
            }
        })
    }
    lista.forEach( el => {
        eje_x.push(el.tipo)
        eje_y.push(el.cuenta)
})

    const datos = {
        labels: eje_x,
        datasets: [{
            label: 'Tipos de Pokemon',
            data: eje_y,
                        backgroundColor: [
                'rgba( 30, 132, 73,   0.5)',
                'rgba(106, 90, 205,   0.5)',
                'rgba(255, 0, 0,      0.5)',
                'rgba( 174, 214, 241, 0.5)',
                'rgba(0, 0, 255,      0.5)',
                'rgba(88, 214, 141,   0.5)',
                'rgba( 255, 255, 0 ,  0.5)',
                'rgba(255, 159, 64,   0.5)',
                'rgba(229, 152, 102,  0.5)',
                'rgba(238, 130, 238,  0.5)',
                'rgba(231, 76, 60,    0.5)',
                'rgba(236, 112, 99,   0.5)',
                'rgba( 211, 84, 0 ,   0.5)',
                'rgba( 36, 113, 163 , 0.5)',
                'rgba( 93, 173, 226 , 0.5)',
                'rgba( 142, 68, 173 , 0.5)',
                'rgba( 52, 152, 219 , 0.5)',
                'rgba( 86, 101, 115 , 0.5)',
            ],
            borderColor: [
                'rgba( 30, 132, 73,   1)',
                'rgba(106, 90, 205,   1)',
                'rgba(255, 0, 0,      1)',
                'rgba( 174, 214, 241, 1)',
                'rgba(0, 0, 255,      1)',
                'rgba(88, 214, 141,   1)',
                'rgba( 255, 255, 0 ,  1)',
                'rgba(255, 159, 64,   1)',
                'rgba(229, 152, 102,  1)',
                'rgba(238, 130, 238,  1)',
                'rgba(231, 76, 60,    1)',
                'rgba(236, 112, 99,   1)',
                'rgba( 211, 84, 0 ,   1)',
                'rgba( 36, 113, 163 , 1)',
                'rgba( 93, 173, 226 , 1)',
                'rgba( 142, 68, 173 , 1)',
                'rgba( 52, 152, 219 , 1)',
                'rgba( 86, 101, 115 , 1)',
            ],
            borderWidth: 1
        }]
    }
    const ctx = document.getElementById('myChart')
    const myChart = new Chart(ctx,{
        type: "bar",
        data: datos,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }}
    )
    const pas = document.getElementById('pastel')
    const pastel = new Chart(pas,{
        type: "pie",
        data: datos,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }}
    )
    hideLoading()
}

// const grafico = async () => {
//     await fetch(pokeapi())
//     const eje_x = []
//     const eje_y = []
//         lista.forEach( el => {
//         eje_x.push(el.tipo)
//         eje_y.push(el.cuenta)
// })

//     const datos = {
//         labels: eje_x,
//         datasets: [{
//             label: 'Tipos de Pokemon',
//             data: eje_y
//         }]
//     }
//     const ctx = document.getElementById('myChart')
//     const myChart = new Chart(ctx,{
//         type: "bar",
//         data: datos,
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }}
//     )
// }
pokeapi()
