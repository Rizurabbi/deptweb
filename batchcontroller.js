// backend/controllers/batchController.js

const database = require('../database');

// Controller function to insert batch data
exports.insertBatchData = (req, res) => {
    const { startingDate, currentWeek } = req.body;

    database.query('INSERT INTO batches (starting_date, current_week) VALUES (?, ?)', [startingDate, currentWeek], (error, results) => {
        if (error) {
            console.error('Error inserting batch data:', error);
            res.status(500).json({ error: 'An error occurred while inserting batch data' });
            return;
        }

        console.log('Batch data inserted successfully');
        res.sendStatus(200);
    });
};

// Controller function to upload routine and update live item
exports.uploadRoutine = (req, res) => {
    // Process the uploaded routine file (Excel file)
    // You can use libraries like 'xlsx' or 'exceljs' to parse the Excel file

    // For demonstration purposes, let's assume the routine is parsed and available in an array called 'routineItems'
    const routineItems = [
        { time: '08:00 AM', item: 'Topic A' },
        { time: '09:00 AM', item: 'Topic B' },
        { time: '10:00 AM', item: 'Topic C' },
        // Add more routine items as needed
    ];

    // Get the current time in HH:MM format
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    // Find the routine item corresponding to the current time
    const liveItem = routineItems.find(item => item.time === currentTime);

    if (!liveItem) {
        console.error('No live item found for the current time');
        res.status(404).json({ error: 'No live item found for the current time' });
        return;
    }

    // Update 'live_item' column in 'batches' table
    database.query('UPDATE batches SET live_item = ?', [liveItem.item], (error, results) => {
        if (error) {
            console.error('Error updating live item:', error);
            res.status(500).json({ error: 'An error occurred while updating live item' });
            return;
        }

        console.log('Live item updated successfully');
        res.sendStatus(200);
    });
};
