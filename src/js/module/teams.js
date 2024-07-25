async function TeamDataFetcher() {
    const getTeams = async () => {
        try {
            const response = await fetch('../../src/json/teams.json', { mode: 'cors' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const teams = await response.json();
            return teams;
        } catch (err) {
            console.error('There has been a problem with your fetch operation:', err);
            return [];
        }
    };

    return { getTeams };
}

function TeamDomHandler() {
    const createCard = ({
        imageSrc,
        stadiumName,
        flagName,
        teamName
    }) => {
        const card = document.createElement('div');
        card.classList.add('card', 'card-team', 'rounded-6', 'h-100');

        // Card Image
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('mt-n3', 'bg-image', 'hover-overlay', 'ripple', 'mx-3', 'shadow-4-strong', 'rounded-6', 'card-image');
        cardImageWrapper.setAttribute('data-mdb-ripple-color', 'light');

        const cardImage = document.createElement('img');
        cardImage.src = `img/stadiums/${imageSrc}`;
        cardImage.classList.add('img-fluid');
        cardImage.alt = stadiumName;

        const mask = document.createElement('div');
        mask.classList.add('mask', 'card-mask');

        cardImageWrapper.appendChild(cardImage);
        cardImageWrapper.appendChild(mask);

        card.appendChild(cardImageWrapper);

        // Card Header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const badge = document.createElement('div');
        badge.classList.add('badge', 'badge-primary', 'p-3', 'rounded-circle');

        const flagIcon = document.createElement('i');
        flagIcon.classList.add('flag', `flag-${flagName}`, 'm-0', 'p-0');

        badge.appendChild(flagIcon);
        cardHeader.appendChild(badge);

        card.appendChild(cardHeader);

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'px-5', 'pb-3', 'pt-1', 'm-0');

        const teamBadge = document.createElement('div');
        teamBadge.classList.add('badge', 'badge-primary', 'w-100', 'p-3', 'rounded-pill');
        teamBadge.textContent = teamName;

        cardBody.appendChild(teamBadge);
        card.appendChild(cardBody);

        return card;
    };

    const displayCards = (teams, container) => {
        teams.forEach(team => {
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('col');

            const card = createCard({
                imageSrc: team.imageSrc,
                stadiumName: team.stadiumName,
                flagName: team.flagName,
                teamName: team.teamName
            });

            cardWrapper.appendChild(card);
            container.appendChild(cardWrapper);
        })
    };

    return { displayCards };
}

export { TeamDataFetcher, TeamDomHandler };