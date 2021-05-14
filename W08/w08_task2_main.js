d3.csv("https://okadaeisuke.github.io/infovis2021/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.w = +d.w;});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:50, right:10, bottom:20, left:60}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:30, right:10, bottom:10, left:60}
        }
        this.data = data;
        this.init();
    }


    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.line = d3.line()
            .x(d => self.xscale(d.y))
            .y(d => self.yscale(d.w))
            //.curve(d3.curveNatural)

        


        self.xscale = d3.scaleLinear()
            //.domain([d3.min(data, d=>d.x),d3.max(data,d =>d.x)])
            //.domain([0, d3.max(self.data, d => d.w)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            //.domain([d3.min(data, d=>d.x),d3.max(data,d =>d.x)])
            //.domain(self.data.map(d => d.t))
            //.domain([0, d3.max(self.data, d => d.y)])
            .range( [ self.inner_height,0] )
            //.paddingInner(0.5);

        self.xaxis = d3.axisBottom( self.xscale )
            //.tickValues( data_set.filter( function(d,i){ return !(i % 2); }));
            .ticks(5)
            .tickSizeOuter(0);
            

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

        
        self.yaxis = d3.axisLeft( self.yscale )
            //.ticks(6)
            .tickSizeOuter(0);
            //.attr("transform","rotate(180,20,50)");

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0,0)`);

        
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
         //self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.xscale.domain( [0, ymax] );

        const wmin = d3.min( self.data, d => d.w );
        const wmax = d3.max( self.data, d => d.w );
        self.yscale.domain( [0, wmax] );

        self.render();
        //self.xlabel();
    }

    render() {
        let self = this;

        self.chart.append("path")
            .attr('d',self.line(self.data))
            .attr('stroke','black')
            .attr('fill','black')



        self.xaxis_group
            //.attr('transform', `translate(0, ${inner_height})`)
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis ); 


        }


    }