const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Path to leaders.json file
const filePath = path.join(__dirname, 'llm', 'leaders.json');

// POST route for adding a new leader (sign up)
app.post('/api/leaders', (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Received sign-up data:", req.body);

  // Check if leaders.json exists
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: 'Failed to read file' });
      }

      const leaders = JSON.parse(data);

      // Check if email already exists
      const existingLeader = leaders.find((leader) => leader.email === email);
      if (existingLeader) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Add the new leader
      const newLeader = { name, email, password, role };
      leaders.push(newLeader);

      // Write updated leaders array to the file
      fs.writeFile(filePath, JSON.stringify(leaders, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).json({ error: 'Failed to write to file' });
        }
        res.status(200).json({ message: 'Sign up successful' });
      });
    });
  } else {
    console.error("Leaders file not found");
    res.status(500).json({ error: 'Leaders file does not exist' });
  }
});

// POST route for submitting leader form data
app.post('/api/leader-submit', (req, res) => {
  const { email, formData } = req.body;

  console.log("Received form data for email:", email);

  // Check if leaders.json exists
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: 'Failed to read file' });
      }

      const leaders = JSON.parse(data);

      // Find leader by email
      const leaderIndex = leaders.findIndex((leader) => leader.email === email);
      if (leaderIndex === -1) {
        console.error("Leader not found for email:", email);
        return res.status(404).json({ error: 'Leader not found' });
      }

      // Update leader's data with the form submission
      leaders[leaderIndex] = {
        ...leaders[leaderIndex],
        ...formData,
      };

      // Write updated leaders array back to the file
      fs.writeFile(filePath, JSON.stringify(leaders, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).json({ error: 'Failed to write to file' });
        }
        res.status(200).json({ message: 'Form submitted successfully' });
      });
    });
  } else {
    console.error("Leaders file not found");
    res.status(500).json({ error: 'Leaders file does not exist' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
