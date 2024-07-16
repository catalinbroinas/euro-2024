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

    return {
        clearPageContent,
        createDOMElement
    };
}

export { UtilityDomHandler };