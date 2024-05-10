<script>
  import data from "./data/acquired.json";
  import { timeParse, timeFormat } from "d3-time-format";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { extent} from "d3-array";
  import Tooltip from "/components/Tooltip.svelte";
  import Steps from "/components/Steps.svelte";
  import { fade } from "svelte/transition";
  import AxisX from "/components/AxisX.svelte";
  import AxisY from "/components/AxisY.svelte";

  data.forEach((d) => {
    d.Date = timeParse("%Y-%m-%d")(d.Date);
    d.Date = new Date(d.Date);
    d.Downloads = +d.Downloads;
  });

  const margin ={
    top: 20,
    right: 20,
    bottom: 20,
    left:50
  }

  $: width = 550;
  $: innerWidth = width - margin.left - margin.right;

  let height = 550;
  let innerHeight = height - margin.top - margin.bottom;
  
  $: minX = data[0].Date;
  $: maxX = data[data.length - 1].Date;
  $: extentY = extent(data, (d) => d.Downloads);

  $: xScale = scaleTime()
    .domain([minX, maxX])
    .range([0,innerWidth]);
  
  $: yScale = scaleLinear()
    .domain([0, extentY[1]])
    .range([innerHeight, 0]);

  let initialData = data;

  console.log(initialData);

  let renderedData = [
  {
    "Date": "2019-12-30",
    "Episode": "Pixar",
    "Downloads": 300000,
    "Callouts": "",
    "LabelsOrNot": "Y",
    "Labels": "Pixar",
    "LabelsGroup": ""
  }]

  console.log(renderedData);

  let calloutData = [
  {
    "Date": "2019-12-30",
    "Episode": "Pixar",
    "Downloads": 300000,
    "Callouts": "",
    "LabelsOrNot": "Y",
    "Labels": "Pixar",
    "LabelsGroup": ""
  }];

  let hoveredData;
  let labelData = initialData.filter(d => d.LabelsOrNot === 'Y');

  console.log(labelData)

  var formatTime_xaxis = timeFormat("%Y");

  $: xTicks = xScale.ticks(8);
  $: yTicks = yScale.ticks(8);

  let currentStep;

  $:X_MIDPOINT = new Date((minX. getTime() + maxX. getTime()) / 2);
  $:Y_MIDPOINT = (yScale.domain()[0] + yScale.domain()[1]) / 2;

  $: {
    if(currentStep === 0){
      renderedData = initialData.map((d) => ({...d,Date:X_MIDPOINT,Downloads:Y_MIDPOINT}));
      calloutData = calloutData.map((d) => ({...d,Date:X_MIDPOINT,Downloads:Y_MIDPOINT}));
      hoveredData = null;
    }
    if(currentStep === 1){
      renderedData = initialData.map((d) => ({...d,Downloads:Y_MIDPOINT}));
      calloutData = calloutData.map((d) => ({...d,Downloads:Y_MIDPOINT}));
      hoveredData = null;
    }
    if(currentStep === 2){
      renderedData = initialData.filter(d => d.Downloads != '');
      calloutData = initialData;
    }
    if(currentStep === 3){
      renderedData = initialData.filter(d => d.Downloads != '');
      calloutData = initialData.filter(d => d.Callouts === 'A');
    }
    if(currentStep === 4){
      renderedData = initialData.filter(d => d.Downloads != '');
      calloutData = initialData.filter(d => d.Callouts === 'B');
    }
    if(currentStep === 5){
      renderedData = initialData.filter(d => d.Downloads != '');
      calloutData = initialData.filter(d => d.Callouts === 'D');
    }
    if(currentStep === 6){
      renderedData = initialData.filter(d => d.Downloads != '');
      calloutData = initialData.filter(d => d.LabelsOrNot === 'Y');
    }
    if(currentStep === 7){
      renderedData = initialData.filter(d => d.Downloads != '');
      calloutData = initialData.filter(d => d.LabelsOrNot === 'Y');
    }
  }

</script>

