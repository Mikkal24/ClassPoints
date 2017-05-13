function helloWorld() {
  return 'Hello world!';
}

// https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-jasmine

describe('Hello world', function () {
  it('says hello', function () {
    expect(helloWorld()).toEqual('Hello world!');
  });
});