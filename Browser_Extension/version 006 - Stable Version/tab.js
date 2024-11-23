document.getElementById('generateQueries').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const resultsElement = document.getElementById('results');

    try {
        const jsonData = JSON.parse(jsonInput);
        const queriesWithResults = generateJmespathQueries(jsonData);

        let resultsText = '';
        queriesWithResults.forEach((item, index) => {
            const { path, value } = item;
            resultsText += `${index + 1}. ${path} = ${JSON.stringify(value, null, 2)}\n\n`;
        });

        resultsElement.textContent = resultsText;
    } catch (error) {
        resultsElement.textContent = `Error parsing JSON: ${error.message}`;
    }
});

document.getElementById('beautifyJson').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const resultsElement = document.getElementById('results');

    try {
        const jsonData = JSON.parse(jsonInput);
        const beautifiedJson = JSON.stringify(jsonData, null, 2);

        resultsElement.textContent = beautifiedJson;
    } catch (error) {
        resultsElement.textContent = `Error parsing JSON: ${error.message}`;
    }
});

function generateJmespathQueries(jsonData, currentPath = '') {
    let queriesWithResults = [];

    if (Array.isArray(jsonData)) {
        jsonData.forEach((item, index) => {
            const newPath = `${currentPath}[${index}]`;
            queriesWithResults = queriesWithResults.concat(generateJmespathQueries(item, newPath));
        });
    } else if (typeof jsonData === 'object' && jsonData !== null) {
        Object.keys(jsonData).forEach(key => {
            const newPath = currentPath ? `${currentPath}.${key}` : key;
            queriesWithResults = queriesWithResults.concat(generateJmespathQueries(jsonData[key], newPath));
        });
    } else {
        queriesWithResults.push({ path: currentPath, value: jsonData });
    }

    return queriesWithResults;
}

document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById('themeToggle');
    
    // Check if the user has a mode preference saved in localStorage
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerText = 'Switch to Light Mode';
    } else {
        document.body.classList.add('light-mode');
        darkModeToggle.innerText = 'Switch to Dark Mode';
    }

    // Event listener for the toggle button
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Check the current mode and update button text and localStorage
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerText = 'Switch to Light Mode';
            localStorage.setItem('mode', 'dark');
        } else {
            darkModeToggle.innerText = 'Switch to Dark Mode';
            localStorage.setItem('mode', 'light');
        }
    });
});
