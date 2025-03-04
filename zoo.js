// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Zoo Management System Loaded');

  try {
      // Declaring variables for different animal species
      const elephants = 4;
      const tigers = 2;
      const pandas = 3;

      console.log("Number of Elephants:", elephants);
      console.log("Number of Tigers:", tigers);
      console.log("Number of Pandas:", pandas);

      // Calculate total number of animals in the zoo
      const totalAnimals = elephants + tigers + pandas;
      console.log("Total number of animals in the zoo:", totalAnimals);

      let zooOpen = true;
      zooOpen = !zooOpen;
      console.log("Is the zoo open?", zooOpen ? "Yes" : "No");

      // Step 1: Create an array to store animal objects
      let animals = [];
      let visitorCount = parseInt(localStorage.getItem("visitorCount")) || 0;
      let zooStatus = 'Open';

      // Step 2: Initialize animal data
      animals.push({ id: 1, name: 'Ellie', species: 'Elephant', count: 3, gender: 'Female', status: 'Open', health: 'Healthy' });
      animals.push({ id: 2, name: 'Tony', species: 'Tiger', count: 2, gender: 'Male', status: 'Closed', health: 'Sick' });
      animals.push({ id: 3, name: 'Panda', species: 'Panda', count: 4, gender: 'Male', status: 'Open', health: 'Healthy' });
      animals.push({ id: 4, name: 'Leo', species: 'Lion', count: 5, gender: 'Male', status: 'Open', health: 'Healthy' });

      console.table(animals); // Debugging: Check correct initialization

      /**
       * Function to safely update text content of an element
       * Prevents crashes by checking if the element exists before modifying it
       */
      function safelyUpdateElementText(id, text) {
          try {
              const element = document.getElementById(id);
              if (!element) throw new Error(`Element with ID "${id}" not found.`);
              element.textContent = text;
          } catch (error) {
              console.warn(error.message);
          }
      }

      /**
         * Function to update visitor count and persist it
         */
      function updateVisitorCount(change) {
        try {
            visitorCount += change;
            if (visitorCount < 0) visitorCount = 0;

            localStorage.setItem("visitorCount", visitorCount);
            safelyUpdateElementText("visitorCounter", `Visitors: ${visitorCount}`);
            console.log(`Visitor count updated: ${visitorCount}`);
        } catch (error) {
            console.error("Error updating visitor count:", error);
            alert("An error occurred while updating the visitor count.");
        }
    }
      // Ensure visitor count is displayed on page load
      safelyUpdateElementText("visitorCounter", `Visitors: ${visitorCount}`);

    /**
     * Function to display animals dynamically
     */
    function displayAnimals() {
      try {
        const container = document.getElementById('animalContainer');
        if (!container) throw new Error('Animal container element not found.');
  
        // Efficiently clear previous elements
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
  
        animals.forEach(animal => {
          const card = document.createElement('div');
          card.classList.add('animal-card');
  
          // Safe text setting using textContent
          const nameElement = document.createElement('h3');
          nameElement.textContent = `${animal.name} (${animal.species})`;
          card.appendChild(nameElement);
  
          const statusElement = document.createElement('p');
          statusElement.textContent = "Status: ";
          const statusText = document.createElement('span');
          statusText.id = `status-${animal.id}`;
          statusText.textContent = animal.status;
          statusElement.appendChild(statusText);
          card.appendChild(statusElement);
  
          const healthElement = document.createElement('p');
          healthElement.textContent = "Health: ";
          const healthText = document.createElement('span');
          healthText.id = `health-${animal.id}`;
          healthText.textContent = animal.health;
          healthElement.appendChild(healthText);
          card.appendChild(healthElement);
  
          const toggleButton = document.createElement('button');
          toggleButton.textContent = "Toggle Status";
          toggleButton.onclick = () => window.toggleStatus(animal.id);
          card.appendChild(toggleButton);
  
          const updateHealthButton = document.createElement('button');
          updateHealthButton.textContent = "Update Health";
          updateHealthButton.onclick = () => window.updateHealth(animal.id);
          card.appendChild(updateHealthButton);
  
          container.appendChild(card);
        });
        safelyUpdateElementText("visitorCounter", `Visitors: ${localStorage.getItem("visitorCount") || 0}`);
      } catch (error) {
        console.error('Error displaying animals:', error);
        alert('An error occurred while loading the zoo data.');
      }
    }

    // Ensure animals are displayed on page load
    displayAnimals();
      

    /**
    * Function to toggle an animal's open/closed status
    */
    window.toggleStatus = (id) => {
      try {
        const animal = animals.find(a => a.id === id);
        if (!animal) throw new Error(`Animal with ID ${id} not found.`);

        animal.status = (animal.status === 'Open') ? 'Closed' : 'Open';
        safelyUpdateElementText(`status-${id}`, animal.status);
        console.log(`Animal ID ${id} status toggled: ${animal.status}`);
      } catch (error) {
        console.error("Error toggling animal status:", error);
      }
    };

    /**
    * Function to toggle an animal's health status
    */
    window.updateHealth = (id) => {  // ✅ Now accessible globally
      try {
        const animal = animals.find(a => a.id === id);
        if (!animal) throw new Error(`Animal with ID ${id} not found.`);

        animal.health = (animal.health === 'Healthy') ? 'Sick' : 'Healthy';
        safelyUpdateElementText(`health-${id}`, animal.health);
        console.log(`Animal ID ${id} health updated: ${animal.health}`);
      } catch (error) {
        console.error("Error updating animal health:", error);
      }
    };

    /**
    * Function to toggle the overall zoo status
    */
    window.toggleZooStatus = () => {
      try {
        zooStatus = (zooStatus === 'Open') ? 'Closed' : 'Open';
       localStorage.setItem("zooStatus", zooStatus);

        animals.forEach(animal => animal.status = zooStatus);

        safelyUpdateElementText("zooStatus", `Zoo Status: ${zooStatus}`);
        console.log(`Zoo status updated: ${zooStatus}`);

        displayAnimals();
      } catch (error) {
        console.error('Error toggling zoo status:', error);
        alert('Failed to update zoo status.');
      }
    };

    /**
     * Function to display zoo statistics
     */
    window.displayZooStatistics = () => {
      try {
        const totalAnimals = animals.length;
        const openAnimals = animals.filter(animal => animal.status === 'Open').length;
        const closedAnimals = animals.filter(animal => animal.status === 'Closed').length;

        console.log("Zoo Statistics:");
        console.log(`Total Animals: ${totalAnimals}`);
        console.log(`Open Animals: ${openAnimals}`);
        console.log(`Closed Animals: ${closedAnimals}`);
        console.log(`Current Visitor Count: ${visitorCount}`);
        alert(`Zoo Statistics:\nTotal Animals: ${totalAnimals}\nOpen Animals: ${openAnimals}\nClosed Animals: ${closedAnimals}\nVisitor Count: ${visitorCount}`);
      } catch (error) {
        console.error("Error displaying zoo statistics:", error);
      }
    };

    /**
    * Function to populate the animal dropdown in the booking form
    */
    function populateAnimalDropdown() {
      const animalDropdown = document.getElementById("animal");
       try {

      if (!animalDropdown) {
          throw new Error("Animal dropdown not found. Check your HTML.");
      }

      console.log("Populating animal dropdown...");

      // Clear previous options to avoid duplication
      animalDropdown.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- Select an Animal --";
      animalDropdown.appendChild(defaultOption);

      if (animals.length === 0) {
        console.warn("No animals found. Dropdown will be empty.");
      } else {
          animals.forEach(animal => {
            const option = document.createElement("option");
            option.value = animal.name;
            option.textContent = `${animal.name} (${animal.species})`;
            animalDropdown.appendChild(option);
        });

        console.log("Dropdown populated successfully.");
      }
      } catch (error) {
        console.error("Error populating animal dropdown:", error);
      }
    }
    populateAnimalDropdown();

    /**
    * Handle Membership Registration Form
    */
    function membershipForm(){
      const membershipForm = document.getElementById("membershipForm");
      if (membershipForm) {
        membershipForm.addEventListener("submit", function (event) {
          event.preventDefault();
          try {
            const memberData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            membershipType: document.getElementById("membershipType").value,
            startDate: document.getElementById("startDate").value,
            emergencyContact: document.getElementById("emergencyContact").value.trim()
          };

          if (!memberData.name || !memberData.email || !memberData.startDate || !memberData.emergencyContact) {
            throw new Error("Please fill in all required fields.");
          }

          let members = JSON.parse(localStorage.getItem("members")) || [];
          members.push(memberData);
          localStorage.setItem("members", JSON.stringify(members));

          alert("Membership registration successful!");
                updateVisitorCount(1);
                membershipForm.reset();
          } catch (error) {
            console.error("Error processing membership registration:", error);
              alert(error.message);
          }
        });
      }
    }
    membershipForm();

    /**
    * Function to handle booking form submission
    */
    function bookingForm() {
      const bookingForm = document.getElementById("bookingForm");

      if (!bookingForm) {
        console.error("Booking form not found. Check your HTML.");
        return;
      }

      bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        try {
          const visitorName = document.getElementById("visitorName").value.trim();
          const contact = document.getElementById("contact").value.trim();
          const selectedAnimal = document.getElementById("animal").value;
          const dateTime = document.getElementById("dateTime").value;
          const groupSize = parseInt(document.getElementById("groupSize").value, 10);// Ensure integer parsing.

          // Validate user input
          if (!visitorName || !contact || !selectedAnimal || !dateTime || groupSize < 1) {
            throw new Error("Please fill in all required fields.");
          }

          // Store booking in localStorage
          let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
          bookings.push({ visitorName, contact, selectedAnimal, dateTime, groupSize });
          localStorage.setItem("bookings", JSON.stringify(bookings));

          alert("Booking confirmed!");
          updateVisitorCount(groupSize); // Increase visitor count
          bookingForm.reset();
          } catch (error) {
            console.error("Error processing booking:", error);
            alert(error.message);
          }
      });
    }
    bookingForm(); // ✅ Ensure booking form handles visitor updates
  } catch (error) {
      console.error("Critical Error: Unable to initialize Zoo Management System.", error);
      alert("A serious error occurred. Please reload the page.");
  }
});