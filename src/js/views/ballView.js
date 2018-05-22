
// Add/update display value of an input element
export const showFieldText = (elementID, amt) => {
    var displayTeam = document.getElementById(elementID);
    amt = parseInt(amt, 10);
    displayTeam.value = amt;
};


// Update various parts of UI based on top tab selection
export const toggleTabs = (tab) => {
    if (tab === "home") {
        document.getElementById("sb_period").style.gridColumn = "sb-guest-start / sb-guest-end";
        document.getElementById("sb_period").style.backgroundColor = "#BA5A31";
        document.getElementById("sb__to-tech--home").style.visibility = "visible";
        document.getElementById("sb__to-tech--guest").style.visibility = "hidden";
        document.querySelector(".container").style.background = "linear-gradient(#E59F71, #889fb3 25%)";
        document.getElementById("sk").classList.add("sk--home");
        document.getElementById("sk").classList.remove("sk--guest");
        document.getElementById("sk__table--home").style.display = "block";
        document.getElementById("sk__table--guest").style.display = "none";

    } else if (tab === "guest") {
        document.getElementById("sb_period").style.gridColumn = "sb-home-start / sb-home-end";
        document.getElementById("sb_period").style.backgroundColor = "#889fb3";
        document.getElementById("sb__to-tech--guest").style.visibility = "visible";
        document.getElementById("sb__to-tech--home").style.visibility = "hidden";
        document.querySelector(".container").style.background = "linear-gradient(#dbe2e8, #BA5A31 25%)";
        document.getElementById("sk").classList.add("sk--guest");
        document.getElementById("sk").classList.remove("sk--home");
        document.getElementById("sk__table--guest").style.display = "block";
        document.getElementById("sk__table--home").style.display = "none";
    }
};

// Remove animation of Score Keeping rows 
export const removeSKAnimation = () => {
    var allPlayerRows = document.querySelectorAll(".sk__player");
    for (let i = 0; i < allPlayerRows.length; i++) {
        allPlayerRows[i].classList.remove("sk__player--animate");
    }
};

// Prevent splash animations from showing if page previously loaded
export const splashAnimation = () => {
    var loadedBefore = sessionStorage.getItem("loaded");
    if (!loadedBefore) {
        // Clear flag (loadedBefore) and reset to true for 
        // future page loads
        sessionStorage.clear();
        sessionStorage.setItem("loaded", "true");
    } else if (loadedBefore === "true") {
        // Remove Splash basketball animation
        document.getElementById("splash__ball").setAttribute("style", "display: none");
        // Remove Splash title animation
        document.getElementById("splash__title").classList.remove("splash__title--anim");

        // Remove container for splash animations so layers underneath can be accessed
        document.getElementById("splash__anim").setAttribute("style", "display: none");

        // Remove table row animation
        UIController.removeSKAnimation();
    }
};
