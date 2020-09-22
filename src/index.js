import 'phaser';
import '../style.css';
import Game from './game/Game';

const playerNameInput = document.createElement('input');
const gameContainer = document.getElementById('game-container');
playerNameInput.classList.add('hidden');
playerNameInput.id = 'playerNameTextBox';
playerNameInput.setAttribute('type', 'text');
playerNameInput.placeholder = 'Enter your name';
gameContainer.appendChild(playerNameInput);

window.game = new Game();