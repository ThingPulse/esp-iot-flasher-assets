const fs = require('fs');
const crypto = require('crypto');

// Function to generate MD5 hash
const generateMD5 = (filePath) => {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(data).digest('hex');
};

// Load JSON data
const dataFilePath = './assets/defaultDeviceConfiguration.json'; // Specify the path to your JSON file
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Iterate over each element in the array and each partition to update the MD5 hash
data.forEach(item => {
    item.partitions.forEach(partition => {
        const filePath = partition.url;
        if (fs.existsSync(filePath)) {
            const md5Hash = generateMD5(filePath);
            partition.md5 = md5Hash;
        } else {
            console.error(`File not found: ${filePath}`);
        }
    });
});

// Save the updated JSON data back to the file
fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

console.log('JSON data updated successfully.');
