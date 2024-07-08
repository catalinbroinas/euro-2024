async function fetchData(url, errorMessage) {
    try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(errorMessage);
        }
        const data = await response.json();
        if (!data || !Array.isArray(data)) {
            throw new Error(`${errorMessage} - data is not in expected format.`);
        }
        return data;
    } catch (err) {
        console.error('There has been a problem with your fetch operation:', err);
    }
}

async function TableDataFetcher() {
    const getTable = () => fetchData('/src/json/groupsTable.json', 'Groups table data response was not ok.');
    return { getTable };
}

async function MatchesDataFetcher() {
    const getResults = () => fetchData('/src/json/groupsResults.json', 'Groups results data response was not ok.');
    return { getResults };
};

function GroupDomHandler() {

}

export { TableDataFetcher, MatchesDataFetcher };