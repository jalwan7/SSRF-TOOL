// Function to animate the button visibility
function animateButtons() {
  const buttons = document.querySelectorAll('#controls button');
  buttons.forEach((button, index) => {
    setTimeout(() => {
      button.classList.add('animate__animated', 'animate__fadeIn');
    }, index * 100);
  });
}

// Function to copy logs to the clipboard
function copyLogs() {
  const logsContainer = document.getElementById('logs');
  const logsText = logsContainer.innerText;

  // Create a temporary textarea to copy text
  const textarea = document.createElement('textarea');
  textarea.value = logsText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // Show custom popup
  showPopup('Logs copied to clipboard!');
}

// Copy logs button event listener
const copyLogsButton = document.getElementById('copyLogs');
copyLogsButton.addEventListener('click', () => {
  copyLogs();
});

// Auto Refresh Interval ID
let autoRefreshIntervalId;

// Previous log entry for auto-refresh comparison
let previousAutoRefreshLog = '';

// Toggle Auto Refresh
function toggleAutoRefresh() {
  const autoRefreshButton = document.getElementById('autoRefreshToggle');
  if (autoRefreshButton.classList.contains('active')) {
    clearInterval(autoRefreshIntervalId);
    autoRefreshButton.textContent = 'Auto Refresh: OFF';
  } else {
    autoRefreshIntervalId = setInterval(() => {
      // Simulate log entry on auto-refresh only if there's a significant change
      const currentLog = `Auto Refreshed Log: ${new Date().toLocaleString()}`;
      if (currentLog !== previousAutoRefreshLog) {
        addLogEntry(currentLog);
        previousAutoRefreshLog = currentLog;
      }
    }, 5000); // Auto-refresh every 5 seconds (adjust as needed)
    autoRefreshButton.textContent = 'Auto Refresh: ON';
  }
  autoRefreshButton.classList.toggle('active');
}

// Auto Refresh button event listener
const autoRefreshButton = document.getElementById('autoRefreshToggle');
autoRefreshButton.addEventListener('click', toggleAutoRefresh);

// Animate buttons on page load
animateButtons();

// ... (Your existing JavaScript code remains unchanged)
// Function to add a log entry
function addLogEntry(log) {
  const logsContainer = document.getElementById('logs');
  const logEntry = document.createElement('p');
  logEntry.textContent = log;
  logsContainer.insertBefore(logEntry, logsContainer.firstChild);

  // Limit to maximum 10 logs
  if (logsContainer.children.length > 10) {
    logsContainer.lastChild.remove();
  }

  saveLogsToLocalStorage();
}

// Function to clear logs
function clearLogs() {
  const logsContainer = document.getElementById('logs');
  logsContainer.innerHTML = '';
  saveLogsToLocalStorage();

  // Broadcast message to all clients to clear logs
  broadcastClearLogs();
}

// Function to download logs as a text file
function downloadLogs() {
  const logsContainer = document.getElementById('logs');
  const logsText = logsContainer.innerText;
  const blob = new Blob([logsText], { type: 'text/plain' });

  // Create a temporary anchor element
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'logs.txt';
  downloadLink.click();
}

// Function to save logs to local storage
function saveLogsToLocalStorage() {
  const logsContainer = document.getElementById('logs');
  const logsText = logsContainer.innerHTML;
  localStorage.setItem('logs', logsText);
}

// Retrieve logs from local storage on page load
function retrieveLogsFromLocalStorage() {
  const logsContainer = document.getElementById('logs');
  const logsText = localStorage.getItem('logs');
  logsContainer.innerHTML = logsText || '';
}

// Function to get the visitor's real IP address
async function getVisitorIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to retrieve the visitor\'s IP address:', error);
    return 'Unknown';
  }
}

// Function to generate a random status code for demonstration purposes
function getRandomStatusCode() {
  const statusCodes = [200, 301, 404, 500];
  const randomIndex = Math.floor(Math.random() * statusCodes.length);
  return statusCodes[randomIndex];
}

// Logging the visit
function logVisit() {
  getVisitorIP().then((visitorIP) => {
    const log = `Status Code: ${getRandomStatusCode()} | Timestamp: ${new Date().toLocaleString()} | Sender IP: ${visitorIP} | Referrer IP: ${getReferrerIP()}`;
    addLogEntry(log);
  });
}

// Function to get the referring IP address
function getReferrerIP() {
  // Replace this with your actual method of retrieving the referring IP address
  return '192.168.0.1';
}

// Broadcast message to all clients to clear logs
function broadcastClearLogs() {
  // Use your preferred method of clearing logs on all clients
  // This depends on your specific setup and cannot be implemented solely on the client-side
  console.log('Broadcasting message to clear logs on all clients');
}

// Clear logs button event listener
const clearLogsButton = document.getElementById('clearLogs');
clearLogsButton.addEventListener('click', () => {
  clearLogs();
});

// Download logs button event listener
const downloadLogsButton = document.getElementById('downloadLogs');
downloadLogsButton.addEventListener('click', () => {
  downloadLogs();
});

// Retrieve logs from local storage on page load
window.addEventListener('load', retrieveLogsFromLocalStorage);

// Log visit when the page is loaded
logVisit();
// Updated function to add a log entry with animation
function addLogEntry(log) {
  const logsContainer = document.getElementById('logs');
  const logEntry = document.createElement('li');
  logEntry.textContent = log;
  logEntry.classList.add('animate__animated', 'animate__fadeIn');
  logsContainer.insertBefore(logEntry, logsContainer.firstChild);

  // Limit to maximum 10 logs
  if (logsContainer.children.length > 10) {
    logsContainer.lastChild.remove();
  }

  // Check if log contains "IP" and show an alert
  if (log.includes('IP')) {
    showPopup('IP Log Detected!');
  }

  saveLogsToLocalStorage();
}

// Function to show a popup message
function showPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}
