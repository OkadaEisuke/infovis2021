class BarChart1 {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            cscale: config.cscale
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;


        self.line = d3.line()
            .x(d1 => self.xscale(d1.day))
            .y(d1 => self.yscale(d1.adult))

        self.xscale = d3.scaleBand()
            .domain(self.data.map(d1 => d1.day))
            .range([0, self.inner_width])
            .paddingInner(0.5)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d1=> d1.adult)])
            // .domain([0,7000])
            .range([self.inner_height,0]);

        self.xaxis = d3.axisBottom(self.xscale)
            // .ticks()
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            // .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px')
            // .attr('transform', `rotate(-90)`)
            .attr('x', self.config.width / 2)
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            // .attr('writing-mode', 'tb')
            .text( self.config.xlabel );

        const ylabel_space = 60;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'start')
            .attr('dy', '1em')
            // .attr('writing-mode', 'tb')
            .text( self.config.ylabel );
    }

    update() {
        let self = this;
        self.dataset = d3.rollup(self.data, v => v, d => d.station)
        console.log(self.data)
        console.log(self.dataset)

        // const data_map = d3.rollup( self.data, v => v.length, d1 => d1.station );
        // self.aggregated_data = Array.from( data_map, ([key,count]) => ({key,count}) );


        // self.cvalue = d1 => d1.station;
        // self.xvalue = d1 => d1.key;
        // self.yvalue = d1 => d1.count;

        // const items = self.aggregated_data.map( self.xvalue );
        // self.xscale.domain(items);

        // const ymin = 0;
        // const ymax = d3.max( self.aggregated_data, self.yvalue );
        // self.yscale.domain([ymin, ymax]);
        // self.yscale.domain([0, d3.max(self.data, d1 => d.number)])



        // const ymin = d3.min( self.data, d => d.number );
        // const ymax = d3.max( self.data, d => d.number );

        self.render();
    }

    render() {
        let self = this;

        self.chart.append("path")
            .attr('d',self.line(self.data))
            .attr('stroke','red')
            .attr('fill','none')
            
        
            
            // .on('click', function(ev,d) {
            //     const is_active = filter.includes(d.key);
            //     if ( is_active ) {
            //         filter = filter.filter( f => f !== d.key );
            //     }
            //     else {
            //         filter.push( d.key );
            //     }
            //     Filter();
            //     d3.select(this).classed('active', !is_active);
            // });

        

        self.xaxis_group
            .call(self.xaxis)
            .selectAll("text")
            .style('font-size', '6px')
            .attr("transform","rotate(45)")
            .attr("text-anchor","start")

        self.yaxis_group
            .call(self.yaxis);
    }
}
