import { TeamDataFetcher, TeamDomHandler } from "./module/teams.js";
import { UtilityDomHandler } from "./module/utility.js";

async function HandlePageContent() {
    const teamData = await TeamDataFetcher();
    const teams = await teamData.getTeams();
    const teamDom = TeamDomHandler();
    const utilityDom = UtilityDomHandler();

    const displayTeams = async () => {
        if (teams && teams.length) {
            const container = document.querySelector('#teams-content');
            utilityDom.clearPageContent(container);
            teamDom.displayCards(teams, container);
        } else {
            console.warn('No teams data available.');
        }
    };

    return { displayTeams };
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const domManager = await HandlePageContent();
        domManager.displayTeams();
    } catch (err) {
        console.error('Error initializing the DOM handler:', err);
    }
});
