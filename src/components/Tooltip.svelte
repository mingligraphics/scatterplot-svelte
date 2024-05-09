<script>
    export let data;
    export let xScale;
    export let yScale;
    export let width;
  
    let tooltipWidth;
    import { timeFormat } from "d3-time-format";

    var formatTime_tooltip = timeFormat("%b %d, %Y");
 
    $: console.log({width, tooltipWidth, x});
 
    $: x = xScale(data.Date);
    $: y = yScale(data.Downloads);
    
    const xNudge = 30;
    const yNudge = 30;
 
    $: xPosition = (tooltipWidth + x) > width ? (x - tooltipWidth - xNudge): (x + xNudge);
    $: yPosition = y + yNudge;
 
    import { fly } from 'svelte/transition';
 </script>
 
 <div bind:clientWidth={tooltipWidth}
 class="tooltip" 
 transition:fly
 style="left: {xPosition}px; top: {yPosition}px">
 <h1>{data.Episode}</h1>
 <h2>{formatTime_tooltip(data.Date)}</h2>
 <!-- <span>{data.Downloads.toLocaleString()} downloads</span> -->
 </div>
 
 <style>
     .tooltip {
        position: absolute;
        background: white;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.15);
        padding: 8px 6px;
        border-radius: 3px;
        pointer-events: none;
        font-family: RetinaLight, sans-serif;
        transition: top 300ms ease, left 300ms ease;
        opacity: 0.8;
     }
 
 h1 {
     font-size: 1rem;
     font-weight: 600;
     margin-bottom: 4px;
     width: 100%;
 }
 
 h2 {
     font-size: 0.8rem;
     font-weight: 500;
     text-transform: uppercase;
 }
 
 /* span {
     background: #EFEFF0;
     font-size: 90%;
     padding: 2px 4px;
     display: inline-block;
     vertical-align: bottom;
     border-radius: 3px;
     color: rgba(0, 0, 0, 0.7);
     font-weight: 700;
 } */
 </style>
 