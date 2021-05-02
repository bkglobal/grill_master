# Grill Master (Automatic Assignment to Grill)
This is Grill Master problem in which the algorithm will automatically allocation the maximum grills to main grill.

#### My Thought Process
I wanted to maximize the accuracy of the result and reached toward the more accuracy as expected. I thought to use knapsack algorithm but this approach is pretty different than knapsack so i took some guidelines from knapsack and created my own approach to keep the system consistent. Toward my algorithm its mainly focus on position of grills and maximum utilization using width and height learning from old nodes.

The precise pseudo code is looks like
```
Iteration of the elements do:
    IF element width < overallwidth and element height < overall height
        IF index = 0:
            Get maximum value to put in next node.
            Create and push commulative array to keep track the position of elements.
        ELSE:
            Compare element with Commulative array.
            value = Get max value (with position top and left)
while (value)
```
#### How can it be more better ?
It can be more better using dynamic programming and implementing rows, columns and diagonal approach and adapting the most optimal nodes among multiples.

#### Scaling according to system need.
We can implement best algorithm to achieve maximum result. This system can have multitanent architecture and multiple user to opearate grills with previous records and modifications. Database interaction and realtime changes (Socket io) can be beneficial for the release.

## Installation

This need Node JS to be primary dependency. Install Node JS

Install the dependencies and devDependencies and start the server.

```sh
cd grill_master
npm i
npm start
```


