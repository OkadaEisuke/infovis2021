let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://okadaeisuke.github.io/infovis2021/W12/pcr_positive_daily.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['setosa','versicolor','virginica']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 1024,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Sepal length [cm]',
            ylabel: 'Sepal width [cm]',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 1024,
            height: 1024,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Day',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
    }
    scatter_plot.update();
}
