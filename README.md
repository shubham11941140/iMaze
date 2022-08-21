# iMAZE

### Server Deployed on HerokuApp: https://mymaze-shubhamgupta.herokuapp.com/

Maze solver to provide a live deployment of various heuristic algorithms in a visually appealing manner.

Heuristic Algorithms considered: **Manhattan Distance Heuristic** (Some previews are attached)

1. Breadth First Search (BFS)

![image](https://user-images.githubusercontent.com/63910248/168645287-0e67d180-2df1-4915-99b1-d2ca2f528246.png)

2. Depth First Search (DFS)

![image](https://user-images.githubusercontent.com/63910248/168645354-f2a116d1-f3c7-418c-ad86-7bd29d861edb.png)

3. A\*

![image](https://user-images.githubusercontent.com/63910248/168645192-49c03a32-3f1c-4f59-ae7e-2159493c01f0.png)

4. Depth First Branch and Bound (DFBB)
5. Dijkstra
6. Greedy Best First Search (GBFS)

![image](https://user-images.githubusercontent.com/63910248/168645097-5d1e9ba0-9fc3-4c11-93c8-3520851d72f9.png)

7. Iterative Deepening Search (IDS)
8. IDA\*

**Built using Next.js - https://github.com/vercel/next.js/ so ensure next.js packages are installed**

Run using:

```
  npm i next
  npm run dev
```

#### http://localhost:3000/ on your browser to see the result

Pages can be edited using `pages/index.js` which auto updates as file is edited

API can be accessed via http://localhost:3000/api/hello and edited on `pages/api/hello.js`
