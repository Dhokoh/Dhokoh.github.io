// const { Chart } = require("chart.js");

//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

//Defining natural event selection reference
let chart_selector = document.getElementById('q_input');

//Defining canvas selection reference
let canvas_selector = document.getElementById('canvas_selector');

const render_chart = async (event_id_query, chart_holder) => {
    const API_global_url = await fetch(nasa_url_globalAPI);
    const extracted_data = await API_global_url.json();
    let NASA_events = extracted_data.events;
    NASA_events.forEach(NASA_events_element => {
        if (event_id_query === NASA_events_element.id) {
            let NASA_API_geometry = NASA_events_element.geometry;
            let labels_x_axis = [];
            let labels_y_axis = [];
            NASA_API_geometry.forEach(geom_elem => {
                if (geom_elem.type === 'Point' && geom_elem.magnitudeValue === null) {
                    console.warn('El dato que intenta acceder, carece de valores graficables, se mostrará únicamente un gráfico vacío titulado');
                } else {
                    labels_x_axis.push(geom_elem.date);
                    labels_y_axis.push(geom_elem.magnitudeValue);
                }
            })
            let chart = new Chart(chart_holder, {
                type: 'bar',
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
            event_array.forEach(event_object => {
                chart_selector.innerHTML = chart_selector.innerHTML + `
            <option value = ${event_object.id}>${event_object.name}</option>`;
            });
        })
}

//Defining query button's 
let canvases = [chart_canvas1, chart_canvas2, chart_canvas3];

const draw_chart_action = () => {

}

const is_empty_canvas = (canvas) => {
    const empty_canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    if (canvas.toDataURL() === empty_canvas.toDataURL()){
        return true;
    }else{
        return false;
    }
}


populateSelection();
draw_chart_action();
//render_chart('EONET_6295', chart_canvas2);
// render_chart('EONET_6289', chart_canvas1);
console.log(is_empty_canvas(chart_canvas2));