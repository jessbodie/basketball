
// Add/update display value of an input element
export const showFieldText = (elementID, amt) => {
    var displayTeam = document.getElementById(elementID);
    amt = parseInt(amt, 10);
    displayTeam.value = amt;
};

