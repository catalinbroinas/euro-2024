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

}

function GroupDomHandler() {

}
