
//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

const create_labels_Y_axis = async () => {
    label_array_y_axis = [];
    const APIreader = await fetch(nasa_url_HurricaneRosslyn)
    const data = await APIreader.json();
    console.log(data);
    let stormgeometry = data.geometry;
    stormgeometry.forEach(elem_Y => {
        console.log(elem_Y.magnitudeValue);
        label_array_y_axis.push(elem_Y.magnitudeValue);
    });
    return label_array_y_axis;
}

const create_labels_X_axis = async () => {
    label_array_x_axis = [];
    const APIreader = await fetch(nasa_url_HurricaneRosslyn);
    const data = await APIreader.json();
    console.log(data);
    let stormgeometry = data.geometry;
    stormgeometry.forEach(elem_X => {
        console.log(elem_X.date);
        label_array_x_axis.push(elem_X);
    })
    return label_array_x_axis;
}

console.log(create_labels_X_axis());
console.log(create_labels_Y_axis());