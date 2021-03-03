# mazesolver
This is a fun basic Maze solver on: https://mazesolveark.herokuapp.com
Also You can Play my Maze Game on https://mazesolveark.herokuapp.com/maze2.html
Algorithms used: A* for solving and Recursive Bactracking for maze generation.

### Info
It is interactive and a static web page made with html(Canvas), css and Javascript(No libraries were used). The Users can draw obstacles and find out the shortest path from the source to the intended destination. The application uses Dijkstra's shortest path finding Algorithm and A* algorithm. Custom Maze maker is also there which creates the maze for users, it uses recursive backtracking algorithm. The user can customise a the source vertex, destination vertex the heuristics the maze width, etc. A new feature added was the mine which is a point which the source vertex must have to reach before it reaches the destination vertex, kind of like say Uber pool has to pickup a customer from a area and then only go the the next customer so that concept was implemented.

There is a second page as well to the website, which is a basic maze game, it has two modes one single player the other one is for two players competing to reach to the end. The single player has a character which needs to reach to the treasure, and there are 4 levels 4th level being the last level. 4th level consists a dragon battle.

The full game mechanics are made completely in javascript and Html Canvas, for maze generation Recursive backtracking Algorithm was used, Images of the Dragon characters and other game items where taken from the net or designed by me.

Do enjoy!!

## Images

![maze](https://user-images.githubusercontent.com/55324916/109842887-871df180-7c70-11eb-93fb-97451fd4a6c1.png)
![mazegen_solve (1)](https://user-images.githubusercontent.com/55324916/109841956-96e90600-7c6f-11eb-9d1b-d84db9ad6752.jpeg)

## For PWA

To get icons in manifest file

```sh
$ npx pwa-asset-generator ./Images/mazeicnb.png icons
```
Copy the icons content produced by it. Also an icon folder will be created.

## For running, PWA 

```sh
$ npx serve
```

Goto server 5000 :rocket:
