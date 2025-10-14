import { test } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { ArticlePage } from '../../pages/ArticlePage';

test.describe('Search Article Tests', () => {
    let landingPage: LandingPage;
    let searchResultsPage: SearchResultsPage;
    let articlePage: ArticlePage;

    const searchForArticleThatContains= 'Steve Jobs';
    const keywordToSearch = 'Reed Jobs';
    const articleTitle = 'Reed Jobs, hijo de Steve Jobs, lanza un fondo millonario para financiar nuevos tratamientos contra el cáncer';
    const articleUrlSlug = 'reed-jobs-hijo-steve-jobs-yosemite-nuevos-tratamientos-cancer/';
    
    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        searchResultsPage = new SearchResultsPage(page);
        articlePage = new ArticlePage(page);
        await page.goto('/');
        await landingPage.acceptPrivacyDisclaimerIfVisible();
    });

    test('Search for an article and verify results', async () => {
        await landingPage.clickSearchIcon();
        await landingPage.searchForArticle(searchForArticleThatContains);
        await searchResultsPage.clickEntryHeaderContaining(keywordToSearch);
        await articlePage.verifyArticleTitle(articleTitle);
        await articlePage.verifyArticleUrlContains(articleUrlSlug);
    });
});