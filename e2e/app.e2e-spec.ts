import { Dota2APIPage } from './app.po';

describe('dota2-api App', () => {
  let page: Dota2APIPage;

  beforeEach(() => {
    page = new Dota2APIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
