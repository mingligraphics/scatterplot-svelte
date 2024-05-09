<script>
    export let yScale;
    export let yTicks;
    export let width;
    export let margin;
    
</script>
    
<g class="axis y-axis">
  {#each yTicks as tick, i}
   <g
    class="tick tick-{tick}"
    transform="translate(0 {yScale(tick)})">
    <line 
    x1={0} 
    y1={margin.bottom}
    x2={width} 
    y2={margin.bottom}
    stroke={i === 0 ? "#8f8f8f" : "#e5e7eb"}/>
    <text x={i === 0 ? 30 : 0} y={margin.bottom - 5}>{tick.toLocaleString()}{i == 5 ? " downloads" : ""}</text>
  </g>
  {/each}
</g>
        
<style>
        
</style>