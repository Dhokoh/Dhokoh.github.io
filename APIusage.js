// const { Chart } = require("chart.js");

//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

//Defining selection reference
let chart_selector = document.getElementById('q_input');

const render_chart = async (event_id_query, chart_holder) => {
    const API_global_url = await fetch(nasa_url_globalAPI);
    const extracted_data = await API_global_url.json();
    let NASA_events = extracted_data.events;
    NASA_events.forEach(NASA_events_element => {
        if (event_id_query === NASA_events_element.id){
            let NASA_API_geometry = NASA_events_element.geometry;
            let labels_x_axis = [];
            let labels_y_axis = [];
            NASA_API_geometry.forEach(geom_elem => {
                if (geom_elem.type === 'Point' && geom_elem.magnitudeValue === null){
                    console.warn('El dato que intenta acceder, carece de valores graficables, se mostrará únicamente un gráfico vacío titulado');
                }else{
                    labels_x_axis.push(geom_elem.date);
                    labels_y_axis.push(geom_elem.magnitudeValue);
                }
            })
            let chart = new Chart(chart_holder, {
                type: 'line',
                data: {
                    labels: labels_x_axis,
                    datasets: [{
                        label: NASA_events_element.title,
                        data: labels_y_axis,
                        backgroundColor: [
                            'rgba(220, 88, 77, 0.3)',
                            'rgba(255, 120, 70, 0.3)',
                        ]
                    }]
                }
            })
        }
    });
}



render_chart('EONET_5730', chart_canvas2);
render_chart('EONET_6289', chart_canvas1);
// render_chart('EONET_5387', chart_canvas3);

// let canvas_array = [chart_canvas1, chart_canvas2, chart_canvas3]
// console.log(canvas_array);
// const loadData = (event) => {
//     console.log(event.target.value); 
//     canvas_array.forEach(canvas => {
//         if (canvas.value != null){
//             canvas.clearRect(0,0,canvas.width, canvas.height);
//         }else{
//             render_chart(event.target.value, canvas);
//         }
//     });
// }

const populateSelection = () => {
    fetch(nasa_url_globalAPI)
    .then(api_response => api_response.json())
    .then(iterable_data => {
        let event_array = [];
        iterable_data.events.forEach(event_element => {
            let event_obj = {
                id: '',
                name: ''
            };
            event_obj.id = event_element.id;
            event_obj.name = event_element.title;
            event_array.push(event_obj);
        })
        //console.log(event_array);
        event_array.forEach(event_object => {
            console.log(event_object);
            chart_selector.innerHTML = chart_selector.innerHTML + `
            <option value = ${event_object.id}>${event_object.name}</option>`;
        });
    })
}
populateSelection();

//Defining query button's behaviour
// let q_input = document.getElementById('q_input')
// let q_button = document.getElementById('q_button');
// q_button.addEventListener('click', (chart_holder)=>{
//     if (chart_holder.value !== null){
//         console.warn('El contenedor que intenta usar ya está ocupado.')
//     }else{
        
//     }
// })



// const render_chart = async () => {
//     label_array_y_axis = [];
//     label_array_x_axis = [];
//     const APIreader = await fetch(nasa_url_HurricaneRosslyn);
//     const data = await APIreader.json();
//     let stormgeometry = data.geometry;
//     stormgeometry.forEach(elem_ => {
//         label_array_x_axis.push(elem_.date);
//         label_array_y_axis.push(elem_.magnitudeValue);
//     });
    
//     //Defining new chart to render
//     let storm_geometry_chart = new Chart(chart_canvas1, {
//         type: 'bar',
//         data: {
//             labels: label_array_x_axis,
//             datasets: [{
//                 label: data.title,
//                 data: label_array_y_axis,
//                 backgroundColor: [
//                     'rbga(10, 80, 35, 0.2)',
//                     'rbga(67, 90, 55, 0.2)',
//                     'rbga(21, 73, 35, 0.2)',
//                     'rbga(15, 97, 125, 0.2)',
//                     'rbga(25, 80, 150, 0.2)',
//                     'rbga(34, 73, 55, 0.2)',
//                     'rbga(23, 180, 135, 0.2)',
//                     'rbga(67, 125, 135, 0.2)',
//                     'rbga(34, 180, 135, 0.2)',
//                     'rbga(20, 210, 79, 0.2)',
//                     'rbga(77, 67, 44, 0.2)',
//                     'rbga(12, 210, 235, 0.2)',
//                     'rbga(55, 165, 35, 0.2)',
//                     'rbga(21, 100, 99, 0.2)'
//                 ]
//             }]
//         }
//     });
// }

//render_chart();
