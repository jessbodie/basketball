// Add/update display text to a node
export const showDisplayText = (elementID, text) => {
    var displayTeam = document.getElementById(elementID);
    displayTeam.textContent = text;
};

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
