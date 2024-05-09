<script>
    export let xScale;
    export let xTicks;
    export let height;
    export let margin;
    export let formatTime_xaxis;
    
    </script>
    
    <g class="axis x-axis">
        {#each xTicks as tick, i}
          <g class="tick tick-{tick}" transform="translate({xScale(tick) + margin.left},{margin.top})">
            <line x1="0" x2="0" y1="0" y2={height} stroke="#dcddde" stroke-width=1/>
            <text x=0 y={height} dx={i === 0 ? "-12" : "-8"} dy="20">{formatTime_xaxis(tick)==="2016" ? "20" :"’"}{formatTime_xaxis(tick).slice(-2)}</text>
          </g>
        {/each}
    </g>
    
    <style>
    
    </style>