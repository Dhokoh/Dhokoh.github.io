
//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

const create_chart_labels = async () => {
    label_array_y_axis = [];
    label_array_x_axis = [];
    const APIreader = await fetch(nasa_url_HurricaneRosslyn);//faltabapunto y coma aqui equizde
    const data = await APIreader.json();
    console.log(data);
    let stormgeometry = data.geometry;
    stormgeometry.forEach(elem_ => {
        console.log(elem_.date);
        label_array_x_axis.push(elem_.date);
        console.log(label_array_x_axis);
        console.log(elem_.magnitudeValue);
        label_array_y_axis.push(elem_.magnitudeValue);
        console.log(label_array_y_axis);
    });
    
    //Defining new chart to render
    let storm_geometry_chart = new Chart(chart_canvas1, {
        type: 'line',
        data: {
            labels: label_array_x_axis,
            datasets: [{
                label: data.title,
                data: label_array_y_axis,
                backgroundColor: [
                    'rbga(255, 80, 35, 0.2)',
                    'rbga(67, 90, 55, 0.2)',
                    'rbga(210, 73, 35, 0.2)',
                    'rbga(175, 97, 125, 0.2)',
                    'rbga(225, 80, 150, 0.2)',
                    'rbga(134, 73, 55, 0.2)',
                    'rbga(223, 180, 135, 0.2)',
                    'rbga(67, 125, 135, 0.2)',
                    'rbga(134, 180, 135, 0.2)',
                    'rbga(200, 210, 79, 0.2)',
                    'rbga(177, 67, 44, 0.2)',
                    'rbga(120, 210, 235, 0.2)',
                    'rbga(255, 165, 35, 0.2)',
                    'rbga(201, 100, 99, 0.2)'
                ]
            }]
        }
    });
}

create_chart_labels();