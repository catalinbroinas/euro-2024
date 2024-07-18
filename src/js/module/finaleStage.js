import { UtilityDomHandler } from "./utility.js";

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
            return [];
        }
    };

    return { getResults };
}

function FinaleStageDomHandler() {
    const utilityDom = UtilityDomHandler();

    const createMatch = ({
        homeFlag,
        awayFlag,
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
        referee,
        stadium,
        extraTime
    }) => {
        // Card structure
        const card = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card']
        });
        const cardBody = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card-body', 'py-3', 'px-4']
        });
        const cardFooter = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card-footer', 'border-0', 'px-4', 'pb-3', 'pt-0', 'd-flex', 'justify-content-around', 'g-3']
        });
        const listGroup = utilityDom.createDOMElement({
            elementTag: 'ul',
            elementClass: ['list-group', 'list-group-light', 'list-group-small']
        });

        // Home Team Item
        const homeItem = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center']
        });
        const homeTeamDiv = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['d-flex', 'align-items-center']
        });
        const homeTeamImg = utilityDom.createDOMElement({
            elementTag: 'img',
            elementClass: ['me-4', 'avatar-team'],
            elementAttributes: {
                src: `/img/flags/${homeFlag}`,
                alt: `${homeTeam} flag`
            }
        });
        const homeTeamText = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['text', 'm-0'],
            elementText: homeTeam
        });
        const homeScoreText = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['title', 'm-0'],
            elementText: homeScore
        });

        homeTeamDiv.appendChild(homeTeamImg);
        homeTeamDiv.appendChild(homeTeamText);
        homeItem.appendChild(homeTeamDiv);
        homeItem.appendChild(homeScoreText);

        // Away Team Item
        const awayItem = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center']
        });
        const awayTeamDiv = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['d-flex', 'align-items-center']
        });
        const awayTeamImg = utilityDom.createDOMElement({
            elementTag: 'img',
            elementClass: ['me-4', 'avatar-team'],
            elementAttributes: {
                src: `/img/flags/${awayFlag}`,
                alt: `${awayTeam} flag`
            }
        });
        const awayTeamText = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['text', 'm-0'],
            elementText: awayTeam
        });
        const awayScoreText = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['title', 'm-0'],
            elementText: awayScore
        });

        awayTeamDiv.appendChild(awayTeamImg);
        awayTeamDiv.appendChild(awayTeamText);
        awayItem.appendChild(awayTeamDiv);
        awayItem.appendChild(awayScoreText);

        // Determine the winning team and apply bold class
        const homeScoreInt = parseInt(homeScore);
        const awayScoreInt = parseInt(awayScore);
        if (homeScoreInt > awayScoreInt) {
            homeTeamText.classList.add('fw-bold');
        } else if (awayScoreInt > homeScoreInt) {
            awayTeamText.classList.add('fw-bold');
        }

        if (extraTime) {
            const extraTimeItem = utilityDom.createDOMElement({
                elementTag: 'span',
                elementClass: ['match-notice'],
                elementText: extraTime
            });
            listGroup.appendChild(extraTimeItem);
        }

        listGroup.appendChild(homeItem);
        listGroup.appendChild(awayItem);
        cardBody.appendChild(listGroup);

        // Card footer
        const refereeInfo = utilityDom.createDOMElement({
            elementTag: 'h6',
            elementClass: ['text', 'small', 'm-0']
        });
        const refereeIcon = utilityDom.createDOMElement({
            elementTag: 'i',
            elementClass: ['fas', 'fa-diamond', 'me-2'],
            elementAttributes: {
                'data-mdb-toggle': 'tooltip',
                'data-mdb-placement': 'bottom',
                title: 'Referee'
            }
        });

        const stadiumInfo = utilityDom.createDOMElement({
            elementTag: 'h6',
            elementClass: ['text', 'small', 'm-0'],
        });
        const stadiumIcon = utilityDom.createDOMElement({
            elementTag: 'i',
            elementClass: ['fas', 'fa-location-dot', 'me-2'],
            elementAttributes: {
                'data-mdb-toggle': 'tooltip',
                'data-mdb-placement': 'bottom',
                title: 'Stadium'
            }
        });

        refereeInfo.appendChild(refereeIcon);
        refereeInfo.insertAdjacentHTML('beforeend', `${referee}`);

        stadiumInfo.appendChild(stadiumIcon);
        stadiumInfo.insertAdjacentHTML('beforeend', `${stadium}`);

        cardFooter.appendChild(refereeInfo);
        cardFooter.appendChild(stadiumInfo);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        return card;
    };

    const displayMatches = (results, container) => {
        results.forEach(result => {
            const cardWrapper = utilityDom.createDOMElement({
                elementTag: 'div',
                elementClass: ['col']
            });

            const card = createMatch({
                homeFlag: result.homeFlag,
                awayFlag: result.awayFlag,
                homeTeam: result.homeTeam,
                awayTeam: result.awayTeam,
                homeScore: result.homeScore,
                awayScore: result.awayScore,
                referee: result.referee,
                stadium: result.stadium,
                extraTime: result.extraTime
            });

            cardWrapper.appendChild(card);
            container.appendChild(cardWrapper);
        });
    };

    return { displayMatches };
}

export { FinaleStageDataFetcher, FinaleStageDomHandler };