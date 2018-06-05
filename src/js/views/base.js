// Add/update display text to a node
export const showDisplayText = (elementID, val) => {
    let displayTeam = document.getElementById(elementID);
    if (typeof val === "number") {
        displayTeam.value = val;
    } else if (typeof val === "string") {
        displayTeam.textContent = val;
    } else {
        console.log('Check the type of value to display.')
    }
};

// Update various parts of UI based on top tab selection
export const toggleTabs = (tab) => {
    if (tab === 'home') {
        var notTab = 'guest'
    } else {
        var notTab = 'home'
    }
    document.getElementById(`sb_period`).style.gridColumn = `sb-${notTab}-start / sb-${notTab}-end`;
    document.getElementById(`sb_period`).style.backgroundColor = `#BA5A31`;
    document.getElementById(`sb__to-tech--${tab}`).style.visibility = `visible`;
    document.getElementById(`sb__to-tech--${notTab}`).style.visibility = `hidden`;
    document.querySelector(`.container`).style.background = `linear-gradient(#E59F71, #889fb3 25%)`;
    document.getElementById(`sk`).classList.add(`sk--${tab}`);
    document.getElementById(`sk`).classList.remove(`sk--${notTab}`);
    document.getElementById(`sk__table--${tab}`).style.display = `block`;
    document.getElementById(`sk__table--${notTab}`).style.display = `none`;
};

