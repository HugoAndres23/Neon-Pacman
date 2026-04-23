/**
 * Map.js — Matriz del nivel y dibujo de muros/puntos.
 *
 * Idea clave: el tablero es una matriz M[fil][col]. Cada celda es un número (tipo de tile).
 * Las colisiones se resuelven con índices enteros: (col, fil) ∈ ℕ².
 */

/** Tipos de celda (evita números mágicos en el resto del juego). */
export const Tile = Object.freeze({
  WALL: 1,
  DOT: 0,
  EMPTY: 2,
  POWER: 3,
});
import { getSprite, spriteReady } from "./Sprites.js";
import GeneradorMixto from "../lib/randomLib.js";

const gen = new GeneradorMixto();

/** Tamaño de celda en píxeles (coincide con el canvas en index.html). */
export const TILE = 28;

const RAW_1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1],
  [2, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 2],
  [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const RAW_2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1],
  [2, 0, 1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 0, 2],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const RAW_3 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1],
  [2, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 2],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export let currentMapRaw = RAW_1;

export function loadMapLevel(level) {
  if (level === 1) currentMapRaw = RAW_1;
  else if (level === 2) currentMapRaw = RAW_2;
  else currentMapRaw = RAW_3;
}

export const GHOST_SPAWN_CELLS = Object.freeze([
  [6, 7],
  [7, 7],
  [8, 7],
  [7, 6],
]);

function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

/** Copia mutable del mapa (se “comen” puntos mutando celdas a EMPTY). */
export function createLevel() {
  const grid = cloneGrid(currentMapRaw);
  const dots = [];

  for (let y = 0; y < rows(); y++) {
    for (let x = 0; x < cols(); x++) {
      if (grid[y][x] === Tile.DOT) {
        dots.push({ x, y });
      }
    }
  }

  // Generar 4 pastillas de poder aleatoriamente
  for (let i = 0; i < 4; i++) {
    if (dots.length === 0) break;
    const idx = gen.numeroEntero(0, dots.length - 1);
    const dot = dots.splice(idx, 1)[0];
    grid[dot.y][dot.x] = Tile.POWER;
  }

  return grid;
}

export function cols() {
  return currentMapRaw[0].length;
}

export function rows() {
  return currentMapRaw.length;
}

export function canvasSize() {
  return { width: cols() * TILE, height: rows() * TILE };
}

/**
 * ¿Hay muro en la celda (gx, gy)?
 * Matemáticamente: es una función indicadora 𝟙{muro}(gx,gy).
 */
export function isWall(grid, gx, gy) {
  if (!inBounds(gx, gy)) return true;
  return grid[gy][gx] === Tile.WALL;
}

export function inBounds(gx, gy) {
  return gx >= 0 && gx < cols() && gy >= 0 && gy < rows();
}

/**
 * Intenta “comer” un punto en (gx, gy). Devuelve puntos ganados (10) o 0.
 */
export function tryEatDot(grid, gx, gy) {
  if (!inBounds(gx, gy)) {
    console.warn("[Map] tryEatDot fuera de límites:", gx, gy);
    return 0;
  }
  if (grid[gy][gx] !== Tile.DOT && grid[gy][gx] !== Tile.POWER) return 0;
  const score = grid[gy][gx] === Tile.POWER ? 50 : 10;
  grid[gy][gx] = Tile.EMPTY;
  return score;
}

export function countDots(grid) {
  let n = 0;
  for (let y = 0; y < rows(); y++) {
    for (let x = 0; x < cols(); x++) {
      if (grid[y][x] === Tile.DOT) n++;
      if (grid[y][x] === Tile.POWER) n++;
    }
  }
  return n;
}

function drawWallCell(ctx, x, y) {
  ctx.fillStyle = "#21262d";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = "#30363d";
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
}

function drawDotCell(ctx, cx, cy) {
  const pellet = getSprite("pellet.png");
  if (spriteReady(pellet)) {
    const size = TILE * 0.24;
    ctx.drawImage(pellet, cx - size / 2, cy - size / 2, size, size);
    return;
  }
  ctx.fillStyle = "#f0883e";
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawPowerDotCell(ctx, cx, cy) {
  const power = getSprite("powerPellet.png");
  if (spriteReady(power)) {
    const size = TILE * 0.5;
    ctx.drawImage(power, cx - size / 2, cy - size / 2, size, size);
    return;
  }
  ctx.fillStyle = "#ffdd55";
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Renderiza todo el nivel: muros y puntos restantes.
 */
export function renderMap(ctx, grid) {
  for (let y = 0; y < rows(); y++) {
    for (let x = 0; x < cols(); x++) {
      const px = x * TILE;
      const py = y * TILE;
      const cell = grid[y][x];
      if (cell === Tile.WALL) {
        drawWallCell(ctx, px, py);
      } else {
        ctx.fillStyle = "#000";
        ctx.fillRect(px, py, TILE, TILE);
        if (cell === Tile.DOT || cell === Tile.POWER) {
          const cx = px + TILE / 2;
          const cy = py + TILE / 2;
          if (cell === Tile.POWER) drawPowerDotCell(ctx, cx, cy);
          else drawDotCell(ctx, cx, cy);
        }
      }
    }
  }
}
