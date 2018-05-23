
// Add row for each player
export const addPlayerRow = (teamToggle, teamID, playerID, first, last, num) => {

    // Set display name for roster column
    var firstInitial = first.substring(0, 1);
    var displayName = last + ", " + firstInitial + ".";

    // Define ID appended to all fields in each row
    var id = teamID + "-" + playerID;

    // HOME - Display the row in the table, with IDs for elements
    var table=document.getElementById("sk__table--"+teamToggle);
    var table_len=(table.rows.length);
    var row = table.insertRow(table_len).outerHTML="<tr class='sk__player sk__player--animate' id='"+id+"'><td class='sk__player--name' id='name-"+id+"'></td><td class='sk__player--number' id='num-"+id+"'></td><td class='sk__player--edit'><form ><input type='number' id='"+id+"-fg-in' name ='' value='' class='field-edit'><input type='button' id='"+id+"-fg-btn' name ='' value='+' class='btn-edit'/></form></td><td class='sk__player--edit'><form ><input type='number' id='"+id+"-3p-in' name ='' value='' class='field-edit'><input type='button' id='"+id+"-3p-btn' name ='' value='+' class='btn-edit'/></form></td><td class='sk__player--edit'><form ><input type='number' id='"+id+"-fs-in' name ='' value='' class='field-edit'><input type='button' id='"+id+"-fs-btn' name ='' value='+' class='btn-edit'/></form></td><td class='sk__player--edit'><form ><input type='number' id='"+id+"-pf-in' name ='' value=' ' class='field-edit'><input type='button' id='"+id+"-pf-btn' name ='' value='+' class='btn-edit'/></form></td></tr>";
    // Display player name and number
    document.getElementById("name-"+id).textContent = displayName;
    document.getElementById("num-"+id).textContent = num;
};

// Update Scoreboard elements with team-specific IDs
export const updateSBIDs = (team, teamID) => {
    document.getElementById(`-${team}-to-in`).id = teamID + "-home-to-in";
    document.getElementById(`-${team}-to-btn`).id = teamID + "-home-to-btn";
    document.getElementById(`-${team}-tech-in`).id = teamID + "-home-tech-in";
    document.getElementById(`-${team}-tech-btn`).id = teamID + "-home-tech-btn";
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
        removeSKAnimation(); // TODO TEST IF THIS WORKS
    }
};
