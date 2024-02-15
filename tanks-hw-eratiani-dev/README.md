# HOME WORK - TANKS GAME

> :information_source: **deadline** - last course week
>
> :warning: ** Don't forget to create new branch and open PR when ready!**

## Game Description

A long time ago, there was a very cool game Battle City on 8-bit consoles, but everyone simply called it “Tanks”. We really hope that you have seen this game and know what we are talking about. If not, then there is a small [video](https://www.youtube.com/watch?v=Pm5Ur_Yf_S0), after watching which you can understand everything at once.

## What do we want to do

We will simplify the game a little and provide you with useful things so that you can do as much as possible in a short time.

### Map

The level map consists of a rectangle 13 squares wide and 14 squares high. The side of one map cell is 64 pixels. The map in the original game is filled with various blocks, but let’s say we only have brick walls.

In order not to spend a lot of time coming up with a playing field, we have already described the map in a special two-dimensional numeric array in the attached `map.js` file. There, in this file, there is also a legend for the map, so that it is easier for you to understand and easier to write code using the designations from the legend, and not just numbers.

### Rules

In the game there is a player tank and enemy tanks. There are 3 predetermined places where enemy tanks will appear - enemy bases, and only 3 such tanks can exist on the playing field at the same time. If a player destroys an enemy tank, it disappears from the playing field, and a new tank appears in one randomly selected enemy base.

If enemy tanks destroy the player's tank, then one life is taken from the player and his tank reappears in a predetermined place - the player's base.
The game continues until the player destroys 21 enemy tanks, or until he uses up 3 lives.

### Control

All tanks have the same speed. That means, during one interval of the game cycle, the tank can only move to an adjacent cell.

The player's tank is controlled by the arrows on the keyboard, and in such a way that it moves in the direction whose key is currently pressed (if two or more buttons are pressed, then the movement occurs in the direction whose direction was last set). If no key is pressed, then the player's tank is standing.

Enemy tanks move at a constant speed in a randomly selected direction.

All tanks cannot drive through obstacles and each other. When colliding with an obstacle, the player's tank stops moving, the enemy's tank turns in a random direction. Also, we would like tanks to not be able to drive beyond the playing field. Let tanks behave in the same way when colliding with the border of the map as when colliding with a wall

### Shooting

All tanks, of course, can shoot. When the shot is fired, a projectile is fired in the direction in which the tank is located. The projectile moves until it encounters an enemy tank or obstacle.

An enemy tank is considered killed if it is hit by a shell.

If a projectile hits a wall, the projectile disappears and the affected square with the wall also disappears.

Shells from enemy tanks cannot kill their own.

Important: while a projectile fired by a tank is in flight, this tank cannot fire a new shot.

Enemy tanks are always trying to shoot. The player's tank fires when the player presses the spacebar.

## What do we have for you

To make it easier for you to cope with the task, we have done something for you.
In the starting code you will find:

- File `index.html` - we want the game to be launched by opening this file. `Index.html` is not empty. We have already marked out the playing area of the required size there. There is also a short description of the game objects that may help you. We also included the necessary style files) and a couple of js files
- There are 2 style files in the `css` folder. The first one, `normalize.css`, is needed solely for technical reasons and will not be needed in your work. The second, `main.css` is the same file where you can describe your styles if you need it. Please note that it is not empty, there are already styles that are needed to display the game field and even some styles for displaying game objects that you can use.
- There are only 3 pictures in the `img` folder - these are two types of tanks and walls
- The `js` folder contains a file with a description of the game map and a `main.js` file
- `main.js` is exactly the place that is intended for your code. By the way, it is not empty either. We tried to help you a little here by creating a couple of variables and indicating how, in our opinion, the application architecture should be organized.

Of course, you don't have to use our help. Add your files or delete ours if you see fit. Write the code as you see fit.

> :warning: ** Don't forget to create new branch and open PR when ready!**

## Task

> :bulb: We would like you not to use canvas, and all visual elements (obstacles, tanks, projectiles) to be made using DOM elements, for example, divs. It seems obvious to us that it would be a good idea to do this using absolute block positioning, but if you think there are other options and you like them, use them (but don't use canvas).

1. Take a close look at the code you already have and think about whether you will use it
2. Place walls on the map
3. Describe the tank model so that it can then be used to create enemy tanks and player tanks (here we are hinting that it would be nice to write a class that could then easily be used to create tanks of any type)
4. Create an enemy tank on the map and teach it to move
5. Now you can create three opponents at once on three bases
6. Create a player tank on the map, and let it move according to the rules of enemy tanks for now
7. Now is the time to teach the tank player to respond to keyboard arrows
8. Teach tanks to collide with walls and react correctly to these collisions.
9. Teach tanks to shoot
10. Teach tanks to die when hit by a shell
11. Now you can do the destruction of walls
12. Implement the appearance of a new enemy tank if one of them is killed
13. Implement the appearance of the player’s tank at the base if he is killed
14. Organize the player's life counter
15. Organize an enemy tank counter
16. Teach the game to report victory or defeat (for example, at least using alert()) and start again.
17. Now teach tanks to react to collisions with other tanks.
