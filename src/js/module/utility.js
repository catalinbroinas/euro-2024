function UtilityDomHandler() {
    const clearPageContent = (container) => {
        if (container.hasChildNodes()) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    };

    const createDOMElement = ({
        elementTag,
        elementClass = [],
        elementId,
        elementText,
        elementScope,
        elementAttributes,
        clickHandler
    }) => {
        const element = document.createElement(elementTag);

        if (elementClass && Array.isArray(elementClass)) {
            elementClass.forEach(className => {
                element.classList.add(className);
            });
        }

        if (elementId) {
            element.setAttribute('id', elementId);
        }

        if (elementScope) {
            element.setAttribute('scope', elementScope);
        }

        if (elementAttributes) {
            for (const [key, value] of Object.entries(elementAttributes)) {
                element.setAttribute(key, value);
            }
        }

        if (elementText) {
            element.textContent = elementText;
        }

        if (clickHandler) {
            element.addEventListener('click', clickHandler);
        }

        return element;
    };

    // Scroll page to top
    const scrollToTop = (button) => {
        // Check if the button exists
        if (!button) {
            console.warn('Scroll button element not found.');
            return;
        }

        // Default no display button
        button.style.display = 'none';

        // Display button after scrolling 350px
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        // Scroll to top
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    return {
        clearPageContent,
        createDOMElement,
        scrollToTop
    };
}

function StringMethods() {
    const wordsUnderlineSeparate = (str) => {
        const array = str.trim().split(/\s+/);
        return array.join('-');
    };

    return { wordsUnderlineSeparate };
}

export { UtilityDomHandler, StringMethods };