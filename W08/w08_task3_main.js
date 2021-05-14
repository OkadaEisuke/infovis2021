d3.csv("https://okadaeisuke.github.io/infovis2021/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; d.w = +d.w;});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            //radius: Math.min( config.width, config.height ) / 2,
            margin: {top:50, right:10, bottom:20, left:60}
        };

        const scatter_plot = new ScatterPlot( config, data );
        //scatter_plot.update();
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
            radius: config.radius || Math.min( config.width, config.height ) / 2,
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
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        self. pie = d3.pie()
            .value( d => d.w );


        self.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(self.config.radius);

        self.text = d3.arc()
            .outerRadius(self.config.radius)
            .innerRadius(self.config.radius);


         self.render();   

        }


    render(){
         let self = this;

          var a= self.chart.selectAll(".pie")
            .data(self.pie(self.data))
            .enter()
            .append("g")
            .attr("class","pie")

          
            a.append("path")
            .attr('d',self.arc)
            .attr('stroke','white')
            .attr('fill',d => d.data.c)
            .style('stroke-width', '2px')

            a.append("text")
            .attr("fill","black")
            .attr("transform",function(d){return "translate(" + self.arc.centroid(d) + ")";})
            //.attr('transform', `translate(0, 0)`)
            //.attr("font-family","sans-serif")
            //.attr("dy","5px")
            //.attr("font-size","10px")
            
            //.attr("text-anchor","middle")
            .text(d => d.data.t)
       
        


    }
}