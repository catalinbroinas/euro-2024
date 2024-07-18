import { UtilityDomHandler } from "./utility.js";

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
    const utilityDom = UtilityDomHandler()

    const createStadium = ({
        image,
        name,
        city,
        team,
        capacity
    }) => {
        // Define class and attributes for icon
        let icon = 'fa-location-dot';
        const iconClass = ['fas', `${icon}`, 'fa-lg', 'fa-fw', 'me-4'];
        let tooltip = 'City';
        const iconAttributes = {
            'data-mdb-toggle': 'tooltip',
            'data-mdb-placement': 'left',
            title: `${tooltip}`
        };

        // Create grid
        const stadiumWrapper = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['row', 'stadium-wrapper', 'justify-content-center', 'align-items-center']
        });
        const imageWrapper = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxxl-8', 'col-xxl-7', 'col-xl-6', 'col-lg-8', 'col-sm-7', 'stadium-wrapper-image']
        });
        const cardWrapper = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['col-xxxl-4', 'col-xxl-5', 'col-lg-4', 'col-sm-5', 'stadium-wrapper-content']
        });

        // Create image element
        const imageElement = UtilityDomHandler.createDOMElement({
            elementTag: 'img',
            elementAttributes: {
                src: `/img/stadiums/${image}`,
                alt: `${name} stadium`
            },
            elementClass: ['img-fluid', 'rounded-7', 'shadow-0']
        });

        // Create card structure
        const card = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card', 'shadow-5', 'card-stadium']
        });
        const cardBody = utilityDom.createDOMElement({
            elementTag: 'div',
            elementClass: ['card-body', 'py-sm-4', 'py-3', 'px-5']
        });
        const cardList = utilityDom.createDOMElement({
            elementTag: 'ul',
            elementClass: ['list-group', 'list-group-light']
        });

        // Create card title
        const cardTitle = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['sub-title', 'text-center', 'mt-0', 'mb-2'],
            elementText: name ? name : 'Stadium'
        });

        // Create city item
        const cityItem = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item']
        });
        const cityElement = utilityDom.createDOMElement({
            elementTag: 'p',
            elementClass: ['text', 'm-0']
        });
        const cityIcon = utilityDom.createDOMElement({
            elementTag: 'i',
            elementClass: iconClass,
            elementAttributes: iconAttributes
        });

        // Add icon and text to element
        cityElement.appendChild(cityIcon);
        cityElement.insertAdjacentHTML('beforeend', `${city}`);
        cityItem.appendChild(cityElement);

        // Create team item
        icon = 'fa-futbol';
        tooltip = 'Home team';

        const teamItem = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item']
        });
        const teamElement = utilityDom.createDOMElement({
            elementTag: 'p',
            elementClass: ['text', 'm-0']
        });
        const teamIcon = utilityDom.createDOMElement({
            elementTag: 'i',
            elementClass: iconClass,
            elementAttributes: iconAttributes
        });

        // Add icon and text to element
        teamElement.appendChild(teamIcon);
        teamElement.insertAdjacentHTML('beforeend', `${team}`);
        teamItem.appendChild(teamElement);

        // Create capacity item
        icon = 'fa-users';
        tooltip = 'Stadium capacity';

        const capacityItem = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item']
        });
        const capacityElement = utilityDom.createDOMElement({
            elementTag: 'p',
            elementClass: ['text', 'm-0']
        });
        const capacityIcon = utilityDom.createDOMElement({
            elementTag: 'i',
            elementClass: iconClass,
            elementAttributes: iconAttributes
        });

        // Add icon and text to element
        capacityElement.appendChild(capacityIcon);
        capacityElement.insertAdjacentHTML('beforeend', `${capacity}`);
        capacityItem.appendChild(capacityElement);

        // Add items to list
        cardList.appendChild(cityItem);
        cardList.appendChild(teamItem);
        cardList.appendChild(capacityItem);

        // Add title and list to card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardList);

        // Add body to card
        card.appendChild(cardBody);

        // Add content to wrapper
        cardWrapper.appendChild(card);
        imageWrapper.appendChild(imageElement);

        stadiumWrapper.appendChild(imageWrapper);
        stadiumWrapper.appendChild(cardWrapper);

        return stadiumWrapper;
    };
}

export { StadiumDataFetcher, StadiumDomHandler };