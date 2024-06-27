function teamsDOM() {
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
        cardImage.src = `img/${imageSrc}`;
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

    const displayCards = (teams) => {

    }

    return { displayCards };
}

export { teamsDOM };