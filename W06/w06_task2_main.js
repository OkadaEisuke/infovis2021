d3.csv("https://okadaeisuke.github.io/infovis2021/W04/w04_task1.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:50, right:10, bottom:20, left:50}
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
            height: config.height || 256,
            margin: config.margin || {top:30, right:10, bottom:10, left:10}
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

        self.xscale = d3.scaleLinear()
            //.domain([d3.min(data, d=>d.x),d3.max(data,d =>d.x)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            //.domain([d3.min(data, d=>d.x),d3.max(data,d =>d.x)])
            .range( [ self.inner_height,0] );

        self.xaxis = d3.axisBottom( self.xscale )
            //.tickValues( data_set.filter( function(d,i){ return !(i % 2); }));
            .ticks(6);
            

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

        self.xaxis_group.append("text")
            .text("Xlabel")
            .attr("x",self.inner_width/2)
            .attr("y",50)
            .attr("font-family","sans-serif")
            .attr("font-size","10pt")
            .attr("fill","black");


        self.xaxis_group.append("text")
            .text("title")
            .attr("x",self.inner_width/2)
            .attr("y",-200)
            .attr("font-family","sans-serif")
            .attr("font-size","20pt")
            .attr("fill","black");


            
        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6)
            //.attr("transform","rotate(180,20,50)");

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0,0)`)
            //.attr('transform', "rotate(10)");   

        self.yaxis_group.append("text")
            .text("Ylabel")
            .attr("x",-10)
            .attr("y",self.inner_height/2)
            .attr("font-family","sans-serif")
            .attr("font-size","10pt")
            .attr("fill","black");
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [0, ymax] );

        self.render();
        //self.xlabel();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r )
            .attr("fill",d => d.c);

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis ); 


    }

    
}
