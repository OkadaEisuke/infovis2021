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

        self.line1 = d3.line()
            .x(d1 => self.xscale(d1.day))
            .y(d1 => self.yscale1(d1.company))

        self.xscale = d3.scaleBand()
            .domain(self.data.map(d1 => d1.day))
            .range([0, self.inner_width])
            .paddingInner(0.5)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d1=> d1.adult)])
            // .domain([0,7000])
            .range([self.inner_height,0]);

        console.log(d3.max(self.data, d1=> d1.adult))
        console.log(d3.max(self.data, d1=> d1.company))


        self.yscale1 = d3.scaleLinear()
            .domain([0, d3.max(self.data, d1=> d1.company)])
            // .domain([0,7000])
            .range([self.inner_height,0]);


        self.xaxis = d3.axisBottom(self.xscale)
            // .ticks()
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            // .ticks(5)
            .tickSizeOuter(0);

        self.yaxis1 = d3.axisRight(self.yscale1)

            // .ticks(5)
            .tickSizeOuter(0);


        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        self.yaxis_group1 = self.chart.append('g')
        .attr('transform',`translate( ${self.inner_width},0)`)

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
            .attr('stroke','blue')
            .attr('fill','none')
            
        self.chart.append("path")
            .attr('d',self.line1(self.data))
            .attr('stroke','red')
            .attr('fill','none')
         // console.log(self.data)   
        
            
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

        self.yaxis_group1
            .call(self.yaxis1);
    }
}
