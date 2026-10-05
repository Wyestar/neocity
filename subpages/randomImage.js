const randomImageNodeString = `<div>
	<div>
		<p><a href="/">return to the nexus</a></p>
		<p>click the button to see a different random image</p>
		<div>
			<button id="randomImageBtn">button</button>
		</div>
	</div>
	<div>
		<img id="randomImageNode" src="" alt="random image node"/>
	</div>

 	<script>
  	  // x = 300-800
  		// y = 150-600
  		const randomX = () => {
      		const minX = 300
      		const maxX = 800
      		return (Math.floor(Math.random() * (maxX - minX + 1) + minX)).toString();
  		}

  		const randomY = () => {
  		  const minY = 150
      		const maxY = 600
      		return (Math.floor(Math.random() * (maxY - minY + 1) + minY)).toString();
  		}

  		const createRandomImageUrl = () => {
      // console.log("updating RI in create")

  		  // return "https://picsum.photos/"+randomX()+"/"+randomY();
        return "https://picsum.photos/400/300";
  		}

  		const updateRandomImageNode = () => {
  		  console.log("updating RI node")
        const randomImageUrl = createRandomImageUrl();
  		  const randomImageNode = document.getElementById("randomImageNode")
        if (randomImageNode) {
          randomImageNode.src = randomImageUrl;
        }
  		}

  		const randomImageBtn = document.getElementById("randomImageBtn");

      if (randomImageBtn) {
      		randomImageBtn.addEventListener("click", updateRandomImageNode)
      }
      console.log("updating RI in script")

  		updateRandomImageNode()
    </script>
</div>
`;

const randomImageNode = document.createElement(randomImageNodeString);
export default { randomImageNode }
