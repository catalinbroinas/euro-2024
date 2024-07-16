async function FinaleStageDataFetcher() {
    const getResults = async () => {
        try {
            const response = await fetch('/src/json/finaleStage.json', { mode: 'cors' });
            if (!response.ok) {
                throw new Error('Finale stage data response was not ok.');
            }
            const data = await response.json();
            if (!data || !Array.isArray(data)) {
                throw new Error('Finale stage data is not in expected format.');
            }
            return data;
        } catch (err) {
            console.error('There has been a problem with your fetch operation:', err);
        }
    };

    return { getResults };
}

export { FinaleStageDataFetcher };