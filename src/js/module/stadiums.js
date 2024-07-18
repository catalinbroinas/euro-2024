async function StadiumDataFetcher() {
    const getStadiums = async () => {
        try {
            const response = await fetch('/src/json/stadiums.json', { mode: 'cors' });
            if (!response.ok) {
                throw new Error('Stadiums data response was not ok.');
            }
            const data = await response.json();
            if (!data || !Array.isArray(data)) {
                throw new Error('Stadiums data is not in expected format.');
            }
            return data;
        } catch (err) {
            console.error('There has been a problem with your fetch operation:', err);
            return [];
        }
    };

    return { getStadiums };
}

function StadiumDomHandler() {

}

export { StadiumDataFetcher, StadiumDomHandler };