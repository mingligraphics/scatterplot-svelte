<script>
    export let currentStep;
    import Scrolly from "../helpers/Scrolly.svelte";

    $: steps = [
    // 0 
    `<p>Ben Gilbert and David Rosenthal released the first episode of their podcast 
      <span style="background-color:#FDC57C;padding:3.5px;margin:1px;border-radius:4px;font-weight:500">Acquired</span> 
      in October 2015.</p>`,
    `Since then, the show has released more than 150 episodes about many of the world’s most valuable companies.`,
    // 2 
    `Their audience keeps growing. That first episode about Pixar had 400 downloads in the six months after it was released. Today’s episodes get more than 400,000. `,
    // 3 
    `<p>One key episode in the history of Acquired was a show about <span style="background-color:#FDC57C;padding:3.5px;margin:1px;border-radius:4px;font-weight:500">Tesla</span>. It was their first episode that cracked two hours. Now their shows break three and four hours.</p>`,
    // 4 
    `Acquired also released definitive three-part series on <span style="background-color:#DDD6EB;padding:3.5px;margin:1px;border-radius:4px;font-weight:500">Berkshire Hathaway</span>
     and <span style="background-color:#F5E6A8;padding:3.5px;margin:1px;border-radius:4px;font-weight:500">Nvidia</span>
     —and then interviews with Charlie Munger and Jensen Huang. `,
    // 5 
    `After focusing on tech, media and entertainment companies, Gilbert and Rosenthal told the story of luxury giant <span style="background-color:#FDC57C;padding:3px;margin:1px;border-radius:4px;font-weight:500">LVMH</span>. It turned out to be the most popular Acquired episode at that time. `,
    // 6
    `Their audience keeps growing. That first episode about Pixar had a few hundred downloads in the six months after it was released. Today’s episodes get more than 500,000.`,
    `Note: Data as of May 3. Downloads data are not available for episodes released from Nov. 2015 to Oct. 2017. Episodes within the past 180 days are projected downloads. The Porsche episode does not include YouTube data.
<br>Source: Acquired's analysis of data from Transistor, Libsyn, Spotify and YouTube`
  ];
</script>
<div class="steps">
    <Scrolly bind:value={currentStep}>
      {#each steps as text, i}
      <div class="step" class:active={currentStep === i}>
        <div class="step-content">
          {@html text}
        </div>
      </div>
      {/each}
    </Scrolly>
  </div>

  <style>
    .step {
    height: 90vh;
    opacity: 0.3;
    transition: opacity 300ms ease;

/* vertically and horizontally center the steps */
    display: flex;
    justify-content: center;
    place-items: center;

}

.step-content {
  position: relative;
  box-sizing: border-box;
  z-index: 1;
  -webkit-transform: translate3d(0, 0, 0); /*for safari z-index issue*/
  height: auto;
  width: 100%;
  max-width: 700px; 
  margin: 0 auto;
  font-family: RetinaLight, sans-serif;
  font-size: 17px;
  line-height: 27px;
  font-weight: 400;
  color: #333;
  padding: 20px 25px 20px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, .4);
  overflow: visible;
  background-color: rgba(255, 255, 255, .9);
}

.step.active {
  opacity: 1;
}

.steps {
  position: relative;
  z-index: 2;
  pointer-events: none;
}

/* mark{
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 4px;
  padding-right: 4px;
  margin-right: 1px;
  margin-left: 1px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 500;
  text-shadow: none;
} */
  </style>