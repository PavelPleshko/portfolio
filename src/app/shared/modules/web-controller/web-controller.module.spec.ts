import { WebControllerModule } from './web-controller.module';

describe('WebControllerModule', () => {
  let webControllerModule: WebControllerModule;

  beforeEach(() => {
    webControllerModule = new WebControllerModule();
  });

  it('should create an instance', () => {
    expect(webControllerModule).toBeTruthy();
  });
});
