import createPlayer from '../factories/create-player';

let player;
let enemy;

let options = {
  createGameboard: jest.fn(() => {
    return {
      receiveAttack: jest.fn(),
    };
  }),
};

beforeEach(() => {
  player = createPlayer('player1', options);
  enemy = createPlayer('enemy1', options);
});

describe('take turn method', () => {
  it('calls receive attack method of enemy gameboard', () => {
    let targetCoordinates = [0, 0];
    player.takeTurn(enemy, targetCoordinates);
    expect(enemy.gameboard.receiveAttack).toHaveBeenCalled();
    expect(enemy.gameboard.receiveAttack).toHaveBeenCalledWith(
      targetCoordinates
    );
  });

  describe('computer / AI take turn variant', () => {
    it('makes move for computer, ONCE', () => {
      player.takeTurn(enemy);
      expect(enemy.gameboard.receiveAttack).toHaveBeenCalledTimes(1);
    });

    for (let i = 0; i <= 1; i++) {
      it('makes a legal move', () => {
        player.takeTurn(enemy);
        expect(
          enemy.gameboard.receiveAttack.mock.calls[0][0][0]
        ).toBeGreaterThanOrEqual(0);
        expect(
          enemy.gameboard.receiveAttack.mock.calls[0][0][1]
        ).toBeGreaterThanOrEqual(0);
        expect(
          enemy.gameboard.receiveAttack.mock.calls[0][0][0]
        ).toBeLessThanOrEqual(10);
        expect(
          enemy.gameboard.receiveAttack.mock.calls[0][0][1]
        ).toBeLessThanOrEqual(10);
      });
    }
  });
});
