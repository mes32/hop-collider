const NUM_INTERVALS = 300.0;

class HopCompoundDataset {
    constructor(compound, hops, selectedHops) {
        this.maximum = this.getMaximum(compound, hops);
        this.interval = this.maximum / NUM_INTERVALS;
        this.labels = this.getLabels(this.interval);

        const cumulativeDist = this.sumPDF(compound, hops);
        const normalizedDist = this.normalize(cumulativeDist);
        this.distribution = {
            label: `Distribution of ${compound} for All Hops`,
            data: normalizedDist,
        };
        this.selectedData = this.getSelectedArray(compound, selectedHops);
    }

    getMaximum = (compound, hops) => {
        if (hops.length === 0) {
            return 0;
        }

        const compoundsMax = hops.map(hop => Number(hop[`${compound}_max`]));
        const compoundsMin = hops.map(hop => Number(hop[`${compound}_min`]));
        
        let maximum = compoundsMax[0];
        for (let i = 0; i < hops.length; i++) {
            if (compoundsMax[i] > maximum) {
                maximum = compoundsMax[i];
            }
            if (compoundsMin[i] > maximum) {
                maximum = compoundsMin[i];
            }
        }
        return maximum;
    }

    getLabels = (intervalWidth) => {
        let labels = new Array(NUM_INTERVALS);
        for (let i = 0; i < NUM_INTERVALS; i++) {
            if (i % 20 === 0) {
                const x = i * intervalWidth;
                labels[i] = Number.parseFloat(x).toPrecision(2);
            } else {
                labels[i] = '';
            }
        }
        return labels;
    }

    // For each sample interval compute the sum of all hop p.d.f.
    // and set the corresponding label
    sumPDF = (compound, hops) => {
        let sumArray = new Array(NUM_INTERVALS);
        for (let i = 0; i < NUM_INTERVALS; i++) {
            sumArray[i] = 0;
            const x = i * this.interval;
            for (let j = 0; j < hops.length; j++) {
                const hop = hops[j];
                const compound_min = Number(hop[`${compound}_min`]);
                const compound_max = Number(hop[`${compound}_max`]);
                if (compound_min && compound_max) {
                    const hop_mean = (compound_min + compound_max) / 2.0;
                    const hop_stdev = (compound_max - compound_min) / 6.0;
                    sumArray[i] += this.normalPDF(x, hop_mean, hop_stdev);
                }
            }
        }
        return sumArray;
    }

    // Compute the value of the p.d.f. for the normal distribution at point x
    // given a normal distribution with mean and stdev
    normalPDF = (x, mean, stdev) => {
        const coefficient = 1.0 / Math.sqrt(2 * Math.PI * Math.pow(stdev, 2));
        const exponent = (-1 * Math.pow(x - mean, 2)) / (2 * Math.pow(stdev, 2));
        return coefficient * Math.exp(exponent);
    }

    // Normalize the scale of a probability density function (p.d.f.) 
    // into the range 0 to 1
    normalize = (array) => {
        const maxDensity = Math.max(...array);
        if (maxDensity === 0) {
            return array;
        }
        return array.map((sample) => sample / maxDensity);
    }

    getSelectedArray = (compound, selected) => {
        let datasetArray = [];
        for (let i = 0; i < selected.length; i++) {
            const y = 1 - ((i + 1) / (selected.length + 1));
            datasetArray.push(this.getSelected(compound, selected[i], y));
        }
        return datasetArray;
    }

    getSelected = (compound, hop, y) => {
        const max = Number(hop[`${compound}_max`]);
        const min = Number(hop[`${compound}_min`]);
        let selectedArray = new Array(NUM_INTERVALS);
        for (let i = 0; i < NUM_INTERVALS; i++) {
            const x = i * this.interval;
            if (x >= min && x <= max) {
                selectedArray[i] = y;
            } else {
                selectedArray[i] = NaN;
            }
        }
        return {
            label: hop.id,
            data: selectedArray,
        };
    }
}

export default HopCompoundDataset;