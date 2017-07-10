import { NgDeathRowPage } from './app.po';

describe('ng-death-row App', () => {
  let page: NgDeathRowPage;

  beforeEach(() => {
    page = new NgDeathRowPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
