const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Placeholder data for batch schedules
let batchSchedules = {
    batch18: { startingDate: "24/01/2024", currentWeek: "1" },
    batch19: { startingDate: "2/2/2024", currentWeek: "2" },
    batch20: { startingDate: "3/5/2024", currentWeek: "1" },
    batch21: { startingDate: "2/4/2024", currentWeek: "3" },
    batch22: { startingDate: "4/2/2024", currentWeek: "2" }
};

// Middleware to parse JSON bodies
app.use(express.json());

// Route to update batch schedules
app.post('/api/batch', (req, res) => {
    const { batch, startingDate } = req.body;

    // Update batch schedule
    if (batch in batchSchedules) {
        batchSchedules[batch].startingDate = startingDate;
        // Calculate current week based on the difference between starting date and today's date
        const startDate = new Date(startingDate);
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const currentWeek = Math.ceil(diffDays / 7);
        batchSchedules[batch].currentWeek = currentWeek.toString();
        res.status(200).json({ message: 'Batch schedule updated successfully' });
    } else {
        res.status(404).json({ error: 'Batch not found' });
    }
});

// Route to fetch batch schedules
app.get('/api/batch', (req, res) => {
    res.json(batchSchedules);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
