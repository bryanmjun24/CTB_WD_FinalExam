// Global array to store valid packages
let packages = [];

function validatePackageData(recipientName, packageId, deliveryAddress, weight) {
    // Validate recipientName: only alphabetic characters allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(recipientName)) {
        return "Error: Recipient Name must contain only alphabetic characters.";
    }

    // Validate Package ID: must be numeric
    if (!Number.isInteger(Number(packageId))) {
        return "Error: Invalid Package ID. Please enter numeric values only.";
    }

    // Validate Delivery Address: cannot contain digits
    const addressRegex = /^[A-Za-z\s,]+$/;
    if (!addressRegex.test(deliveryAddress)) {
        return "Error: Invalid Delivery Address. It should not contain digits.";
    }

    // Validate weight: must be a positive number
    if (isNaN(weight) || weight <= 0) {
        return "Error: Invalid Weight. Please enter a positive number.";
    }

    return null; // No errors
}

// Function to generate the tracking code
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
}

// Sorting function: Sort by weight (lightest to heaviest)
function sortPackages() {
    packages.sort((a, b) => a.weight - b.weight);
    displayPackages();
}

// Display packages in the table
function displayPackages() {
    const tableBody = document.querySelector("#packageTable tbody");
    tableBody.innerHTML = ""; // Clear existing table rows

    packages.forEach(pkg => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pkg.recipientName}</td>
            <td>${pkg.packageId}</td>
            <td>${pkg.deliveryAddress}</td>
            <td>${pkg.weight}</td>
            <td>${pkg.trackingCode}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle form submission
document.getElementById("packageForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect input values
    const recipientName = document.getElementById("recipientName").value;
    const packageId = document.getElementById("packageId").value;
    const deliveryAddress = document.getElementById("deliveryAddress").value;
    const weight = parseFloat(document.getElementById("weight").value);

    // Validate the input data
    const errorMessage = validatePackageData(recipientName, packageId, deliveryAddress, weight);
    if (errorMessage) {
        document.getElementById("errorMessages").innerText = errorMessage;
        return; // Do not proceed if there's an error
    }

    // Create package object
    const packageObj = {
        recipientName,
        packageId: parseInt(packageId, 10),
        deliveryAddress,
        weight,
        trackingCode: generateTrackingCode(parseInt(packageId, 10), weight)
    };

    // Add to packages array
    packages.push(packageObj);

    // Clear the form
    document.getElementById("packageForm").reset();

    // Display success message
    document.getElementById("errorMessages").innerText = "Package added successfully!";

    // Sort and display packages
    sortPackages();
});
