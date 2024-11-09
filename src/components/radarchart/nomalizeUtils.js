// normalizeUtils.js

// Function to normalize a value between a given min-max range
const normalize = (value, minMax) => {
    return ((value - minMax[0]) / (minMax[1] - minMax[0])) * 100;
};

// Function to normalize an array of audio attributes
export const normalizeAttributes = (attributes) => {
    const loudnessMinMax = [-25, 0];
    const tempoMinMax = [25, 200];

    // Normalizing the audio features
    return [
        attributes.danceability * 100,
        attributes.energy * 100,
        normalize(attributes.loudness, loudnessMinMax),
        normalize(attributes.tempo, tempoMinMax),
        attributes.valence * 100,
    ];
};