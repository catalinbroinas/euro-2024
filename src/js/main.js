import { TeamDataFetcher, TeamDomHandler } from "./module/teams.js";
import { TableDataFetcher, MatchesDataFetcher, GroupDomHandler } from './module/groups.js';
import { UtilityDomHandler } from "./module/utility.js";

async function HandlePageContent() {
    const teamData = await TeamDataFetcher();
    const teams = await teamData.getTeams();
    const teamDom = TeamDomHandler();
    const groupData = await TableDataFetcher();
    const groups = await groupData.getTable();
    const groupDom = GroupDomHandler();
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

    const displayGroupsTable = async () => {
        if (groups && groups.length) {
            const container = document.querySelector('#groups-content');
            utilityDom.clearPageContent(container);
            groupDom.displayTable(groups, container);
        } else {
            console.warn('No groups data available.');
        }
    }

    return { displayTeams, displayGroupsTable };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await HandlePageContent();
    if (location.pathname.endsWith('teams.html')) {
        try {
            domManager.displayTeams();
        } catch (err) {
            console.error('Error initializing the DOM handler:', err);
        }
    }
    if (location.pathname.endsWith('groupStage.html')) {
        try {
            domManager.displayGroupsTable();
        } catch (err) {
            console.error('Error initializing the DOM handler:', err);
        }
    }
});
