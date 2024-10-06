/**
Explanation
calculateAverage: Computes the average temperature from an array.
calculateStandardDeviation: Calculates the standard deviation based on the average.
detectHotspots: Identifies temperatures exceeding a specified threshold.
calculateTemperatureGradient: Computes temperature changes across the data points.
calculateRollingAverage: Calculates the rolling average using a specified window size.
calculateEMA: Computes the Exponential Moving Average for smoother trends.
calculateRateOfChange: Measures the change in temperature over time.

**/

/**
 * Calculate the highest temperature from an array.
 * @param {number[]} temperatures - An array of temperature readings.
 * @returns {number} - The highest temperature.
 */
export const calculateHighestTemperature = (temperatures) => {
    return Math.max(...temperatures);
};

/**
 * Calculate the average temperature from an array.
 * @param {number[]} temperatures - An array of temperature readings.
 * @returns {number} - The average temperature.
 */
export const calculateAverageTemperature = (temperatures) => {
    const total = temperatures.reduce((acc, temp) => acc + temp, 0);
    return total / temperatures.length;
};

/**
 * Calculate the lowest temperature from an array.
 * @param {number[]} temperatures - An array of temperature readings.
 * @returns {number} - The lowest temperature.
 */
export const calculateLowestTemperature = (temperatures) => {
    return Math.min(...temperatures);
};

/**
 * Parse the temperature data string into an array of numbers.
 * @param {string} dataString - The string representation of the temperature data.
 * @returns {number[]} - An array of temperature readings.
 */
export const parseTemperatureData = (dataString) => {
    return JSON.parse(dataString).map(Number);
};


//-----------------------------------------------------------------------------------------------------------------------

// Advanced temperature analysis functions

// Function to calculate standard deviation
export const calculateStandardDeviation = (temperatures, average) => {
    const variance = temperatures.reduce((a, b) => a + Math.pow(b - average, 2), 0) / temperatures.length;
    return Math.sqrt(variance);
};

// Function to detect hotspots
export const detectHotspots = (temperatures, threshold) => {
    return temperatures.filter(temp => temp > threshold);
};

// Function to calculate temperature gradient
export const calculateTemperatureGradient = (temperatures, width) => {
    const gradients = [];
    for (let i = 0; i < temperatures.length - 1; i++) {
        const deltaT = temperatures[i + 1] - temperatures[i];
        gradients.push(Math.abs(deltaT / width)); // Assuming uniform width for simplicity
    }
    return gradients;
};

// Function to calculate a rolling average
export const calculateRollingAverage = (temperatures, windowSize) => {
    const rollingAverages = [];
    for (let i = 0; i <= temperatures.length - windowSize; i++) {
        const window = temperatures.slice(i, i + windowSize);
        const avg = calculateAverageTemperature(window);
        rollingAverages.push(avg);
    }
    return rollingAverages;
};

// Function to calculate Exponential Moving Average (EMA)
export const calculateEMA = (temperatures, alpha) => {
    const ema = [temperatures[0]]; // Start with the first temperature
    for (let i = 1; i < temperatures.length; i++) {
        const currentEMA = (alpha * temperatures[i]) + ((1 - alpha) * ema[i - 1]);
        ema.push(currentEMA);
    }
    return ema;
};

// Function to calculate the rate of change
export const calculateRateOfChange = (temperatures) => {
    const rateOfChanges = [];
    for (let i = 1; i < temperatures.length; i++) {
        const change = temperatures[i] - temperatures[i - 1];
        rateOfChanges.push(change); // Change per time unit
    }
    return rateOfChanges;
};