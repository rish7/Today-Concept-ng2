import { MyprjPage } from './app.po';

describe('myprj App', function() {
  let page: MyprjPage;

  beforeEach(() => {
    page = new MyprjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
