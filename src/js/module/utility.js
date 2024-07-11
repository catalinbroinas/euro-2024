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
        elementClass,
        elementId,
        elementText,
        elementScope,
        elementAtrType,
        elementAtrValue,
        clickHandler
    }) => {
        const element = document.createElement(elementTag);

        if (elementClass) {
            elementClass.forEach(className => element.classList.add(className));
        }

        if (elementId) {
            element.setAttribute('id', elementId);
        }

        if (elementScope) {
            element.setAttribute('scope', elementScope);
        }

        if (elementAtrType) {
            element.setAttribute(elementAtrType, elementAtrValue);
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