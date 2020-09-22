import Phaser from 'phaser';
import Button from '../controls/Button';

export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('InstructionsScene');
  }

  create() {
    const instructions = [
      'Thrust forward: W / ↑',
      'Reverse thrust: S / ↓',
      'Turn left: A / ←',
      'Turn right: D / →',
      'Shoot: Space',
    ];
    const { width, height } = this.game.config;
    this.add.image(width / 2, height / 2, 'gameBg');
    this.textArea = this.add.zone(width / 2, height / 2, width, height);
    this.menuButton = new Button(this, width / 2, height - 100, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');
    const instructionsText = instructions.reduce((finalString, current) => `${finalString}\n${current}`);
    this.instructions = this.add.text(1, 1, instructionsText, { fontSize: 20, lineSpacing: 20 });
    Phaser.Display.Align.In.Center(this.instructions, this.textArea);
  }
}