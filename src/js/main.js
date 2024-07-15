import { TeamDataFetcher, TeamDomHandler } from "./module/teams.js";
import { TableDataFetcher, MatchesDataFetcher, GroupDomHandler } from './module/groups.js';
import { UtilityDomHandler } from "./module/utility.js";

async function HandlePageContent() {
    // Teams
    const teamData = await TeamDataFetcher();
    const teams = await teamData.getTeams();
    const teamDom = TeamDomHandler();

    // Groups
    const groupDom = GroupDomHandler();

    // Groups table
    const groupData = await TableDataFetcher();
    const groups = await groupData.getTable();

    // Groups results
    const groupMatches = await MatchesDataFetcher();
    const results = await groupMatches.getResults();

    // Utilities
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

    const displayGroups = async () => {
        if (groups && groups.length) {
            // Get groups container and clean
            const container = document.querySelector('#groups-content');
            utilityDom.clearPageContent(container);

            groups.forEach((group, index) => {
                // Identify group id
                const groupLetter = group.groupTitle.charAt(group.groupTitle.length - 1);

                // Create container for all groups
                const groupWrapper = utilityDom.createDOMElement({
                    elementTag: 'div',
                    elementClass: ['row', 'align-items-xxl-center', 'my-0', 'gx-4', 'gy-5'],
                    elementId: `group-${groupLetter}-wrapper`
                });

                // Create column for group table
                const tableWrapper = utilityDom.createDOMElement({
                    elementTag: 'div',
                    elementClass: ['col-ultra-5', 'col-xxxl-6', 'col-xxl-7', 'col-xl-9', 'col-lg-auto', 'col-sm-12', 'mx-auto', 'my-0'],
                    elementId: `group-${groupLetter}-table`
                });

                // Add group table to column
                groupDom.displayTable([group], tableWrapper);

                // Add table column to group container
                groupWrapper.appendChild(tableWrapper);

                // Create column for group results
                const resultsWrapper = utilityDom.createDOMElement({
                    elementTag: 'div',
                    elementClass: ['col-ultra-5', 'col-xxxl-6', 'col-xxl-5', 'col-sm-12', 'my-0'],
                    elementId: `group-${groupLetter}-results`
                });

                // Find results for the current group
                const groupResults = results.find(result => result.groupTitle === group.groupTitle);

                // Add group results to column if available
                if (groupResults && groupResults.results.length) {
                    groupDom.displayMatches([groupResults], resultsWrapper);
                } else {
                    console.warn(`No matches data available for group ${group.groupTitle}.`);
                }

                // Add results column to group container
                groupWrapper.appendChild(resultsWrapper);

                // Add group container to main container
                container.appendChild(groupWrapper);

                // Create divider between groups, but not after the last group
                if (index < groups.length - 1) {
                    const divider = utilityDom.createDOMElement({
                        elementTag: 'hr',
                        elementClass: ['hr', 'my-5', 'mx-0']
                    });
                    container.appendChild(divider);
                }
            });
        } else {
            console.warn('No groups data available.');
        }
    };

    return { displayTeams, displayGroups };
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
            domManager.displayGroups();
        } catch (err) {
            console.error('Error initializing the DOM handler:', err);
        }
    }
});
