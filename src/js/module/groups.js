import { UtilityDomHandler } from "./utility.js";

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
    const utilityDom = UtilityDomHandler();

    const createTable = ({
        groupTitle,
        headers,
        data
    }) => {
        // Table structure and title 
        const tableWrapper = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['table-responsive', 'shadow-2-strong', 'table-group'],
        });
        const table = utilityDom.createDOMElement({
            elementTag: 'table',
            elementClass: ['table', 'table-hover']
        });
        const title = utilityDom.createDOMElement({
            elementTag: 'h3',
            elementClass: ['title', 'mb-4'],
            elementText: groupTitle
        });
        const tableHead = utilityDom.createDOMElement({
            elementTag: 'thead',
            elementClass: ['table-light']
        });
        const tableBody = utilityDom.createDOMElement({
            elementTag: 'tbody'
        });

        // Table Header
        const theadRow = utilityDom.createDOMElement({
            elementTag: 'tr'
        });

        headers.forEach(header => {
            const th = utilityDom.createDOMElement({
                elementTag: 'th',
                elementScope: 'col',
                elementClass: header.class ? header.class : '',
                elementText: header.text
            });
            theadRow.appendChild(th);
        });

        tableHead.appendChild(theadRow);

        // Table Body
        data.forEach((row) => {
            const tr = utilityDom.createDOMElement({
                elementTag: 'tr'
            });

            row.forEach(cell => {
                const td = utilityDom.createDOMElement({
                    elementTag: 'td',
                    elementClass: cell.class ? cell.class : ''
                });

                if (cell.icon) {
                    const icon = utilityDom.createDOMElement({
                        elementTag: 'i',
                        elementClass: cell.icon.class,
                        elementAtrType: cell.icon.atrType,
                        elementAtrValue: cell.icon.atrValue
                    });
                    td.appendChild(icon);
                }

                if (cell.text) {
                    const text = document.createTextNode(cell.text);
                    td.appendChild(text);
                }

                tr.appendChild(td);
            });

            tableBody.appendChild(tr);
        });

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableWrapper.appendChild(title);
        tableWrapper.appendChild(table);

        return tableWrapper;
    };
}

export { TableDataFetcher, MatchesDataFetcher };