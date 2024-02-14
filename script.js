// GSAP animations for the petals
TweenLite.set("#container", { perspective: 600 });

var total = 30;
var container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

for (var i = 0; i < total; i++) {
    var div = document.createElement('div');
    div.className = 'dot'; // Assign class 'dot' directly
    container.appendChild(div);
    animate(div);
}

function animate(elm) {
    var xStart = random(0, w);
    var yStart = random(-200, -150);
    var zStart = random(-200, 200);
    
    TweenLite.set(elm, { x: xStart, y: yStart, z: zStart });
    TweenMax.to(elm, random(6, 15), { y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15 });
    TweenMax.to(elm, random(4, 8), { x: xStart + 100, rotationZ: random(0, 180), repeat: -1, yoyo: true, ease: Sine.easeInOut });
    TweenMax.to(elm, random(2, 8), { rotationX: random(0, 360), rotationY: random(0, 360), repeat: -1, yoyo: true, ease: Sine.easeInOut, delay: -5 });
}

function random(min, max) {
    return min + Math.random() * (max - min);
}

document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('formContainer');
    const poemContainer = document.getElementById('poem');
    const generateBtn = document.getElementById('generateBtn');
    const backBtn = document.getElementById('backBtn');
    const container = document.getElementById("container");

    const poems = [
        `In a world so vast and wide,<br>
        A {adjective1} soul stands dignified.<br>
        With every step in {activity}, she finds,<br>
        A rhythm that with her heart aligns.<br><br>
    
        In the essence of what she loves, pure and true,<br>
        Unfolds a story, ever so new.<br>
        A {adjective2} spirit, a beacon so bright,<br>
        Illuminating the darkest night.<br><br>
    
        This poem is but a simple token,<br>
        Of words unspoken, yet deeply woven.<br>
        To celebrate her, in all her might,<br>
        For in her, the world finds its light.<br><br>`,
    
        `Beneath the sky so wide and blue,<br>
        A {adjective1} heart, so pure and true.<br>
        Engaged in {activity}, she shines so bright,<br>
        A radiant figure, in the soft moonlight.<br><br>
    
        Cherishing {loves}, with all her might,<br>
        Her {adjective2} laughter, a delightful sight.<br>
        This verse unfolds, a heartfelt flight,<br>
        In her embrace, everything feels right.<br><br>`,
    
        `Amidst the flowers, a delicate bloom,<br>
        {adjective1} and graceful, dispelling gloom.<br>
        Dance in the garden, her favorite place,<br>
        A moment of joy, a tender embrace.<br><br>
    
        With {activity}, she paints the sky,<br>
        A canvas of dreams, soaring high.<br>
        In her eyes, a spark so bright,<br>
        Guiding the way through the darkest night.<br><br>`,
    
        `Underneath the stars, a whispered plea,<br>
        {adjective1} whispers, set my spirit free.<br>
        Lost in {activity}, she finds her way,<br>
        Through trials and tribulations, come what may.<br><br>
    
        Wrapped in {loves}, her heart takes flight,<br>
        In the arms of love, everything feels right.<br>
        A {adjective2} soul, with wings unfurled,<br>
        Soaring through life, in a boundless world.<br><br>`
    ];

    const totalPoems = 4;
    let poemsGenerated = 0;


    
    let modalDisplayed = false; // Flag to track if the modal has been displayed

    function generatePoem() {
        const adjective1 = document.getElementById('adjective1').value.trim();
        const activity = document.getElementById('activity').value.trim();
        const loves = document.getElementById('loves').value.trim();
        const adjective2 = document.getElementById('adjective2').value.trim();
    
        if (!adjective1 || !activity || !loves || !adjective2) {
            alert("Please fill in all fields to generate your poem.");
            return;
        }
    
        // Randomly select a poem template
        const poemTemplate = poems[Math.floor(Math.random() * poems.length)];
    
        // Replace placeholders with user input
        const poemText = poemTemplate
            .replace(/{adjective1}/g, adjective1)
            .replace(/{activity}/g, activity)
            .replace(/{loves}/g, loves)
            .replace(/{adjective2}/g, adjective2);
    
        // Create a new div for the poem and append it
        const poemDiv = document.createElement('div');
        poemDiv.innerHTML = poemText;
        poemDiv.className = 'poem'; // Use this class for styling if needed
        poemContainer.appendChild(poemDiv);
    
        // Optionally, scroll to the new poem
        poemDiv.scrollIntoView({ behavior: 'smooth' });
    
        // Increment the poems generated
        poemsGenerated++;
    
        // Update the heart counter text
        const heartCounter = document.getElementById('heart-counter');
        if (heartCounter) {
            const poemsGeneratedSpan = heartCounter.querySelector('.poems-generated');
            if (poemsGeneratedSpan) {
                poemsGeneratedSpan.textContent = poemsGenerated;
            }
        }
    
        // If all poems have been generated and modal not displayed, hide the counter and display modal after a delay
        if (poemsGenerated >= totalPoems && !modalDisplayed) {
            if (heartCounter) {
                heartCounter.style.display = 'none';
            }
            setTimeout(displayModal, 15000); // Delay for 2 seconds before showing modal
            modalDisplayed = true; // Set the flag to true to indicate modal has been displayed
        }
    
        // If it's not the first poem, add a swirl line before the new poem
        if (poemContainer.children.length > 0) {
            const swirlLine = document.createElement('div');
            swirlLine.className = 'swirl-line';
            poemContainer.appendChild(swirlLine);
        }
    
        // Reset the form for new inputs
        document.getElementById('madLibsForm').reset();
    
        // Show the poem container and petals if they were hidden
        formContainer.style.display = 'none';
        poemContainer.style.display = 'block';
        backBtn.style.display = 'block';
        container.style.display = 'block'; // Show the container for petals
    }
    
    

    function displayModal() {
        backBtn.style.display = 'none';
        // Remove existing poems
        poemContainer.innerHTML = '';
    
        // Create message element
        const message = document.createElement('p');
        message.textContent = "Happy Valentine's, Love Ishan! Dinner is on me!";
    
        // Append message to the poem container
        poemContainer.appendChild(message);

        // Delay the page refresh by 5 seconds
        setTimeout(function() {
            window.location.reload();
        }, 5000);

    }
    

    generateBtn.addEventListener('click', generatePoem);

    backBtn.addEventListener('click', function () {
        formContainer.style.display = 'block';
        poemContainer.style.display = 'none';
        backBtn.style.display = 'none';
        container.style.display = 'none';
    });
});
