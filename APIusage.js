
//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');



const render_chart = async () => {
    label_array_y_axis = [];
    label_array_x_axis = [];
    const APIreader = await fetch(nasa_url_HurricaneRosslyn);
    const data = await APIreader.json();
    let stormgeometry = data.geometry;
    stormgeometry.forEach(elem_ => {
        label_array_x_axis.push(elem_.date);
        label_array_y_axis.push(elem_.magnitudeValue);
    });
    
    //Defining new chart to render
    let storm_geometry_chart = new Chart(chart_canvas1, {
        type: 'bar',
        data: {
            labels: label_array_x_axis,
            datasets: [{
                label: data.title,
                data: label_array_y_axis,
                backgroundColor: [
                    'rbga(10, 80, 35, 0.2)',
                    'rbga(67, 90, 55, 0.2)',
                    'rbga(21, 73, 35, 0.2)',
                    'rbga(15, 97, 125, 0.2)',
                    'rbga(25, 80, 150, 0.2)',
                    'rbga(34, 73, 55, 0.2)',
                    'rbga(23, 180, 135, 0.2)',
                    'rbga(67, 125, 135, 0.2)',
                    'rbga(34, 180, 135, 0.2)',
                    'rbga(20, 210, 79, 0.2)',
                    'rbga(77, 67, 44, 0.2)',
                    'rbga(12, 210, 235, 0.2)',
                    'rbga(55, 165, 35, 0.2)',
                    'rbga(21, 100, 99, 0.2)'
                ]
            }]
        }
    });
}

render_chart();