document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What is Your Name?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unkown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

// Add Order Css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  //   Add Click event
  block.addEventListener("click", function () {
    // Trigger the Flip Block function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  //   Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  //  If there two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    // Check Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No clicking on Main container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // Remove Class No Clicking After the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Shuffle Function
function shuffle(array) {
  // Setting vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random number
    random = Math.floor(Math.random() * current);

    current--;
    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }

  return array;
}
