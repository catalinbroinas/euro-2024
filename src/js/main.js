import { TeamDataFetcher, TeamDomHandler } from "./module/teams.js";
import { StadiumDataFetcher, StadiumDomHandler } from "./module/stadiums.js";
import { TableDataFetcher, MatchesDataFetcher, GroupDomHandler } from './module/groups.js';
import { FinaleStageDataFetcher, FinaleStageDomHandler } from './module/finaleStage.js';
import { UtilityDomHandler, StringMethods } from "./module/utility.js";

async function HandlePageContent() {
    // Teams
    const teamData = await TeamDataFetcher();
    const teams = await teamData.getTeams();
    const teamDom = TeamDomHandler();

    // Stadium
    const stadiumData = await StadiumDataFetcher();
    const stadiums = await stadiumData.getStadiums();
    const stadiumDom = StadiumDomHandler();

    // Groups
    const groupDom = GroupDomHandler();

    // Groups table
    const groupData = await TableDataFetcher();
    const groups = await groupData.getTable();

    // Groups results
    const groupMatches = await MatchesDataFetcher();
    const results = await groupMatches.getResults();

    // Finale stage
    const finaleStageDom = FinaleStageDomHandler();

    const finaleStageData = await FinaleStageDataFetcher();
    const finaleStageResults = await finaleStageData.getResults();

    // Utilities
    const utilityDom = UtilityDomHandler();
    const utilityString = StringMethods();

    const displayTeams = async () => {
        if (teams && teams.length) {
            const container = document.querySelector('#teams-content');
            utilityDom.clearPageContent(container);
            teamDom.displayCards(teams, container);
        } else {
            console.warn('No teams data available.');
        }
    };

    const displayStadiums = async () => {
        if (stadiums && stadiums.length) {
            const container = document.querySelector('#stadiums');
            utilityDom.clearPageContent(container);
            stadiumDom.displayStadiums(stadiums, container);
        } else {
            console.warn('No stadiums data available.');
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
                    elementClass: ['col-ultra-5', 'col-xxxl-6', 'col-xxl-7', 'col-xl-9', 'col-lg-auto', 'col-sm-12', 'mx-auto', 'mt-0', 'mb-4', 'mb-xxl-0'],
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

    const displayFinaleStage = async () => {
        if (finaleStageResults && finaleStageResults.length) {
            // Get finale stage container and clean
            const container = document.querySelector('#finale-stage-results');
            utilityDom.clearPageContent(container);

            finaleStageResults.forEach((round, index) => {
                //  Identified round id
                const stageId = utilityString.wordsUnderlineSeparate(round.stage).toLowerCase();

                // Create container for all finale stage rounds
                const stageWrapper = utilityDom.createDOMElement({
                    elementTag: 'div',
                    elementClass: ['row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-lg-3', 'row-cols-xxl-4', 'gy-4', 'gx-5', 'mb-xl-7', 'mb-5'],
                    elementId: stageId
                });

                // Create title for all finale stage rounds and divider under title
                const stageTitle = utilityDom.createDOMElement({
                    elementTag: 'h2',
                    elementClass: ['sub-title', 'text-center', 'mb-3', 'w-100'],
                    elementText: round.stage
                });

                const divider = utilityDom.createDOMElement({
                    elementTag: 'hr',
                    elementClass: ['hr', 'hr-blurry', 'mt-0', 'mb-4', 'w-100']
                });

                stageWrapper.appendChild(stageTitle);
                stageWrapper.appendChild(divider);

                round.matches.forEach(match => {
                    finaleStageDom.displayMatches([match], stageWrapper);
                });

                if (index === finaleStageResults.length - 1) {
                    stageWrapper.classList.remove('mb-xl-7');
                    stageWrapper.classList.remove('mb-5');
                }

                container.appendChild(stageWrapper);
            });
        } else {
            console.warn('No finale stage data available.');
        }
    };

    const scrollPage = () => {
        const scrollButton = document.querySelector('#scroll-button');
        utilityDom.scrollToTop(scrollButton);
    };

    return {
        displayTeams,
        displayGroups,
        displayFinaleStage,
        displayStadiums,
        scrollPage
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    const domManager = await HandlePageContent();
    domManager.scrollPage();

    const pageHandlers = {
        'teams.html': domManager.displayTeams,
        'stadiums.html': domManager.displayStadiums,
        'groupStage.html': domManager.displayGroups,
        'finaleStage.html': domManager.displayFinaleStage,
    };

    const currentPage = Object.keys(pageHandlers).find(page => location.pathname.endsWith(page));

    if (currentPage) {
        try {
            pageHandlers[currentPage]();
        } catch (err) {
            console.error(`Error initializing the DOM handler for ${currentPage}:`, err);
        }
    }
});
