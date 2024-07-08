async function TableDataFetcher() {
    const getTable = async () => {
        try {
            const response = await fetch('/src/json/groups.json', { mode: "cors" });
            if (!response.ok) {
                throw new Error('Groups data response was not ok.');
            }
            const groups = await response.json();
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
            const response = await fetch('/src/json/results.json', { mode: "cors" });
            if (!response.ok) {
                throw new Error('Groups results data response was not ok.');
            }
            const results = await response.json();
            return results;
        } catch (err) {
            console.error('There has been a problem with your fetch operation:', err);
        }
    };

    return { getResults };
}

function GroupDomHandler() {

}