<main>
<section>
<div class="sticky">
<div class="chart-container" bind:clientWidth={width}>
  <h1>Acquired episodes</h1>
  <svg {width} {height} on:mouseleave={()=>{hoveredData = null;}}>
    {#if currentStep > 0}
    <AxisX {xScale} {xTicks} {margin} {formatTime_xaxis} height = {innerHeight}/>
    {/if}
    {#if currentStep > 1}
    <AxisY  {yTicks} {yScale} {width} {margin}/>
    {/if}
    <g transform="translate({margin.left} {margin.top})">
    {#each renderedData as d}
    <circle
      class="circle-bg"
      cx={xScale(d.Date)}
      cy={yScale(d.Downloads)}
      r={hoveredData===d ? 10 : currentStep == 0 ? 15 : 5}
      opacity={0.70}
      stroke="black"
      stroke-width={hoveredData===d ? 1 : 0}
      fill={currentStep < 3 ? "#FAA224" : "lightgrey"}
      on:mouseover={()=>{
        width < 400 ? null : currentStep > 1 ? hoveredData = d : null;
        }}
      on:focus={()=>{
        width < 400 ? null : currentStep > 1 ? hoveredData = d : null;
        }}
      tabindex="0"
      role="tab"
      aria-roledescription="circle"
    />
  {/each}
    {#each calloutData as d}
    <circle
      class="circle-callout"
      cx={xScale(d.Date)}
      cy={yScale(d.Downloads)}
      r={currentStep < 6 || hoveredData === d ? 10 : 5}
      opacity=0.96
      fill={currentStep < 3 ? "none" : currentStep > 5 ? "#FAA224" : d.LabelsGroup == 'B' ? "#AC8FBE" : d.LabelsGroup == 'N' ? "#DFC462": "#FAA224"}
      on:mouseover={()=>{
        currentStep > 0 ? hoveredData = d : null;
        }}
      on:focus={()=>{
        currentStep > 0 ? hoveredData = d : null;
        }}
      tabindex="0"
      role="tab"
      aria-roledescription="circle"
    />
  {/each}
  {#if currentStep == 6 || currentStep == 7}
   {#each labelData as d}
    <text
    transition:fade={{ delay: 250, duration: 300 }}
    class="text-lables"
    x={xScale(d.Date) + d.XNudge}
    y={yScale(d.Downloads) + d.YNudge}
    >
    {d.Labels}
    </text>
   {/each}
  {/if}
  </g>
  </svg>
  {#if hoveredData && width > 400}
  <Tooltip data={hoveredData} {xScale} {yScale} width = {innerWidth}/>
  {/if}
  <!-- {#if currentStep == 6} -->
<!-- <p class="footnote">Note: Data as of May 3. Downloads data are not available for episodes released from Nov. 2015 to Oct. 2017.
   Episodes within the past 180 days are projected downloads.
   The Porsche episode does not include YouTube data.
<br>Source: Acquired's analysis of data from Transistor, Libsyn, Spotify and YouTube</p> -->
<!-- {/if} -->
</div>
</div>
<Steps bind:currentStep/>
</section>
</main>

<style>
    :global(.tick text, .axis-title){
      fill: #666;
      text-anchor: start;
      font-family: RetinaNarrowLight,  sans-serif;
      font-size: 13px;
      line-height: 15.6px;
    }

    :global(.axis-title){
        line-height: 13px;
    }

  section {
  position: relative;
}
  main{
  max-width: 700px;
  margin:0 auto;
}
.chart-container{
  height:100%;
  width:100%;
  max-width: 700px;
  max-height: 550px;
}

.sticky {
  position: sticky;
  z-index: 1;
  height:90vh;
  top:5vh;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* the three lines above is how a parent center its children */
}
  .circle-bg {
    transition: r 300ms ease, opacity 500ms ease,
    cx 400ms ease, cy 400ms ease;
    cursor: pointer;
}

h1{     color: #333333;
        font-family: Retina, sans-serif;
        font-size: 15px;
        font-weight: 500;
        line-height: 20px;
        margin-bottom: 10px;
    }

.text-lables{
    color: #333333;
    font-family: Retina, sans-serif;
    font-size: 14px;
  }

/* .footnote{
    color: #727272;
    font-weight: 300;
    font-family: Retina, sans-serif;
    font-size: 13px;
    line-height: 17px;
    margin-top:10px;
    margin-bottom:15px;
  } */

</style>