class BarChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            ylabel: config.ylabel || '',
            title: config.title || '',
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



        self.xscale = d3.scaleBand()
            .domain(self.data.map(d => d.day))
            .range([0, self.inner_width])
            .paddingInner(0.5)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.number)])
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

        
        self.svg.append('text')
            .style('font-size', '18px')
            // .attr('transform', `rotate(-90)`)
            .attr('x', self.config.width / 2-self.config.margin.right-50)
            .attr('y', self.config.margin.top/2)
            // .attr('writing-mode', 'tb')
            .text( self.config.title );
    }

    update() {
        let self = this;

        // const data_map = d3.rollup( self.data, v => v.length, d => d.day );
        // self.aggregated_data = Array.from( data_map, ([key,count]) => ({key,count}) );

        // self.cvalue = d => d.key;
        // self.xvalue = d => d.key;
        // self.yvalue = d => d.count;

        // const items = self.aggregated_data.map( self.xvalue );
        // self.xscale.domain(items);

        // const ymin = 0;
        // const ymax = d3.max( self.aggregated_data, self.yvalue );
        // self.yscale.domain([ymin, ymax]);
        // self.yscale.domain([0, d3.max(self.data, d => d.number)])



        // const ymin = d3.min( self.data, d => d.number );
        // const ymax = d3.max( self.data, d => d.number );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            // .join("rect")
            // .attr("class", "bar")
            // .attr("x", d => self.xscale( self.xvalue(d) ) )
            .enter()
            .append("rect")
            .attr("x", d => self.xscale(d.day))
            .attr("y", d => self.yscale(d.number))
            // .attr("y",0)
            .attr("width", self.xscale.bandwidth())
            // .attr("height", d => self.inner_height - self.yscale( self.yvalue(d) ))
            .attr("height",d => self.inner_height-self.yscale(d.number))
            // .attr("fill", d => self.config.cscale( self.cvalue(d) ))
            .attr("fill","black")
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
