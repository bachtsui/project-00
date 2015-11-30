Race to Destruction!

Square Blue and Square Orange can now fire bullets at each other. If your bullet touches the other player, you win!

Technologies Used

Used what I learned from Game-1 to handle mutiple key presses.

Took a long time, but figured out how to generate bullets. Bullets
are kept in an array and their position keeps updating as the game
draws itself constantly. Bullets are spliced out of the array when
they leave the screen otherwise slowdowns will occur.

Used setTimeout, in order to prevent players from being able
to rapidly fire bullets.

Existing Features

A = Moves Blue Square Left
D = Moves Blue Square RIght
S = Shoots a bullet from Blue Square

Left Arrow = Moves Orange Square Left
Right Arrow = Moves Orange Square Right
Space = Shoots a bullet from Orange Square

Planned Features

Still need to get collision to be more precise.
There's some errors with collision at the moment too.