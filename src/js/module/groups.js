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
        return [];
    }
}

async function TableDataFetcher() {
    const getTable = () => fetchData('../../src/json/groupsTable.json', 'Groups table data response was not ok.');
    return { getTable };
}

async function MatchesDataFetcher() {
    const getResults = () => fetchData('../../src/json/groupsResults.json', 'Groups results data response was not ok.');
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
                    elementClass: cell.class ? cell.class : []
                });

                if (cell.icon) {
                    cell.icon.forEach(icon => {
                        const iconElementWrapper = utilityDom.createDOMElement({
                            elementTag: 'span',
                            elementClass: ['flag-country', 'me-2']
                        });
                        const iconElement = utilityDom.createDOMElement({
                            elementTag: 'i',
                            elementClass: icon.class ? icon.class : [],
                            elementAttributes: {
                                title: icon.title
                            }
                        });
                        iconElementWrapper.appendChild(iconElement);
                        td.appendChild(iconElementWrapper);
                    });
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

    const createMatch = ({
        home,
        away,
        homeScore,
        awayScore
    }) => {
        // Create card structure
        const cardWrapper = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-ultra-4', 'col-xxl-6', 'col-lg-4', 'col-sm-6', 'col-10']
        });
        const card = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card']
        });
        const cardBody = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card-body', 'py-2']
        });

        // Create card body structure
        const cardList = utilityDom.createDOMElement({
            elementTag: 'ul',
            elementClass: ['list-group', 'list-group-light']
        });
        const cardListItemOne = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item', 'd-flex', 'justify-content-between']
        });
        const cardListItemTwo = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item', 'd-flex', 'justify-content-between']
        });

        // Create card body items
        const homeTeam = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['text', 'm-0'],
            elementText: home
        });
        const awayTeam = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['text', 'm-0'],
            elementText: away
        });
        const homeTeamScore = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['title', 'm-0'],
            elementText: homeScore
        });
        const awayTeamScore = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['title', 'm-0'],
            elementText: awayScore
        });

        // Determine the winning team and apply bold class
        const homeScoreInt = parseInt(homeScore);
        const awayScoreInt = parseInt(awayScore);
        if (homeScoreInt > awayScoreInt) {
            homeTeam.classList.add('fw-bold');
        } else if (awayScoreInt > homeScoreInt) {
            awayTeam.classList.add('fw-bold');
        }

        // Append items to list
        cardListItemOne.appendChild(homeTeam);
        cardListItemOne.appendChild(homeTeamScore);

        cardListItemTwo.appendChild(awayTeam);
        cardListItemTwo.appendChild(awayTeamScore);

        cardList.appendChild(cardListItemOne);
        cardList.appendChild(cardListItemTwo);

        // Append list to card body
        cardBody.appendChild(cardList);
        card.appendChild(cardBody);
        cardWrapper.appendChild(card);

        return cardWrapper;
    };

    const displayTable = (groups, container) => {
        groups.forEach(group => {
            // Define headers
            const headers = group.headers.map(header => ({
                class: header.class ? header.class : '',
                text: header.text
            }));

            // Define data
            const data = group.data.map(row => row.map(cell => ({
                class: cell.class ? cell.class : '',
                icon: cell.icon ? cell.icon : [],
                text: cell.text ? cell.text : ''
            })));

            // Define table
            const table = createTable({
                groupTitle: group.groupTitle,
                headers: headers,
                data: data
            });

            container.appendChild(table);
        });
    };

    const displayMatches = (results, container) => {
        results.forEach(result => {
            const resultsRow = utilityDom.createDOMElement({
                elementTag: 'div',
                elementClass: ['row', 'g-4']
            });

            result.results.forEach(match => {
                const card = createMatch({
                    home: match.home,
                    away: match.away,
                    homeScore: match.homeScore,
                    awayScore: match.awayScore,
                });
                resultsRow.appendChild(card);
            });

            container.appendChild(resultsRow);
        });
    };

    return { displayTable, displayMatches };
}

export { TableDataFetcher, MatchesDataFetcher, GroupDomHandler };