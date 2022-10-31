//Defining the NASA API link and storing it
let nasa_url_globalAPI = 'https://eonet.gsfc.nasa.gov/api/v3/events';
let nasa_url_HurricaneRosslyn = 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6285';

//Defining chart canvas
let chart_canvas1 = document.getElementById('chartf1');
let chart_canvas2 = document.getElementById('chartf2');
let chart_canvas3 = document.getElementById('chartf3');

const readAPI_createLabels = async () => {
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
    return label_array_y_axis;
}

readAPI_createLabels();