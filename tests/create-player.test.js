import createPlayer from '../factories/create-player';

let player;
let enemy;

let mockCreateGameboard = jest.fn(() => {
  return {
    recieveAttack: jest.fn(),
  };
});

beforeEach(() => {
  player = createPlayer(mockCreateGameboard);
  enemy = createPlayer(mockCreateGameboard);
});

describe('take turn method', () => {
  it('calls recieve attack method of enemy gameboard', () => {
    let targetCoordinates = [0, 0];
    player.takeTurn(enemy, targetCoordinates);
    expect(enemy.gameboard.recieveAttack).toHaveBeenCalled();
    expect(enemy.gameboard.recieveAttack).toHaveBeenCalledWith(
      targetCoordinates
    );
  });

  describe('computer / AI take turn variant', () => {
    it('makes move for computer, ONCE', () => {
      player.takeTurn(enemy);
      expect(enemy.gameboard.recieveAttack).toHaveBeenCalledTimes(1);
    });

    for (let i = 0; i <= 1; i++) {
      it('makes a legal move', () => {
        player.takeTurn(enemy);
        expect(
          enemy.gameboard.recieveAttack.mock.calls[0][0][0]
        ).toBeGreaterThanOrEqual(0);
        expect(
          enemy.gameboard.recieveAttack.mock.calls[0][0][1]
        ).toBeGreaterThanOrEqual(0);
        expect(
          enemy.gameboard.recieveAttack.mock.calls[0][0][0]
        ).toBeLessThanOrEqual(10);
        expect(
          enemy.gameboard.recieveAttack.mock.calls[0][0][1]
        ).toBeLessThanOrEqual(10);
      });
    }
  });
});
