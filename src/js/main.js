import { teamsDOM, teamManager } from "./module/teams.js";

async function DOMHandler() {
    const manager = await teamManager();
    const teams = await manager.getTeams();
    const teamDomHandler = teamsDOM();

    const displayTeams = async () => {
        if (teams && teams.length) {
            teamDomHandler.displayCards(teams);
        } else {
            console.warn('No teams data available.');
        }
    };

    return { displayTeams };
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const domManager = await DOMHandler();
        domManager.displayTeams();
    } catch (err) {
        console.error('Error initializing the DOM handler:', err);
    }
});
