let input_data;
let scatter_plot;
let bar_chart;
let bar_chart1;
let filter = [];



d3.csv("https://okadaeisuke.github.io/infovis2021/W12/pcr_positive_daily.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.number = +d.number;
            // d.sepal_width = +d.sepal_width;
        });

        d3.csv("https://okadaeisuke.github.io/infovis2021/W12/subwaydata.csv")
        .then( data =>{
            input_data1 = data;
            input_data1.forEach(d1 =>{
                d1.adult = +d1.adult;
                d1.company = +d1.company;
                d1.school = +d1.school;
                d1.children = +d1.children;

            });
        


        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['三宮','西神中央']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 300,
            height: 300,
            margin: {top:40, right:10, bottom:100, left:80},
            xlabel: '陽性者数[人]',
            ylabel: '乗降者数[人]',
            title: '陽性者と乗降者の散布図',
            cscale: color_scale
        }, input_data,input_data1 );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 700,
            height: 300,
            margin: {top:40, right:50, bottom:100, left:60},
            xlabel: 'Day',
            ylabel: '陽性者数[人]',
            title:'神戸市のコロナ陽性者数',
            cscale: color_scale
        }, input_data );
        bar_chart.update();

        bar_chart1 = new BarChart1( {
            parent: '#drawing_region_barchart1',
            width: 700,
            height: 300,
            margin: {top:30, right:50, bottom:100, left:60},
            xlabel: 'Day',
            ylabel: '乗降者数[人]',
            title: '神戸市営地下鉄三宮駅の乗降者数',
            cscale: color_scale
        }, input_data1 );
        bar_chart1.update();

        d3.select('#adultpeople')
            .on('click', d => {
            scatter_plot.update();
            });

        d3.select('#commuter')
            .on('click', d => {
            scatter_plot.update1();
            });



        })
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
