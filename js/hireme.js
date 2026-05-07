const hireBtn = document.querySelector('.btn');
let timeoutId;

hireBtn.addEventListener('click', () => {
    const email = "zennpoof@email.com"; 
    
    navigator.clipboard.writeText(email).then(() => {
        clearTimeout(timeoutId);

        // --- "Email Copied" State ---
        hireBtn.innerText = "Email Copied";
        hireBtn.style.backgroundColor = "#8B0000";
        hireBtn.style.color = "#080808";
        
        // ADD THIS LINE: Adjust spacing for "Email Copied"
        // You can change "0.1rem" to whatever fits best
        hireBtn.style.letterSpacing = "0.1rem"; 

        timeoutId = setTimeout(() => {
            // --- Reset to Original UI ---
            hireBtn.innerText = "Hire Me";
            hireBtn.style.backgroundColor = "#080808";
            hireBtn.style.color = "#8B0000";
            
            // RESET THIS LINE: Back to your original spacing
            hireBtn.style.letterSpacing = "0.1rem";
        }, 2000);
    });
});