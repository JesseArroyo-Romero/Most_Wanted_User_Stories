"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  let newSearch;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
      case 'no':
        multiSearchYesNo = promptFor("Do you know want to search with multiple criteria?", yesNo).toLowerCase();
        if(multiSearchYesNo === 'yes'){
        searchMultiple = searchByCriteria(people);
        }
        else{
          switch(asdfasdf/*this will be the switch case for just one search criteria*/){
            case "":
            //
            break;
            case "":
            //
            break;
            case "":
            // 
            break;
            case "":
            // 
            break;
            case "":
            //
            break;
            case "quit":
            return; // stop execution
            default:
            return mainMenu(person, people); // ask again
        }
      }
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    alert(displayFamily(person, people));
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function searchByCriteria(people){
  let person = searchByGender(people)  
  person = searchByHeightAndWeight(person)
  person = searchByOccupation(person)
  console.log(people)
  console.log(person[0])
  mainMenu(person[0], people)
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid)

  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
  }
    else{
      return false
    }
})

return foundPerson
}



//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid)

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
  }
    else{
      return false
    }
})

return foundPerson
}

function searchByID(people, id = promptFor("What's is the person's ID?")){
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.id == id){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson[0]
}

function searchByParentID(person, people){
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.id == person.parents[0] || potentialMatch.id == person.parents[1]){
      return true
    }
    else {
      return false;
    }
  })
  return foundPerson
}


function searchByHeightAndWeight(people){
  let height = promptFor("What is the person's height? ", autoValid)
  let weight = promptFor("What is the person's weight? ", autoValid)

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.height == height && potentialMatch.weight == weight){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's job? ", autoValid)

  let foundPerson = people.filter(function(potentialMatch){
    if (potentialMatch.occupation == occupation){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}

function searchForSpouse(person, people){
  if (person.currentSpouse == null){
    return 'No Spouse';

  }
  else if(person.currentSpouse !== null ){
    let currentSpouse = searchByID(people, person.currentSpouse)
    currentSpouse = currentSpouse.firstName + ' ' + currentSpouse.lastName;
    return currentSpouse
  }
}

function searchForParents(person, people){              //Returns parents first and last name, trying to change it to return id of parents then run through search for siblings
  if(person.parents.length == 1){
    let parent = searchByID(people, person.parents[0]);
    parent = parent.firstName + ' ' + parent.lastName;
    return parent;
  }
  else if (person.parents.length == 2){
    let parent1 = searchByID(people, person.parents[0]);
    let parent2 = searchByID(people, person.parents[1]);
    let parents = parent1.firstName + ' ' + parent1.lastName +' '+ parent2.firstName + ' ' + parent2.lastName;
    return parents;
  }
  else{
    return 'No Parents'
  }
}



// function searchForKids(person,people){
//   // someone has them under parent ID
//   let kids = searchByParentID(people, person)
//   console.log(kids.length)
//   return 
// }

function searchForSiblings(person, people){
  let searchedPerson = person
  let siblingsName = []
  let bothParents = searchByParentID(person, people)
  let parent1 = bothParents[0];
  let parent2 = bothParents[1];
  let siblings;
  if (bothParents.length > 0){
    siblings = people.filter(function(potentialMatch){
      if (potentialMatch.parents[0] == parent1.id || potentialMatch.parents[1] == parent2.id){
        return true
      }
      else {
        return false
      }
    })
    }
    for (let i = 0; i < siblings.length; i++){
        siblingsName = siblings.reduce(function(searchedPerson){
        if (searchedPerson != siblings[i]){
        siblingsName = siblings[i].firstName + ' ' + siblings[i].lastName + ' '
        }
        
      })

    }
    return siblingsName
  }
  
  






//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "gender: " + person.gender + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "eyecolor: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  personInfo += "parents: " + person.parents + "\n";
  personInfo += "current spouse: " + person.currentSpouse + "\n";
 alert(personInfo);
}

//#endregion

//#region
//find the person that was passed through family members
function displayFamily(person, people){
  let spouse = searchForSpouse(person, people)
  let parents = searchForParents(person, people)
  let siblings = searchForSiblings(person, people)
  // let kids = searchForKids(person, people) 
  return spouse, parents, siblings
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}
app(data);
//#endregion