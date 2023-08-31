// Function for building the table
function build_truth_table(elements, proposition) {
  // Get the element from the document
  elem = document.getElementById("table_build")
  // Create a string for adding purposes
  html = `<table id="table_build">\n`
  html += "<tr>"
  rows = ""
  // For each element in the elements
  elements.forEach(element => {
    // Create a row for each elements with its proposition
    html += `\n<th scope="col">`+ element + "</th>"
  })
  html += `\n<th scope="col">`+ proposition + "</th>"

  html += "</tr>"
  // Calculate the number of columns needed for the truth table 2**n 
  // Loop for each columns
  for (var i = (Math.pow(2, elements.length) - 1) ; i >= 0 ; i--) {
    let prop = ""
    html += "<tr>"
    // Loop for each row and calculate its value
    for (var j = 0; j < elements.length ; j++) {
      prop += 'var '+elements[j]+'='+((i & Math.pow(2,j)) ? false:true)+'; '
      html += `\n<td scope="col">`+ ((i & Math.pow(2,j)) ? false:true) + "</td>"
    }
    // End the row so html understand us
    html += `\n<td scope="col">`+ Boolean(eval(prop+check_if_prop(proposition))) + "</td>"
    html += "</tr>"
  }
  // End the table
  html += "</table>"
  // Assign the values to the innerHTML(document)
  elem.innerHTML = html

}
// Function for cleaning the propositions
function check_if_prop(propositions) {
  // Check if contains if or ',' and replace it so the the computer understand us
  propositions = propositions.toLowerCase().replaceAll("if", "!").replaceAll(",", "|");
  return propositions

}
// Another function for cleaning
function clean_prop(propositions) {
  // Array with all the operations needed
  const array = ["!", "&&", "|", "^", "&", " ", "(", ")"]

  //  Loop inside the array
  for (var i = 0; i < array.length; i++){
    // Replace every operator with an empty sapce
    propositions = propositions.replaceAll(array[i], " ")
  }
  // Split the propositions to get rid of the empty spaces
  propositions = propositions.split(" ")
  // Filter every element in the propositions array and get rid of the empty spaces
  propositions = propositions.filter(item => item !== " " ? item : item)
  
  return Array.from(new Set(propositions))
}

// Create a listener for an input
document.addEventListener('input', function(e){
  // Get the element from the document
  elem  = document.getElementById("truth_table")
  try {
    // Evaluate the user propositions
    eval(check_if_prop(elem.value))
    elem.style.color = "green"
  }
  catch(err) {
    // If there's an error we will show the user red text
    if (err instanceof ReferenceError) {
      elem.style.color = "green"
      return
    }
    elem.style.color = "red"
  }

  })

// Create a listener for a keypress
document.addEventListener('keypress', function(e){
  // Get the element from the document
  elem  = document.getElementById("truth_table")
  // Assign the value to a propositions
  let propositions = elem.value
  // Check if the user pressed Enter Key
  if (e.code.includes("Enter")) {
    if (!propositions) {
      return
    }
    // Evaluate the user propositions
    try {
      eval(check_if_prop(propositions))
      elem.style.color = "green"
      // Calling our function for building the truth table
      build_truth_table(clean_prop(check_if_prop(propositions)), propositions)
    
    }
    // If there's an error we will show the user red text + big alert
    catch(err) {
      if (err instanceof ReferenceError) {
        elem.style.color = "green"
        build_truth_table(clean_prop(check_if_prop(propositions)), propositions)
        return

      }
      elem.style.color = "red"
      alert("Wrong proposition")
    }
  
  }

  })

// Built by love by Mohammed Alqurashi