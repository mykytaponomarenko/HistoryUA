// script.js

// Function to retrieve data from the Writers table
function fetchWritersData() {
    return new Promise((resolve, reject) => {
        // Open a connection to the database
        const db = new SQL.Database(); // Create a new SQLite database instance
        db.open('persons.db', SQL.OPEN_READONLY, (err) => {
            if (err) {
                reject(err);
                return;
            }

            // Query to select all data from the Writers table
            const query = "SELECT * FROM Writers";

            // Execute the query
            const resultSet = db.exec(query);

            // Close the database connection
            db.close();

            // Resolve with the result set
            resolve(resultSet);
        });
    });
}

// Function to generate timeline bars based on the writers data
function generateTimelineBars() {
    // Fetch data from the Writers table
    fetchWritersData()
        .then((resultSet) => {
            // Extract rows from the result set
            const rows = resultSet[0].values;

            // Get the timeline container
            const timelineContainer = document.getElementById('timeline');

            // Loop through the rows and generate timeline bars
            rows.forEach((row) => {
                const id = row[0];
                const name = row[1];
                const birthYear = row[2];
                const deathYear = row[3];
                const photoPath = row[4];

                // Calculate the position and length of the timeline bar
                const startPosition = ((birthYear - 1800) / (1950 - 1800)) * 100; // Calculate percentage
                const barLength = ((deathYear - birthYear) / (1950 - 1800)) * 100; // Calculate percentage

                // Create a timeline bar element
                const timelineBar = document.createElement('div');
                timelineBar.className = 'timeline-bar';
                timelineBar.style.left = `${startPosition}%`;
                timelineBar.style.width = `${barLength}%`;
                timelineBar.textContent = name;

                // Append the timeline bar to the timeline container
                timelineContainer.appendChild(timelineBar);
            });
        })
        .catch((err) => {
            console.error('Error fetching data:', err);
        });
}

// Call the function to generate timeline bars when the DOM content is loaded
document.addEventListener('DOMContentLoaded', generateTimelineBars);
