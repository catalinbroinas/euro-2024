async function TableDataFetcher() {
    const getTable = async () => {
        try {
            const response = await fetch('/src/json/groupsTable.json', { mode: "cors" });
            if (!response.ok) {
                throw new Error('Groups data response was not ok.');
            }
            const groups = await response.json();
            if (!groups || !Array.isArray(groups)) {
                throw new Error('Groups table data is not in expected format.');
            }
            return groups;
        } catch (err) {
            console.error('There has been a problem with your fetch operation:', err);
        }
    };

    return { getTable };
}

async function MatchesDataFetcher() {
    const getResults = async () => {
        try {
            const response = await fetch('/src/json/groupsResults.json', { mode: "cors" });
            if (!response.ok) {
                throw new Error('Groups results data response was not ok.');
            }
            const results = await response.json();
            if (!results || !Array.isArray(results)) {
                throw new Error('Groups results data is not in expected format.');
            }
            return results;
        } catch (err) {
            console.error('There has been a problem with your fetch operation:', err);
        }
    };

    return { getResults };
}

function GroupDomHandler() {

}
