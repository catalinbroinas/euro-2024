import { UtilityDomHandler } from "./utility.js";

async function StadiumDataFetcher() {
    const getStadiums = async () => {
        try {
            const response = await fetch('../euro-2024/src/json/stadiums.json', { mode: 'cors' });
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
    const utilityDom = UtilityDomHandler();

    // Function to create list items with icon and text
    const createListItem = (icon, tooltip, text) => {
        const item = utilityDom.createDOMElement({
            elementTag: 'li',
            elementClass: ['list-group-item']
        });
        const element = utilityDom.createDOMElement({
            elementTag: 'p',
            elementClass: ['text', 'm-0']
        });
        const iconElement = utilityDom.createDOMElement({
            elementTag: 'i',
            elementClass: ['fas', `${icon}`, 'fa-lg', 'fa-fw', 'me-4'],
            elementAttributes: {
                'data-mdb-toggle': 'tooltip',
                'data-mdb-placement': 'left',
                title: `${tooltip}`
            }
        });

        element.appendChild(iconElement);
        element.insertAdjacentHTML('beforeend', `${text}`);
        item.appendChild(element);

        return item;
    };

    const createStadium = ({
        image,
        name,
        city,
        team,
        capacity
    }) => {
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
        const imageElement = utilityDom.createDOMElement({
            elementTag: 'img',
            elementAttributes: {
                src: `img/stadiums/${image}`,
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
            elementClass: ['card-body', 'py-sm-4', 'py-3', 'px-0']
        });
        const cardList = utilityDom.createDOMElement({
            elementTag: 'ul',
            elementClass: ['list-group', 'list-group-light', 'px-5']
        });

        // Create card title
        const cardTitle = utilityDom.createDOMElement({
            elementTag: 'h5',
            elementClass: ['sub-title', 'text-center', 'mt-0', 'mb-2', 'px-3'],
            elementText: name ? name : 'Stadium'
        });

        // Create list items
        const cityItem = createListItem('fa-location-dot', 'City', city);
        const teamItem = createListItem('fa-futbol', 'Home team', team);
        const capacityItem = createListItem('fa-users', 'Stadium capacity', capacity);

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

    const displayStadiums = (stadiums, container) => {
        stadiums.forEach(stadium => {
            const stadiumWrapper = utilityDom.createDOMElement({
                elementTag: 'div',
                elementClass: ['col']
            });

            const stadiumCardWrapper = createStadium({
                image: stadium.image,
                name: stadium.name,
                city: stadium.city,
                team: stadium.team,
                capacity: stadium.capacity
            });

            stadiumWrapper.appendChild(stadiumCardWrapper);
            container.appendChild(stadiumWrapper);
        });
    };

    return { displayStadiums };
}

export { StadiumDataFetcher, StadiumDomHandler };