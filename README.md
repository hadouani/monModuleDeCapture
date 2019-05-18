 **Installation :**
 
 npm i capturemoduleo

**Usage :**

to use this model  you should  create a tag "div" :

<div class="top-container" id="camera">
</div>

and follow the next instruction :

so this module it is divided in 3 parts

**the first part include:**


An interface for the actions of the capture and recording of the encoded image

 **The use this part call intialize("id_div") function with id of the div as a parmter of the function ,for  example : vlib.initialize("camera")**


![1](https://user-images.githubusercontent.com/45512316/57559986-dac09c00-7373-11e9-8137-35f87fe792e5.PNG)

after pressing the "turn on camera" button camera Start  


![2](https://user-images.githubusercontent.com/45512316/57559995-e8762180-7373-11e9-8c33-e528bcb9832c.PNG)

After pressing the "take" button, we display a countdown of 3 seconds after which we capture the image 

![3](https://user-images.githubusercontent.com/45512316/57560004-f035c600-7373-11e9-9596-e816a0e20de2.PNG)

After capture the photo user can save or go back to take a new photo

![4](https://user-images.githubusercontent.com/45512316/57560014-fd52b500-7373-11e9-874a-406b97815efe.PNG)

If the user click on "save" button, he can download her photo after clicking on "download" button

![1](https://user-images.githubusercontent.com/45512316/57560042-13607580-7374-11e9-8056-970ca024bea5.PNG)

**The second part include:**

Interfaces and components to adjust image quality and adding effects to the image (contrast, brightness, hue, etc ...)

**The use this part call adjust() function, for example : vlib.adjust()**

![2](https://user-images.githubusercontent.com/45512316/57560062-207d6480-7374-11e9-893d-4c6988c6ca86.PNG)

 the user can click on “Edit” button to Edit her photo or also he can  click on “cancel” button to go back and cancel the edit

![4](https://user-images.githubusercontent.com/45512316/57560084-2ecb8080-7374-11e9-833f-ca1c98fb0310.PNG)

After clicking on “Adjust”, button we display some ranges to user can adjust her photo by (Brightness, Contrast, Grayscale, Opacity, Saturate)

![5](https://user-images.githubusercontent.com/45512316/57560090-33903480-7374-11e9-8c2b-2cc33e42edbd.PNG)

After make the setting of the photo, the user can cancel or save the adjust After make the setting of the photo the user can cancel or save the adjust 

![6](https://user-images.githubusercontent.com/45512316/57560101-3be86f80-7374-11e9-8925-4123bdd35250.PNG)

the user can download her photo If he click on “Save” Button, 

![7](https://user-images.githubusercontent.com/45512316/57560107-4571d780-7374-11e9-974b-bb744e21225d.PNG)

**The Third part include:**

Interfaces allow users to crop and rotate the image. For this, the interface has a rectangle with wrists
To guide the user in his actions as well as recording the crop image

 **The use this part call crop() function, for example  : vlib.crop()**
 
 After clicking on “Edit” button, we display this interface to given user choice to adjusting or cropping her photo 

![6](https://user-images.githubusercontent.com/45512316/57560115-54f12080-7374-11e9-878a-9b2d008f2541.PNG)

If the user click on “Crop” Button, we display a rectangle with 8 named cuffs using the four cardinalities: N for North, E for East, O for West and S for South. The four wrists are thus: NN, NE, NO, EE, OO, SE, SS and SO:
•	The wrists EE and OO are sensitive only to width cropping,

•	The NN and SS wrists are sensitive only to height cropping,

•	The NE, NO, SE, and SO wrists are sensitive only to proportionally cropped height and width.

An outside L-band at each wrist NE, NO, SE and SW not shown in the image will allow to rotate the cropline.


![7](https://user-images.githubusercontent.com/45512316/57560123-5c182e80-7374-11e9-9b08-8098ecaf8d62.PNG)

When cropping is done, the user presses the "save" button and gets the cropped photo 

![9](https://user-images.githubusercontent.com/45512316/57560126-663a2d00-7374-11e9-8795-4bc47ca4e4a1.PNG)

When edit is done, the user presses the "save"  button to save Edit and get the edited photo 

![10](https://user-images.githubusercontent.com/45512316/57560130-69cdb400-7374-11e9-9758-acccf8e06531.PNG)

